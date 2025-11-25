<script lang="ts">
	type Color = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'muted';

	interface DataPoint {
		[key: string]: any;
	}

	interface Series {
		name: string;
		values: DataPoint[];
		color: Color;
	}

	interface Margin {
		top: number;
		right: number;
		bottom: number;
		left: number;
	}

	interface TooltipData {
		value: number;
		category: string | number;
		seriesName: string;
		color: Color;
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
		data?: DataPoint[] | Series[];
		width?: number;
		height?: number;
		margin?: Margin;
		xKey?: string;
		yKey?: string;
		color?: Color;
		colors?: Color[];
		horizontal?: boolean;
		grouped?: boolean;
		stacked?: boolean;
		showGrid?: boolean;
		showLegend?: boolean;
		showValues?: boolean;
		barPadding?: number;
		groupPadding?: number;
		barRadius?: number;
		loading?: boolean;
		empty?: boolean;
		emptyText?: string;
		class?: string;
		[key: string]: any;
	}

	let {
		data = [],
		width = 600,
		height = 400,
		margin = { top: 20, right: 20, bottom: 40, left: 50 },
		xKey = 'label',
		yKey = 'value',
		color = 'primary' as Color,
		colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger'] as Color[],
		horizontal = false,
		grouped = false,
		stacked = false,
		showGrid = true,
		showLegend = false,
		showValues = false,
		barPadding = 0.2,
		groupPadding = 0.1,
		barRadius = 0,
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

	let innerWidth = $derived(width - margin.left - margin.right);
	let innerHeight = $derived(height - margin.top - margin.bottom);

	let series = $derived.by((): Series[] => {
		if (data.length === 0) return [];

		if (grouped || stacked) {
			const firstItem = data[0] as any;
			if (Array.isArray(firstItem) || (typeof firstItem === 'object' && firstItem.values)) {
				return (data as Series[]).map((s: any, i: number) => ({
					name: s.name || `Series ${i + 1}`,
					values: s.values || s,
					color: s.color || colors[i % colors.length]
				}));
			}
		}

		return [
			{
				name: 'Data',
				values: data as DataPoint[],
				color: color
			}
		];
	});

	let categories = $derived.by((): (string | number)[] => {
		if (series.length === 0) return [];
		return [...new Set(series[0].values.map((d) => d[xKey]))];
	});

	let yDomain = $derived.by((): [number, number] => {
		if (series.length === 0) return [0, 1];

		if (stacked) {
			const stackedValues = new Map<string | number, number>();
			series.forEach((s) => {
				s.values.forEach((d) => {
					const key = d[xKey];
					stackedValues.set(key, (stackedValues.get(key) || 0) + (d[yKey] as number));
				});
			});
			const max = Math.max(...stackedValues.values());
			return [0, max * 1.1];
		} else {
			const allValues = series.flatMap((s) => s.values.map((d) => d[yKey] as number));
			const max = Math.max(...allValues);
			return [0, max * 1.1];
		}
	});

	function createGridLines(): Array<{ x: number; y: number; value: number }> {
		const yScale = createLinearScale(yDomain, [innerHeight, 0]);
		const yTicks = 5;

		return Array.from({ length: yTicks + 1 }, (_, i) => {
			const value = yDomain[0] + (yDomain[1] - yDomain[0]) * (i / yTicks);
			return { x: innerWidth, y: yScale(value), value };
		});
	}

	let stackedData = $derived.by((): Series[] => {
		if (!stacked || series.length === 0) return series;

		const stackMap = new Map<string | number, number>();
		categories.forEach((cat) => stackMap.set(cat, 0));

		return series.map((s) => {
			const stackedValues = s.values.map((d) => {
				const key = d[xKey];
				const baseline = stackMap.get(key) || 0;
				const value = d[yKey] as number;
				stackMap.set(key, baseline + value);

				return {
					...d,
					y0: baseline,
					y1: baseline + value
				};
			});

			return { ...s, values: stackedValues };
		});
	});

	let tooltipData = $state<TooltipData | null>(null);
	let tooltipPosition = $state<{ x: number; y: number }>({ x: 0, y: 0 });
	let isTooltipActive = $state(false);

	function handleBarHover(
		value: number,
		category: string | number,
		seriesName: string,
		event: MouseEvent,
		barColor: Color
	): void {
		const target = event.target as SVGRectElement;
		const rect = target.getBoundingClientRect();

		tooltipData = { value, category, seriesName, color: barColor };
		tooltipPosition = {
			x: rect.right + 8,
			y: rect.top + rect.height / 2
		};
		isTooltipActive = true;
	}

	function handleBarLeave(): void {
		isTooltipActive = false;
		setTimeout(() => {
			if (!isTooltipActive) {
				tooltipData = null;
			}
		}, 100);
	}
</script>

<div
	class="bar-chart-container {className}"
	style="width: {width}px; height: {height}px;"
	{...restProps}
>
	{#if loading}
		<div class="bar-chart-loading">
			<svg class="bar-chart-loading-spinner" viewBox="0 0 24 24">
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
		<div class="bar-chart-empty">
			<svg class="bar-chart-empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
				/>
			</svg>
			<span>{emptyText}</span>
		</div>
	{:else}
		<div class="bar-chart">
			<svg class="bar-chart-svg" {width} {height}>
				<g transform="translate({margin.left}, {margin.top})">
					{#if series.length > 0 && categories.length > 0}
						{@const grid = createGridLines()}
						{@const xScale = createBandScale(categories, [0, innerWidth], barPadding)}
						{@const yScale = createLinearScale(yDomain, [innerHeight, 0])}

						{#if showGrid}
							<g class="bar-chart-grid">
								{#each grid as line}
									<line x1={0} y1={line.y} x2={line.x} y2={line.y} class="bar-chart-grid-line" />
								{/each}
							</g>
						{/if}

						<g class="bar-chart-axis">
							<line
								x1={0}
								y1={innerHeight}
								x2={innerWidth}
								y2={innerHeight}
								class="bar-chart-axis-line"
							/>
							<line x1={0} y1={0} x2={0} y2={innerHeight} class="bar-chart-axis-line" />

							{#each grid as line}
								<text
									x={-10}
									y={line.y}
									class="bar-chart-axis-label"
									text-anchor="end"
									dominant-baseline="middle"
								>
									{formatNumber(line.value)}
								</text>
							{/each}

							{#each categories as category}
								<text
									x={xScale(category) + xScale.bandwidth() / 2}
									y={innerHeight + 20}
									class="bar-chart-axis-label"
									text-anchor="middle"
								>
									{category}
								</text>
							{/each}
						</g>

						{#if grouped && series.length > 1}
							{@const groupScale = createBandScale(
								series.map((_, i) => i),
								[0, xScale.bandwidth()],
								groupPadding
							)}

							{#each series as s, seriesIndex}
								{#each s.values as d}
									{@const categoryX = xScale(d[xKey])}
									{@const barX = categoryX + groupScale(seriesIndex)}
									{@const barWidth = groupScale.bandwidth()}
									{@const barHeight = innerHeight - yScale(d[yKey] as number)}
									{@const barY = yScale(d[yKey] as number)}

									<!-- svelte-ignore a11y_no_static_element_interactions -->
									<rect
										x={barX}
										y={barY}
										width={barWidth}
										height={barHeight}
										rx={barRadius}
										ry={barRadius}
										class="bar-chart-bar is-{s.color}"
										onmouseenter={(e) =>
											handleBarHover(d[yKey] as number, d[xKey], s.name, e, s.color)}
										onmouseleave={handleBarLeave}
									/>

									{#if showValues}
										<text
											x={barX + barWidth / 2}
											y={barY - 5}
											class="bar-chart-axis-label"
											text-anchor="middle"
											font-size="10"
										>
											{d[yKey]}
										</text>
									{/if}
								{/each}
							{/each}
						{:else if stacked && series.length > 1}
							{#each stackedData as s}
								{#each s.values as d}
									{@const barX = xScale(d[xKey])}
									{@const barWidth = xScale.bandwidth()}
									{@const barY = yScale(d.y1 as number)}
									{@const barHeight = yScale(d.y0 as number) - yScale(d.y1 as number)}

									<!-- svelte-ignore a11y_no_static_element_interactions -->
									<rect
										x={barX}
										y={barY}
										width={barWidth}
										height={barHeight}
										rx={barRadius}
										ry={barRadius}
										class="bar-chart-bar is-{s.color}"
										onmouseenter={(e) =>
											handleBarHover(d[yKey] as number, d[xKey], s.name, e, s.color)}
										onmouseleave={handleBarLeave}
									/>
								{/each}
							{/each}
						{:else}
							{#each series[0].values as d}
								{@const barX = xScale(d[xKey])}
								{@const barWidth = xScale.bandwidth()}
								{@const barHeight = innerHeight - yScale(d[yKey] as number)}
								{@const barY = yScale(d[yKey] as number)}

								<!-- svelte-ignore a11y_no_static_element_interactions -->
								<rect
									x={barX}
									y={barY}
									width={barWidth}
									height={barHeight}
									rx={barRadius}
									ry={barRadius}
									class="bar-chart-bar is-{series[0].color}"
									onmouseenter={(e) =>
										handleBarHover(d[yKey] as number, d[xKey], series[0].name, e, series[0].color)}
									onmouseleave={handleBarLeave}
								/>

								{#if showValues}
									<text
										x={barX + barWidth / 2}
										y={barY - 5}
										class="bar-chart-axis-label"
										text-anchor="middle"
										font-size="10"
									>
										{d[yKey]}
									</text>
								{/if}
							{/each}
						{/if}
					{/if}
				</g>
			</svg>
		</div>

		{#if tooltipData && isTooltipActive}
			<div
				class="bar-chart-tooltip"
				style="top: {tooltipPosition.y}px; left: {tooltipPosition.x}px;"
			>
				<div class="bar-chart-tooltip-content">
					{#if tooltipData.seriesName !== 'Data'}
						<div class="bar-chart-tooltip-title">{tooltipData.seriesName}</div>
					{/if}
					<div class="bar-chart-tooltip-row">
						<span class="bar-chart-tooltip-label">{tooltipData.category}:</span>
						<span class="bar-chart-tooltip-value">{tooltipData.value}</span>
					</div>
				</div>
			</div>
		{/if}

		{#if showLegend && series.length > 1}
			<div class="bar-chart-legend">
				{#each series as s}
					<div class="bar-chart-legend-item">
						<div class="bar-chart-legend-color is-{s.color}"></div>
						<span>{s.name}</span>
					</div>
				{/each}
			</div>
		{/if}
	{/if}
</div>
