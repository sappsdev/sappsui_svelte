<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';

	import Chart, { type ChartData, type ChartOptions, type ChartType } from 'chart.js/auto';

	type Props = {
		type: ChartType;
		data: ChartData;
		options?: ChartOptions;
		class?: string;
	};

	const { type, data, options, class: className = 'w-full h-56' }: Props = $props();

	let canvas = $state<HTMLCanvasElement>();
	let chart = $state<Chart>();

	$effect(() => {
		if (data && chart) {
			chart.data = data;
			chart.update();
		}
	});

	$effect(() => {
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
	});
</script>

<div class={cn(className)}>
	<canvas class="w-full h-full" bind:this={canvas}></canvas>
</div>
