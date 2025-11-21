<script lang="ts">
	import { AreaChart as LayerAreaChart } from 'layerchart';
	import {
		curveLinear,
		curveCatmullRom,
		curveMonotoneX,
		curveStep,
		curveStepAfter,
		curveStepBefore,
		curveBasis,
		curveCardinal,
		curveNatural
	} from 'd3-shape';
	import { cn } from '$lib/utils/class-names.js';

	export type AreaChartData = {
		[key: string]: any;
	}[];

	export type SeriesConfig = {
		key: string;
		label?: string;
		color?: string;
	}[];

	type CurveType =
		| 'linear'
		| 'catmullRom'
		| 'monotoneX'
		| 'step'
		| 'stepAfter'
		| 'stepBefore'
		| 'basis'
		| 'cardinal'
		| 'natural';

	type SeriesLayout = 'overlap' | 'stack' | 'stackExpand' | 'stackDiverging';

	type Props = {
		data: AreaChartData;
		x: string;
		y?: string;
		series?: SeriesConfig;
		class?: string;
		seriesLayout?: SeriesLayout;
		curve?: CurveType;
		showPoints?: boolean;
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
		fillOpacity?: number;
		strokeWidth?: number;
		renderContext?: 'svg' | 'canvas';
		debug?: boolean;
		radial?: boolean;
	};

	let {
		data = [],
		x,
		y = undefined,
		series = undefined,
		class: className = 'w-full h-56',
		seriesLayout = 'overlap',
		curve = 'catmullRom',
		showPoints = false,
		showLabels = false,
		showGrid = true,
		showAxis = true,
		showLegend = false,
		showTooltip = true,
		legendPlacement = 'top',
		legendOrientation = 'horizontal',
		fillOpacity = 0.3,
		strokeWidth = 2,
		renderContext = 'svg',
		debug = false,
		radial = false
	}: Props = $props();

	const curveMap = {
		linear: curveLinear,
		catmullRom: curveCatmullRom,
		monotoneX: curveMonotoneX,
		step: curveStep,
		stepAfter: curveStepAfter,
		stepBefore: curveStepBefore,
		basis: curveBasis,
		cardinal: curveCardinal,
		natural: curveNatural
	};

	const seriesConfig = $derived(
		series
			? series.map((s) => ({
					...s,
					value: s.key
				}))
			: y
				? [
						{
							key: 'default',
							label: y,
							value: y,
							color: 'var(--color-primary)'
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

	const areaProps = $derived({
		fillOpacity,
		line: {
			curve: curveMap[curve],
			strokeWidth
		}
	});

	const pointsProps = $derived(
		showPoints
			? {
					r: 3,
					strokeWidth: 2
				}
			: false
	);
</script>

<div class={cn('chart-container', className)}>
	<LayerAreaChart
		{data}
		{x}
		{y}
		series={seriesConfig}
		{seriesLayout}
		axis={showAxis}
		grid={showGrid}
		labels={showLabels}
		legend={legendConfig}
		points={pointsProps}
		tooltip={showTooltip}
		{radial}
		{renderContext}
		{debug}
		props={{
			area: areaProps
		}}
	/>
</div>
