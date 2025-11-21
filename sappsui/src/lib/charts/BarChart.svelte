<script lang="ts">
	import { BarChart as LayerBarChart } from 'layerchart';
	import { cn } from '$lib/utils/class-names.js';

	export type BarChartData = {
		label: string;
		value: number;
	}[];

	type Props = {
		data: BarChartData;
		class?: string;
		horizontal?: boolean;
		color?: string;
		radius?: number;
		showTooltip?: boolean;
		showGrid?: boolean;
		showAxis?: boolean;
		showLegend?: boolean;
		legendPlacement?:
			| 'top-left'
			| 'top'
			| 'top-right'
			| 'left'
			| 'center'
			| 'right'
			| 'bottom-left'
			| 'bottom'
			| 'bottom-right';
		legendOrientation?: 'vertical' | 'horizontal';
		bandPadding?: number;
		renderContext?: 'svg' | 'canvas';
		debug?: boolean;
	};

	let {
		data = [],
		class: className = 'w-full h-56',
		horizontal = false,
		color = 'var(--color-primary)',
		radius = 4,
		showTooltip = true,
		showGrid = true,
		showAxis = true,
		showLegend = false,
		legendPlacement = 'top',
		legendOrientation = 'horizontal',
		bandPadding = 0.3,
		renderContext = 'svg',
		debug = false
	}: Props = $props();

	const chartData = $derived(data);

	const orientation = $derived(horizontal ? 'horizontal' : 'vertical');

	const legendConfig = $derived(
		showLegend
			? {
					placement: legendPlacement,
					orientation: legendOrientation
				}
			: false
	);

	const barsProps = $derived({
		radius,
		fill: color,
		strokeWidth: 1
	});
</script>

<div class={cn('chart-container', className)}>
	<LayerBarChart
		data={chartData}
		x={horizontal ? 'value' : 'label'}
		y={horizontal ? 'label' : 'value'}
		{orientation}
		{bandPadding}
		axis={showAxis}
		grid={showGrid}
		legend={legendConfig}
		tooltip={showTooltip}
		{renderContext}
		{debug}
		props={{
			bars: barsProps
		}}
	/>
</div>
