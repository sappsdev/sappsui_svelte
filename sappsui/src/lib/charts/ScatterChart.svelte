<script lang="ts">
	import { ScatterChart as LayerScatterChart } from 'layerchart';
	import { cn } from '$lib/utils/class-names.js';

	export type ScatterChartData = {
		[key: string]: any;
	}[];

	export type SeriesConfig = {
		key: string;
		label?: string;
		color?: string;
		data?: any[];
	}[];

	type Props = {
		data?: ScatterChartData;
		x: string;
		y: string;
		r?: string;
		series?: SeriesConfig;
		class?: string;
		showLabels?: boolean;
		showGrid?: boolean;
		showAxis?: boolean;
		showLegend?: boolean;
		showTooltip?: boolean;
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
		pointSize?: number;
		strokeWidth?: number;
		renderContext?: 'svg' | 'canvas';
		debug?: boolean;
	};

	let {
		data = [],
		x,
		y,
		r = undefined,
		series = undefined,
		class: className = 'w-full h-56',
		showLabels = false,
		showGrid = true,
		showAxis = true,
		showLegend = false,
		showTooltip = true,
		legendPlacement = 'top',
		legendOrientation = 'horizontal',
		pointSize = 4,
		strokeWidth = 1,
		renderContext = 'svg',
		debug = false
	}: Props = $props();

	const seriesConfig = $derived(
		series
			? series
			: data && data.length > 0
				? [
						{
							key: 'default',
							label: undefined,
							color: 'var(--color-primary)',
							data: data
						}
					]
				: undefined
	);

	const legendConfig = $derived(
		showLegend && seriesConfig && seriesConfig.length > 1
			? {
					placement: legendPlacement,
					orientation: legendOrientation
				}
			: false
	);

	const pointsProps = $derived({
		r: pointSize,
		strokeWidth
	});
</script>

<div class={cn('chart-container', className)}>
	<LayerScatterChart
		{x}
		{y}
		{r}
		series={seriesConfig}
		axis={showAxis}
		grid={showGrid}
		labels={showLabels}
		legend={legendConfig}
		tooltip={showTooltip}
		{renderContext}
		{debug}
		props={{
			points: pointsProps
		}}
	/>
</div>
