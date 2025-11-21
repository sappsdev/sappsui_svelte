<script lang="ts">
	import { ArcChart as LayerArcChart } from 'layerchart';
	import { cn } from '$lib/utils/class-names.js';

	export type ArcChartData = {
		label?: string;
		key?: string;
		value: number;
		color?: string;
	}[];

	export type ArcChartSeries = {
		key: string;
		data: any[];
		maxValue?: number;
		color?: string;
		value?: string;
		props?: any;
	}[];

	type Props = {
		data?: ArcChartData;
		series?: ArcChartSeries;
		class?: string;
		colors?: string[];

		// Accessors
		key?: string;
		label?: string;
		value?: string;
		c?: string;

		// Arc configuration
		innerRadius?: number;
		outerRadius?: number;
		cornerRadius?: number;
		padAngle?: number;

		// Track configuration (para gauge charts)
		trackOuterRadius?: number;
		trackInnerRadius?: number;
		trackColor?: string;

		// Range and placement
		range?: [number, number];
		placement?: 'left' | 'center' | 'right';
		center?: boolean;

		// Legend configuration
		showLegend?: boolean;
		legend?: boolean | Record<string, any>;
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

		// Tooltip configuration
		showTooltip?: boolean;
		tooltip?: boolean | Record<string, any>;

		// Rendering
		renderContext?: 'svg' | 'canvas';
		debug?: boolean;

		// Max value for gauge charts
		maxValue?: number;

		// Props object for granular control
		props?: Record<string, any>;

		// Event handlers
		onArcClick?: (e: MouseEvent, detail: any) => void;
		onTooltipClick?: (e: MouseEvent, detail: any) => void;

		// Snippets/slots
		children?: any;
		arc?: any;
		marks?: any;
		aboveContext?: any;
		belowContext?: any;
		aboveMarks?: any;
		belowMarks?: any;
	};

	let {
		data = [],
		series = undefined,
		class: className = 'w-full h-64',
		colors = [
			'var(--color-primary)',
			'var(--color-secondary)',
			'var(--color-info)',
			'var(--color-success)',
			'var(--color-warning)',
			'var(--color-danger)'
		],

		// Accessors
		key = 'key',
		label = 'label',
		value = 'value',
		c = undefined,

		// Arc configuration
		innerRadius = -20,
		outerRadius = undefined,
		cornerRadius = 8,
		padAngle = 0.02,

		// Track configuration
		trackOuterRadius = undefined,
		trackInnerRadius = undefined,
		trackColor = undefined,

		// Range and placement
		range = [0, 180],
		placement = 'center',
		center = undefined,

		// Legend
		showLegend = true,
		legend = undefined,
		legendPlacement = 'bottom',
		legendOrientation = 'horizontal',
		legendTitle = undefined,

		// Tooltip
		showTooltip = true,
		tooltip = undefined,

		// Rendering
		renderContext = 'svg',
		debug = false,

		// Max value
		maxValue = undefined,

		// Props object
		props = {},

		// Event handlers
		onArcClick = undefined,
		onTooltipClick = undefined,

		// Snippets
		children = undefined,
		arc = undefined,
		marks = undefined,
		aboveContext = undefined,
		belowContext = undefined,
		aboveMarks = undefined,
		belowMarks = undefined
	}: Props = $props();

	// Preparar datos si no se usa series
	const chartData = $derived(
		series
			? undefined
			: data.map((item, index) => ({
					...item,
					key: item.key || item.label || `item-${index}`,
					label: item.label || item.key || `Item ${index + 1}`,
					color: item.color || colors[index % colors.length]
				}))
	);

	// Configurar legend
	const legendConfig = $derived(
		legend !== undefined
			? legend
			: showLegend
				? {
						placement: legendPlacement,
						orientation: legendOrientation,
						...(legendTitle ? { title: legendTitle } : {})
					}
				: false
	);

	// Configurar tooltip
	const tooltipConfig = $derived(tooltip !== undefined ? tooltip : showTooltip);

	// Merge props con track config en props.arc
	const mergedProps = $derived({
		...props,
		arc: {
			...props.arc,
			...(trackOuterRadius !== undefined && { trackOuterRadius }),
			...(trackInnerRadius !== undefined && { trackInnerRadius }),
			...(trackColor !== undefined && { trackColor })
		}
	});
</script>

<div class={cn('chart-container', className)}>
	<LayerArcChart
		data={chartData}
		{series}
		{key}
		{label}
		{value}
		{c}
		{innerRadius}
		{outerRadius}
		{cornerRadius}
		{padAngle}
		{range}
		{placement}
		{center}
		{maxValue}
		legend={legendConfig}
		tooltip={tooltipConfig}
		{renderContext}
		{debug}
		props={mergedProps}
		{onArcClick}
		{onTooltipClick}
		{children}
		{arc}
		{marks}
		{aboveContext}
		{belowContext}
		{aboveMarks}
		{belowMarks}
	/>
</div>
