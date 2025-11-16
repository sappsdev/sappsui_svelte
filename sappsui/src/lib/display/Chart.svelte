<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import Chart, { type ChartData, type ChartOptions, type ChartType } from 'chart.js/auto';
	import { onMount } from 'svelte';

	type Props = {
		type: ChartType;
		data: ChartData;
		options?: ChartOptions;
		class?: string;
	};

	const { type, data, options, class: className = 'chart-default' }: Props = $props();

	let canvas: HTMLCanvasElement;
	let chart: Chart | null = null;

	onMount(() => {
		if (canvas) {
			const ctx = canvas.getContext('2d');
			if (ctx) {
				chart = new Chart(ctx, {
					type,
					data,
					options
				});
			}
		}

		return () => {
			if (chart) {
				chart.destroy();
				chart = null;
			}
		};
	});

	$effect(() => {
		if (chart && canvas) {
			const currentType = chart.config.type;
			if (currentType !== type) {
				chart.destroy();
				const ctx = canvas.getContext('2d');
				if (ctx) {
					chart = new Chart(ctx, {
						type,
						data,
						options
					});
				}
			}
		}
	});

	$effect(() => {
		if (chart) {
			const currentType = chart.config.type;
			if (currentType === type) {
				chart.data = data;
				if (options) {
					chart.options = options;
				}
				chart.update();
			}
		}
	});
</script>

<div class={cn(className)}>
	<canvas class="chart" bind:this={canvas}></canvas>
</div>
