<script lang="ts">
	import { IconButton } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';

	type Props = {
		class?: string;
		name: string;
		variant?: 'solid' | 'soft';
		color?: 'default' | 'surface' | 'primary' | 'secondary' | 'error' | 'muted';
		url?: string;
		headers?: Record<string, string>;
		onRecordingComplete?: (blob: Blob, url: string) => void;
	};

	let {
		class: className,
		name,
		variant = 'solid',
		color = 'error',
		url,
		headers,
		onRecordingComplete
	}: Props = $props();

	let mediaRecorder: MediaRecorder | null = null;
	let audioContext: AudioContext | null = null;
	let analyser: AnalyserNode | null = null;
	let dataArray: Uint8Array | null = null;
	let animationId: number | null = null;
	let fileInput: HTMLInputElement;

	let isRecording = $state(false);
	let isPaused = $state(false);
	let recordingTime = $state(0);
	let waveformBars = $state<number[]>(Array(50).fill(0.2));
	let audioChunks: Blob[] = [];
	let timerInterval: number | null = null;
	let isUploading = $state(false);

	const BAR_COUNT = 50;

	const variantClass = {
		solid: 'recorder-solid',
		soft: 'recorder-soft'
	};

	const colorClass = {
		default: 'recorder-default',
		surface: 'recorder-surface',
		primary: 'recorder-primary',
		secondary: 'recorder-secondary',
		error: 'recorder-error',
		muted: 'recorder-muted'
	};

	let baseClasses = $derived(cn('recorder', variantClass[variant], colorClass[color], className));

	async function startRecording() {
		try {
			const stream = await navigator.mediaDevices.getUserMedia({ audio: true });

			// Configurar Web Audio API para análisis en tiempo real
			audioContext = new AudioContext();
			const source = audioContext.createMediaStreamSource(stream);
			analyser = audioContext.createAnalyser();
			analyser.fftSize = 256;
			source.connect(analyser);

			const bufferLength = analyser.frequencyBinCount;
			dataArray = new Uint8Array(bufferLength);

			// Configurar MediaRecorder
			mediaRecorder = new MediaRecorder(stream);
			audioChunks = [];

			mediaRecorder.ondataavailable = (event) => {
				if (event.data.size > 0) {
					audioChunks.push(event.data);
				}
			};

			mediaRecorder.onstop = async () => {
				const audioBlob = new Blob(audioChunks, { type: 'audio/webm' });
				const audioUrl = URL.createObjectURL(audioBlob);

				if (url) {
					// Enviar via FormData si hay URL
					await uploadAudio(audioBlob);
				} else {
					// Crear archivo para el input hidden
					const file = new File([audioBlob], `${name}.webm`, { type: 'audio/webm' });
					const dataTransfer = new DataTransfer();
					dataTransfer.items.add(file);
					fileInput.files = dataTransfer.files;

					// Disparar evento change
					const event = new Event('change', { bubbles: true });
					fileInput.dispatchEvent(event);
				}

				if (onRecordingComplete) {
					onRecordingComplete(audioBlob, audioUrl);
				}

				// Limpiar
				stream.getTracks().forEach((track) => track.stop());
				if (audioContext) {
					audioContext.close();
				}
			};

			mediaRecorder.start();
			isRecording = true;
			recordingTime = 0;

			// Iniciar timer
			timerInterval = window.setInterval(() => {
				recordingTime += 1;
			}, 1000);

			// Iniciar animación del waveform
			visualize();
		} catch (error) {
			console.error('Error accessing microphone:', error);
			alert('No se pudo acceder al micrófono');
		}
	}

	async function uploadAudio(blob: Blob) {
		if (!url) return;

		try {
			isUploading = true;
			const formData = new FormData();
			formData.append(name, blob, `${name}.webm`);

			const requestHeaders: HeadersInit = {
				...headers
			};

			const response = await fetch(url, {
				method: 'POST',
				headers: requestHeaders,
				body: formData
			});

			if (!response.ok) {
				throw new Error(`Upload failed: ${response.statusText}`);
			}

			console.log('Audio uploaded successfully');
		} catch (error) {
			console.error('Error uploading audio:', error);
			alert('Error al subir el audio');
		} finally {
			isUploading = false;
		}
	}

	function visualize() {
		if (!analyser || !dataArray) return;

		analyser.getByteFrequencyData(dataArray);

		// Tomar muestras del array de frecuencias
		const newBars: number[] = [];
		const step = Math.floor(dataArray.length / BAR_COUNT);

		for (let i = 0; i < BAR_COUNT; i++) {
			const index = i * step;
			const value = dataArray[index] / 255; // Normalizar entre 0 y 1
			// Aplicar un mínimo y escalar
			newBars.push(value * 0.7 + 0.15);
		}

		waveformBars = newBars;

		if (isRecording && !isPaused) {
			animationId = requestAnimationFrame(visualize);
		}
	}

	function pauseRecording() {
		if (mediaRecorder && isRecording) {
			mediaRecorder.pause();
			isPaused = true;

			if (timerInterval) {
				clearInterval(timerInterval);
			}

			if (animationId) {
				cancelAnimationFrame(animationId);
			}
		}
	}

	function resumeRecording() {
		if (mediaRecorder && isPaused) {
			mediaRecorder.resume();
			isPaused = false;

			// Reanudar timer
			timerInterval = window.setInterval(() => {
				recordingTime += 1;
			}, 1000);

			// Reanudar animación
			visualize();
		}
	}

	function stopRecording() {
		if (mediaRecorder) {
			mediaRecorder.stop();
			isRecording = false;
			isPaused = false;

			if (timerInterval) {
				clearInterval(timerInterval);
			}

			if (animationId) {
				cancelAnimationFrame(animationId);
			}

			// Resetear barras
			waveformBars = Array(50).fill(0.2);
		}
	}

	function formatTime(seconds: number): string {
		const mins = Math.floor(seconds / 60);
		const secs = seconds % 60;
		return `${mins}:${secs.toString().padStart(2, '0')}`;
	}

	function handleToggleRecording() {
		if (!isRecording) {
			startRecording();
		} else if (isPaused) {
			resumeRecording();
		} else {
			pauseRecording();
		}
	}
</script>

{#if !url}
	<input type="file" bind:this={fileInput} {name} accept="audio/*" class="hidden" />
{/if}

<div class={baseClasses}>
	{#if !isRecording}
		<IconButton
			onclick={startRecording}
			icon="fluent:record-24-filled"
			size="md"
			variant="soft"
			disabled={isUploading}
		/>
	{:else}
		<IconButton
			onclick={handleToggleRecording}
			icon={isPaused ? 'fluent:play-24-filled' : 'fluent:pause-24-filled'}
			size="md"
			variant="soft"
			color={isPaused ? 'warning' : 'success'}
		/>
	{/if}

	<div class="recorder-waveform">
		<div class="recorder-bars">
			{#each waveformBars as height}
				<div
					class="recorder-bar"
					class:recorder-bar-recording={isRecording && !isPaused}
					style="height: {height * 100}%"
				></div>
			{/each}
		</div>
	</div>

	<span class="recorder-time">{formatTime(recordingTime)}</span>

	{#if isRecording}
		<IconButton
			onclick={stopRecording}
			icon="fluent:stop-24-filled"
			size="md"
			variant="soft"
			color="error"
			loading={isUploading}
		/>
	{/if}
</div>
