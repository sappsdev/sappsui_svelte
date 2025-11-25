<script lang="ts">
	type Color = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'muted';

	interface CandleData {
		[key: string]: any;
	}

	interface Margin {
		top: number;
		right: number;
		bottom: number;
		left: number;
	}

	interface LinearScale {
		(value: number): number;
		invert: (pixel: number) => number;
		domain: [number, number];
		range: [number, number];
	}

	interface BandScale {
		(value: string | number): number;
		bandwidth: () => number;
		domain: (string | number)[];
		range: [number, number];
	}

	interface Props {
		data?: CandleData[];
		width?: number;
		height?: number;
		margin?: Margin;
		dateKey?: string;
		openKey?: string;
		highKey?: string;
		lowKey?: string;
		closeKey?: string;
		volumeKey?: string;
		showVolume?: boolean;
		showGrid?: boolean;
		candleWidth?: number;
		bullishColor?: Color;
		bearishColor?: Color;
		wickWidth?: number;
		loading?: boolean;
		empty?: boolean;
		emptyText?: string;
		class?: string;
		[key: string]: any;
	}

	let {
		data = [],
		width = 800,
		height = 400,
		margin = { top: 20, right: 20, bottom: 40, left: 60 },
		dateKey = 'date',
		openKey = 'open',
		highKey = 'high',
		lowKey = 'low',
		closeKey = 'close',
		volumeKey = 'volume',
		showVolume = false,
		showGrid = true,
		candleWidth = 8,
		bullishColor = 'success' as Color,
		bearishColor = 'danger' as Color,
		wickWidth = 1,
		loading = false,
		empty = false,
		emptyText = 'No data available',
		class: className = '',
		...restProps
	}: Props = $props();

	function createLinearScale(domain: [number, number], range: [number, number]): LinearScale {
		const [d0, d1] = domain;
		const [r0, r1] = range;

		const scale = (value: number): number => {
			return r0 + ((value - d0) / (d1 - d0)) * (r1 - r0);
		};

		scale.invert = (pixel: number): number => {
			return d0 + ((pixel - r0) / (r1 - r0)) * (d1 - d0);
		};

		scale.domain = domain;
		scale.range = range;

		return scale;
	}

	function createBandScale(
		domain: (string | number)[],
		range: [number, number],
		padding: number = 0.1
	): BandScale {
		const [r0, r1] = range;
		const rangeSize = r1 - r0;
		const step = rangeSize / (domain.length + padding * (domain.length - 1));
		const bandwidth = step * (1 - padding);

		const scale = (value: string | number): number => {
			const index = domain.indexOf(value);
			if (index === -1) return r0;
			return r0 + index * step + (step - bandwidth) / 2;
		};

		scale.bandwidth = () => bandwidth;
		scale.domain = domain;
		scale.range = range;

		return scale;
	}

	function formatNumber(value: number): string {
		if (value === 0) return '0';
		const abs = Math.abs(value);
		if (abs >= 1e9) return `${(value / 1e9).toFixed(1)}B`;
		if (abs >= 1e6) return `${(value / 1e6).toFixed(1)}M`;
		if (abs >= 1e3) return `${(value / 1e3).toFixed(1)}K`;
		if (abs < 1) return value.toFixed(2);
		return value.toFixed(0);
	}

	function formatPrice(value: number): string {
		return value.toFixed(2);
	}

	function formatDate(date: string | Date): string {
		if (typeof date === 'string') {
			const d = new Date(date);
			return `${d.getMonth() + 1}/${d.getDate()}`;
		}
		return date.toLocaleDateString();
	}

	let innerWidth = $derived(width - margin.left - margin.right);
	let innerHeight = $derived(height - margin.top - margin.bottom);

	let priceHeight = $derived(showVolume ? innerHeight * 0.75 : innerHeight);
	let volumeHeight = $derived(showVolume ? innerHeight * 0.2 : 0);
	let volumeTop = $derived(showVolume ? priceHeight + 10 : 0);

	let priceDomain = $derived.by((): [number, number] => {
		if (data.length === 0) return [0, 1];
		const allPrices = data.flatMap((d) => [d[highKey] as number, d[lowKey] as number]);
		const min = Math.min(...allPrices);
		const max = Math.max(...allPrices);
		const padding = (max - min) * 0.1;
		return [min - padding, max + padding];
	});

	let volumeDomain = $derived.by((): [number, number] => {
		if (!showVolume || data.length === 0) return [0, 1];
		const volumes = data.map((d) => (d[volumeKey] as number) || 0);
		return [0, Math.max(...volumes) * 1.2];
	});

	let xScale = $derived(
		createBandScale(
			data.map((d) => d[dateKey]),
			[0, innerWidth],
			0.3
		)
	);
	let priceScale = $derived(createLinearScale(priceDomain, [priceHeight, 0]));
	let volumeScale = $derived(
		showVolume ? createLinearScale(volumeDomain, [volumeHeight, 0]) : null
	);
	let grid = $derived(createGridLines(priceHeight));

	function createGridLines(priceH: number): Array<{ x: number; y: number; value: number }> {
		const yScale = createLinearScale(priceDomain, [priceH, 0]);
		const yTicks = 5;

		return Array.from({ length: yTicks + 1 }, (_, i) => {
			const value = priceDomain[0] + (priceDomain[1] - priceDomain[0]) * (i / yTicks);
			return { x: innerWidth, y: yScale(value), value };
		});
	}

	let tooltipData = $state<CandleData | null>(null);
	let tooltipPosition = $state<{ x: number; y: number }>({ x: 0, y: 0 });
	let isTooltipActive = $state(false);

	function handleCandleHover(candle: CandleData, event: MouseEvent): void {
		const target = event.target as SVGElement;
		const rect = target.getBoundingClientRect();

		tooltipData = candle;
		tooltipPosition = {
			x: rect.right + 8,
			y: rect.top + rect.height / 2
		};
		isTooltipActive = true;
	}

	function handleCandleLeave(): void {
		isTooltipActive = false;
		setTimeout(() => {
			if (!isTooltipActive) {
				tooltipData = null;
			}
		}, 100);
	}
