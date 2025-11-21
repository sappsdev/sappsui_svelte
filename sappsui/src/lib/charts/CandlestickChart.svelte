<script lang="ts">
	import { Chart, Layer, Axis, Rule, Highlight, Tooltip } from 'layerchart';
	import { scaleUtc, scaleLinear } from 'd3-scale';
	import { cn } from '$lib/utils/class-names.js';

	export type CandlestickData = {
		date: Date | string | number;
		open: number;
		high: number;
		low: number;
		close: number;
	}[];

	type Props = {
		data: CandlestickData;
		class?: string;
		upColor?: string;
		downColor?: string;
		renderContext?: 'svg' | 'canvas';
		showGrid?: boolean;
	};

	let {
		data = [],
		class: className = 'w-full h-80',
		upColor = 'var(--color-success)',
		downColor = 'var(--color-danger)',
		renderContext = 'svg',
		showGrid = true
	}: Props = $props();

	// Procesar datos para asegurar que las fechas son objetos Date
	const processedData = $derived(
		data.map((d) => ({
			...d,
			date: d.date instanceof Date ? d.date : new Date(d.date),
			direction: d.close < d.open ? 'down' : 'up'
		}))
	);

	// Función de color basada en dirección
	const colorFn = (d: any) => (d.close < d.open ? 'down' : 'up');
</script>

<div class={cn('chart-container', className)}>
	<Chart
		data={processedData}
		x="date"
		xScale={scaleUtc()}
		y={['high', 'low']}
		yNice
		c={colorFn}
		cDomain={['down', 'up']}
		cRange={[downColor, upColor]}
		padding={{ left: 50, right: 20, bottom: 40, top: 20 }}
		tooltip={{ mode: 'quadtree-x' }}
	>
		<Layer type={renderContext}>
			{#if showGrid}
				<Axis placement="left" grid rule />
			{:else}
				<Axis placement="left" rule />
			{/if}
			<Axis placement="bottom" rule />

			<!-- High-Low line (wick) -->
			<Rule y={['high', 'low']} strokeWidth={1} />

			<!-- Open-Close line (body) -->
			<Rule y={['open', 'close']} strokeWidth={4} />

			<Highlight lines />
		</Layer>

		<Tooltip.Root>
			{#snippet children({ data })}
				<Tooltip.Header value={data.date} format={(d) => d.toLocaleDateString()} />
				<Tooltip.List>
					<Tooltip.Item label="Open" value={data.open} format="decimal" />
					<Tooltip.Item label="High" value={data.high} format="decimal" />
					<Tooltip.Item label="Low" value={data.low} format="decimal" />
					<Tooltip.Item label="Close" value={data.close} format="decimal" />
				</Tooltip.List>
			{/snippet}
		</Tooltip.Root>
	</Chart>
</div>
