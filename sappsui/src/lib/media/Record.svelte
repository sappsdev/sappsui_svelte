<script lang="ts">
	import { IconButton } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';

	type Props = {
		class?: string;
		name: string;
		variant?:
			| 'primary'
			| 'secondary'
			| 'soft'
			| 'outlined'
			| 'ghost'
			| 'success'
			| 'info'
			| 'danger'
			| 'warning';
		url?: string;
		headers?: Record<string, string>;
		onRecordingComplete?: (blob: Blob, url: string) => void;
	};

	let {
		class: className,
		name,
		variant = 'primary',
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
	let isReviewing = $state(false);
	let reviewAudioUrl: string | null = null;
	let audioElement: HTMLAudioElement | null = null;
	let isPlaying = $state(false);
	let playbackTime = $state(0);
	let playbackDuration = $state(0);
	let playbackWaveform = $state<number[]>(Array(50).fill(0.2));

	const BAR_COUNT = 50;

	let baseClasses = $derived(cn('media', variant, className));

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
				reviewAudioUrl = URL.createObjectURL(audioBlob);

				// Analizar audio para el waveform
				await analyzeRecordedAudio(audioBlob);

				// Entrar en modo de revisión
				isReviewing = true;

				// Limpiar stream
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

	async function confirmRecording() {
		if (!reviewAudioUrl) return;

		try {
			const response = await fetch(reviewAudioUrl);
			const audioBlob = await response.blob();

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
				onRecordingComplete(audioBlob, reviewAudioUrl);
			}

			// Limpiar y resetear
			cleanup();
		} catch (error) {
			console.error('Error confirming recording:', error);
		}
	}

	function discardRecording() {
		cleanup();
	}

	function continueRecording() {
		// Mantener el audio actual y permitir continuar
		isReviewing = false;
		isRecording = false;
		isPaused = false;
	}

	async function analyzeRecordedAudio(blob: Blob) {
		try {
			const context = new AudioContext();
			const arrayBuffer = await blob.arrayBuffer();
			const audioBuffer = await context.decodeAudioData(arrayBuffer);

			const rawData = audioBuffer.getChannelData(0);
			const samples = BAR_COUNT;
			const blockSize = Math.floor(rawData.length / samples);
			const filteredData: number[] = [];

			for (let i = 0; i < samples; i++) {
				let sum = 0;
				for (let j = 0; j < blockSize; j++) {
					sum += Math.abs(rawData[i * blockSize + j]);
				}
				filteredData.push(sum / blockSize);
			}

			const max = Math.max(...filteredData);
			playbackWaveform = filteredData.map((value) => (value / max) * 0.8 + 0.2);

			await context.close();
		} catch (error) {
			console.error('Error analyzing audio:', error);
			playbackWaveform = Array(50).fill(0.5);
		}
	}

	function cleanup() {
		if (reviewAudioUrl) {
			URL.revokeObjectURL(reviewAudioUrl);
			reviewAudioUrl = null;
		}
		if (audioElement) {
			audioElement.pause();
			audioElement = null;
		}
		isReviewing = false;
		isRecording = false;
		isPaused = false;
		isPlaying = false;
		recordingTime = 0;
		playbackTime = 0;
		playbackDuration = 0;
		waveformBars = Array(50).fill(0.2);
		playbackWaveform = Array(50).fill(0.2);
		audioChunks = [];
	}

	function togglePlayback() {
		if (!reviewAudioUrl) return;

		if (!audioElement) {
			audioElement = new Audio(reviewAudioUrl);

			audioElement.addEventListener('loadedmetadata', () => {
				playbackDuration = audioElement!.duration;
			});

			audioElement.addEventListener('timeupdate', () => {
				if (audioElement) {
					playbackTime = audioElement.currentTime;
				}
			});

			audioElement.addEventListener('ended', () => {
				isPlaying = false;
				playbackTime = 0;
			});
		}

		if (isPlaying) {
			audioElement.pause();
			isPlaying = false;
		} else {
			audioElement.play();
			isPlaying = true;
		}
	}
</script>

{#if !url}
	<input type="file" bind:this={fileInput} {name} accept="audio/*" class="hidden" />
{/if}

<div class={baseClasses}>
	{#if isReviewing}
		<!-- Modo de revisión -->
		<IconButton
			onclick={togglePlayback}
			icon={isPlaying ? 'fluent:pause-24-filled' : 'fluent:play-24-filled'}
			size="md"
			variant="soft"
		/>

		<div class="media-waveform">
			<div class="media-bars">
				{#each playbackWaveform as height, i}
					{@const progress = playbackDuration > 0 ? playbackTime / playbackDuration : 0}
					{@const barPosition = (i + 0.5) / playbackWaveform.length}
					{@const isPlayed = barPosition <= progress}
					<div class="media-bar" class:active={isPlayed} style="height: {height * 100}%"></div>
				{/each}
			</div>
		</div>

		<span class="media-time">{formatTime(recordingTime)}</span>

		<div class="flex gap-2">
			<IconButton
				onclick={discardRecording}
				icon="fluent:delete-24-filled"
				size="md"
				variant="soft"
				title="Descartar"
			/>
			<IconButton
				onclick={continueRecording}
				icon="fluent:record-24-filled"
				size="md"
				variant="soft"
				title="Continuar grabando"
			/>
			<IconButton
				onclick={confirmRecording}
				icon="fluent:checkmark-24-filled"
				size="md"
				variant="soft"
				loading={isUploading}
				title="Confirmar y enviar"
			/>
		</div>
	{:else if !isRecording}
		<IconButton
			onclick={startRecording}
			icon="fluent:record-24-filled"
			size="md"
			variant="soft"
			disabled={isUploading}
		/>

		<div class="media-waveform">
			<div class="media-bars">
				{#each waveformBars as height}
					<div class="media-bar" style="height: {height * 100}%"></div>
				{/each}
			</div>
		</div>

		<span class="media-time">{formatTime(recordingTime)}</span>
	{:else}
		<IconButton
			onclick={handleToggleRecording}
			icon={isPaused ? 'fluent:play-24-filled' : 'fluent:pause-24-filled'}
			size="md"
			variant="soft"
		/>

		<div class="media-waveform">
			<div class="media-bars">
				{#each waveformBars as height}
					<div
						class="media-bar"
						class:recording={isRecording && !isPaused}
						style="height: {height * 100}%"
					></div>
				{/each}
			</div>
		</div>

		<span class="media-time">{formatTime(recordingTime)}</span>

		<IconButton
			onclick={stopRecording}
			icon="fluent:stop-24-filled"
			size="md"
			variant="soft"
			loading={isUploading}
		/>
	{/if}
</div>