</script>

<div
	class="candlestick-chart-container {className}"
	style="width: {width}px; height: {height}px;"
	{...restProps}
>
	{#if loading}
		<div class="candlestick-chart-loading">
			<svg class="candlestick-chart-loading-spinner" viewBox="0 0 24 24">
				<circle
					cx="12"
					cy="12"
					r="10"
					stroke="currentColor"
					stroke-width="4"
					fill="none"
					opacity="0.25"
				/>
				<path
					fill="currentColor"
					d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
				/>
			</svg>
		</div>
	{:else if empty || data.length === 0}
		<div class="candlestick-chart-empty">
			<svg
				class="candlestick-chart-empty-icon"
				fill="none"
				viewBox="0 0 24 24"
				stroke="currentColor"
			>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"
				/>
			</svg>
			<span>{emptyText}</span>
		</div>
	{:else}
		<div class="candlestick-chart">
			<svg class="candlestick-chart-svg" {width} {height}>
				<g transform="translate({margin.left}, {margin.top})">
					{#if showGrid}
						<g class="candlestick-chart-grid">
							{#each grid as line}
								<line
									x1={0}
									y1={line.y}
									x2={line.x}
									y2={line.y}
									class="candlestick-chart-grid-line"
								/>
							{/each}
						</g>
					{/if}

					<g class="candlestick-chart-axis">
						<line
							x1={0}
							y1={priceHeight}
							x2={innerWidth}
							y2={priceHeight}
							class="candlestick-chart-axis-line"
						/>
						<line x1={0} y1={0} x2={0} y2={priceHeight} class="candlestick-chart-axis-line" />

						{#each grid as line}
							<text
								x={-10}
								y={line.y}
								class="candlestick-chart-axis-label"
								text-anchor="end"
								dominant-baseline="middle"
							>
								{formatPrice(line.value)}
							</text>
						{/each}

						{#each data.filter((_, i) => i % Math.ceil(data.length / 6) === 0) as d}
							<text
								x={xScale(d[dateKey]) + xScale.bandwidth() / 2}
								y={priceHeight + 20}
								class="candlestick-chart-axis-label"
								text-anchor="middle"
								font-size="10"
							>
								{formatDate(d[dateKey])}
							</text>
						{/each}

						{#if showVolume}
							<line
								x1={0}
								y1={volumeTop + volumeHeight}
								x2={innerWidth}
								y2={volumeTop + volumeHeight}
								class="candlestick-chart-axis-line"
							/>
						{/if}
					</g>

					{#each data as d}
						{@const x = xScale(d[dateKey]) + xScale.bandwidth() / 2}
						{@const open = priceScale(d[openKey] as number)}
						{@const close = priceScale(d[closeKey] as number)}
						{@const high = priceScale(d[highKey] as number)}
						{@const low = priceScale(d[lowKey] as number)}
						{@const isBullish = (d[closeKey] as number) >= (d[openKey] as number)}
						{@const bodyTop = Math.min(open, close)}
						{@const bodyHeight = Math.abs(open - close)}

						<!-- svelte-ignore a11y_no_static_element_interactions -->
						<g onmouseenter={(e) => handleCandleHover(d, e)} onmouseleave={handleCandleLeave}>
							<line
								x1={x}
								y1={high}
								x2={x}
								y2={low}
								class="candlestick-chart-wick {isBullish ? 'is-bullish' : 'is-bearish'}"
								style="stroke-width: {wickWidth};"
							/>

							<rect
								x={x - candleWidth / 2}
								y={bodyTop}
								width={candleWidth}
								height={Math.max(bodyHeight, 1)}
								class="candlestick-chart-candle {isBullish ? 'is-bullish' : 'is-bearish'}"
							/>
						</g>

						{#if showVolume && d[volumeKey] && volumeScale}
							{@const volumeBarHeight = volumeScale(volumeDomain[1] - (d[volumeKey] as number))}
							<rect
								x={xScale(d[dateKey])}
								y={volumeTop + volumeBarHeight}
								width={xScale.bandwidth()}
								height={volumeHeight - volumeBarHeight}
								class="candlestick-chart-volume {isBullish ? 'is-bullish' : 'is-bearish'}"
							/>
						{/if}
					{/each}
				</g>
			</svg>
		</div>

		{#if tooltipData && isTooltipActive}
			<div
				class="candlestick-chart-tooltip"
				style="top: {tooltipPosition.y}px; left: {tooltipPosition.x}px;"
			>
				<div class="candlestick-chart-tooltip-content">
					<div class="candlestick-chart-tooltip-title">{formatDate(tooltipData[dateKey])}</div>
					<div class="candlestick-chart-tooltip-rows">
						<div class="candlestick-chart-tooltip-row">
							<span class="candlestick-chart-tooltip-label">Open:</span>
							<span class="candlestick-chart-tooltip-value"
								>{formatPrice(tooltipData[openKey])}</span
							>
						</div>
						<div class="candlestick-chart-tooltip-row">
							<span class="candlestick-chart-tooltip-label">High:</span>
							<span class="candlestick-chart-tooltip-value"
								>{formatPrice(tooltipData[highKey])}</span
							>
						</div>
						<div class="candlestick-chart-tooltip-row">
							<span class="candlestick-chart-tooltip-label">Low:</span>
							<span class="candlestick-chart-tooltip-value">{formatPrice(tooltipData[lowKey])}</span
							>
						</div>
						<div class="candlestick-chart-tooltip-row">
							<span class="candlestick-chart-tooltip-label">Close:</span>
							<span class="candlestick-chart-tooltip-value"
								>{formatPrice(tooltipData[closeKey])}</span
							>
						</div>
						{#if showVolume && tooltipData[volumeKey]}
							<div class="candlestick-chart-tooltip-row candlestick-chart-tooltip-volume">
								<span class="candlestick-chart-tooltip-label">Volume:</span>
								<span class="candlestick-chart-tooltip-value"
									>{formatNumber(tooltipData[volumeKey])}</span
								>
							</div>
						{/if}
					</div>
				</div>
			</div>
		{/if}
	{/if}
</div>
