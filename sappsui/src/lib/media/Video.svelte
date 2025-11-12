<script lang="ts">
	import { Icon } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';
	import Hls from 'hls.js';

	type Props = {
		src: string;
		autoplay?: boolean;
		poster?: string;
		aspect?: 'horizontal' | 'vertical' | 'square';
		class?: string;
	};

	let { src, poster, autoplay, aspect = 'horizontal', class: className }: Props = $props();

	let videoElement: HTMLVideoElement | null = $state(null);

	let showControls = $state(false);
	let showVolume = $state(false);
	let videoParams = $state({
		src,
		time: 0,
		duration: 0,
		formattedTime: '00:00',
		formattedDuration: '00:00',
		controls: true,
		muted: false,
		paused: false,
		volume: 1
	});

	const setSource = () => {
		if (src.includes('.m3u8')) {
			if (Hls.isSupported() && videoElement) {
				const hls = new Hls();
				hls.loadSource(src);
				hls.attachMedia(videoElement);
				hls.on(Hls.Events.MANIFEST_PARSED, () => {
					if (autoplay) {
						videoElement?.play();
					}
				});
			} else if (videoElement?.canPlayType('application/vnd.apple.mpegurl')) {
				videoElement.src = src;
			}
		} else {
			if (!videoElement) return;
			videoElement.src = src;
		}
	};

	const handleMouseEnter = () => {
		if (showControls) return;
		showControls = true;
		setTimeout(() => {
			showControls = false;
		}, 5000);
	};

	const togglePlay = () => {
		if (videoElement?.paused) {
			videoElement.play();
		} else {
			videoElement?.pause();
		}
	};
	const toggleMute = () => {
		if (!videoElement) return;
		videoElement.muted = !videoElement.muted;
		localStorage.setItem('video-muted', videoElement.muted.toString());
	};

	const formatTime = (seconds: number): string => {
		const mins = Math.floor(seconds / 60);
		const secs = Math.floor(seconds % 60);
		return `${mins}:${secs < 10 ? '0' + secs : secs}`;
	};

	const handleToggleMaximize = () => {
		const containerElement = document.querySelector('.video');

		if (!document.fullscreenElement) {
			if (containerElement?.requestFullscreen) {
				containerElement.requestFullscreen();
			}
		} else {
			if (document.exitFullscreen) {
				document.exitFullscreen();
			}
		}
	};

	const handleTogglePip = async () => {
		if (!document.pictureInPictureEnabled) return;

		try {
			if (document.pictureInPictureElement === videoElement) {
				await document.exitPictureInPicture();
			} else {
				await videoElement?.requestPictureInPicture();
			}
		} catch (error) {
			console.error('PiP error:', error);
		}
	};

	$effect(() => {
		if (localStorage.getItem('video-muted') === 'true') {
			videoParams.muted = true;
		}
	});

	$effect(() => {
		if (localStorage.getItem('video-volume')) {
			videoParams.volume = parseFloat(localStorage.getItem('video-volume') || '1');
		}
	});

	$effect(() => {
		videoParams.formattedTime = formatTime(videoParams.time);
		videoParams.formattedDuration = formatTime(videoParams.duration);
	});

	$effect(() => {
		setSource();
	});
</script>

<svelte:window onmousemove={handleMouseEnter} />

<div class={cn('video', aspect, className)}>
	<!-- svelte-ignore component_name_lowercase -->
	<video
		bind:this={videoElement}
		bind:currentTime={videoParams.time}
		bind:duration={videoParams.duration}
		bind:paused={videoParams.paused}
		bind:muted={videoParams.muted}
		bind:volume={videoParams.volume}
		class="rounded-lg"><track kind="captions" /></video
	>
	{#if poster && videoParams.paused && videoElement.currentTime === 0}
		<img src={poster} class="video-poster rounded-md" alt="poster" />
	{/if}

	<button onclick={togglePlay} aria-label="Play" class="video-control-play"></button>
	<div class="video-controls">
		<!-- svelte-ignore a11y_consider_explicit_label -->
		<div class={cn('video-control-actions', showControls ? 'visible' : 'invisible')}>
			<div class="video-actions-start">
				<button class="video-btn" onclick={togglePlay}>
					<Icon
						class="video-btn-icon"
						icon={videoParams.paused ? 'solar:play-linear' : 'solar:pause-linear'}
					/>
				</button>
				<div class="video-btn">
					<span class="video-duration-info"
						>{videoParams.formattedTime} / {videoParams.formattedDuration}</span
					>
				</div>
			</div>
			<div class="video-actions-end">
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div
					class="video-volume-wrapper"
					onmouseenter={() => (showVolume = true)}
					onmouseleave={() => (showVolume = false)}
				>
					{#if !videoParams.muted && showVolume}
						<div class="video-volume">
							<input
								bind:value={videoParams.volume}
								onchange={(e) => {
									localStorage.setItem('video-volume', (e.target as HTMLInputElement).value);
								}}
								type="range"
								min="0"
								max="1"
								step="0.1"
								class="slider small primary"
							/>
						</div>
					{/if}
					<button class="video-btn" onclick={toggleMute}>
						<Icon
							class="video-btn-icon"
							icon={videoParams.muted ? 'solar:volume-cross-linear' : 'solar:volume-loud-linear'}
						/>
					</button>
				</div>
				<button class="video-btn" onclick={handleTogglePip}>
					<Icon class="video-btn-icon" icon={'solar:pip-linear'} />
				</button>
				<button class="video-btn" onclick={handleToggleMaximize}>
					<Icon class="video-btn-icon" icon={'solar:maximize-square-linear'} />
				</button>
			</div>
		</div>
		<div class={cn('video-control-progress', showControls ? 'visible' : 'invisible')}>
			<input
				type="range"
				min="0"
				class="slider small primary"
				max={videoParams.duration}
				bind:value={videoParams.time}
			/>
		</div>
	</div>
</div>
