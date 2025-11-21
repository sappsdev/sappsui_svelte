<script lang="ts">
	import { PieChart as LayerPieChart } from 'layerchart';
	import { cn } from '$lib/utils/class-names.js';

	export type PieChartData = {
		label: string;
		value: number;
		color?: string;
	}[];

	type Props = {
		data: PieChartData;
		class?: string;
		colors?: string[];
		innerRadius?: number;
		outerRadius?: number;
		cornerRadius?: number;
		padAngle?: number;
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
		legendTitle?: string;
		showTooltip?: boolean;
		renderContext?: 'svg' | 'canvas';
		debug?: boolean;
	};

	let {
		data = [],
		class: className = 'w-full h-64',
		colors = [
			'var(--color-primary)',
			'var(--color-secondary)',
			'var(--color-info)',
			'var(--color-success)',
			'var(--color-warning)',
			'var(--color-danger)'
		],
		innerRadius = 0,
		outerRadius = -20,
		cornerRadius = 4,
		padAngle = 0.02,
		showLegend = true,
		legendPlacement = 'right',
		legendOrientation = 'vertical',
		legendTitle = undefined,
		showTooltip = true,
		renderContext = 'svg',
		debug = false
	}: Props = $props();

	const chartData = $derived(
		data.map((item, index) => ({
			fruit: item.label,
			value: item.value,
			color: item.color || colors[index % colors.length]
		}))
	);

	const legendConfig = $derived(
		showLegend
			? {
					placement: legendPlacement,
					orientation: legendOrientation,
					...(legendTitle ? { title: legendTitle } : {})
				}
			: false
	);
</script>

<div class={cn('chart-container', className)}>
	<LayerPieChart
		data={chartData}
		key="fruit"
		value="value"
		c="color"
		{innerRadius}
		{outerRadius}
		{cornerRadius}
		{padAngle}
		legend={legendConfig}
		tooltip={showTooltip}
		{renderContext}
		{debug}
	/>
</div>
