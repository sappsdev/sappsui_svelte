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
		point: DataPoint;
		seriesName: string;
		color: Color;
	}

	interface LinearScale {
		(value: number): number;
		invert: (pixel: number) => number;
		domain: [number, number];
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
		showLine?: boolean;
		showPoints?: boolean;
		showGrid?: boolean;
		showLegend?: boolean;
		curve?: 'linear' | 'smooth';
		strokeWidth?: number;
		fillOpacity?: number;
		stacked?: boolean;
		gradient?: boolean;
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
		xKey = 'x',
		yKey = 'y',
		color = 'primary' as Color,
		colors = ['primary', 'secondary', 'success', 'info', 'warning', 'danger'] as Color[],
		showLine = true,
		showPoints = false,
		showGrid = true,
		showLegend = false,
		curve = 'linear' as 'linear' | 'smooth',
		strokeWidth = 2,
		fillOpacity = 0.3,
		stacked = false,
		gradient = true,
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

		const firstItem = data[0] as any;
		if (Array.isArray(firstItem) || (typeof firstItem === 'object' && firstItem.values)) {
			return (data as Series[]).map((s: any, i: number) => ({
				name: s.name || `Series ${i + 1}`,
				values: s.values || s,
				color: s.color || colors[i % colors.length]
			}));
		}

		return [
			{
				name: 'Data',
				values: data as DataPoint[],
				color: color
			}
		];
	});

	let xDomain = $derived.by((): [number, number] => {
		if (series.length === 0) return [0, 1];
		const allValues = series.flatMap((s) => s.values);
		return [
			Math.min(...allValues.map((d) => d[xKey] as number)),
			Math.max(...allValues.map((d) => d[xKey] as number))
		];
	});

	let yDomain = $derived.by((): [number, number] => {
		if (series.length === 0) return [0, 1];

		if (stacked) {
			const xPoints = new Map<number, number>();
			series.forEach((s) => {
				s.values.forEach((d) => {
					const x = d[xKey] as number;
					const y = d[yKey] as number;
					xPoints.set(x, (xPoints.get(x) || 0) + y);
				});
			});
			const maxSum = Math.max(...xPoints.values());
			return [0, maxSum * 1.1];
		} else {
			const allValues = series.flatMap((s) => s.values);
			const values = allValues.map((d) => d[yKey] as number);
			const max = Math.max(...values);
			return [0, max * 1.1];
		}
	});

	function createAreaPath(points: DataPoint[], baselineY: number, smooth: boolean = false): string {
		if (points.length === 0) return '';

		const xScale = createLinearScale(xDomain, [0, innerWidth]);
		const yScale = createLinearScale(yDomain, [innerHeight, 0]);

		let path = `M ${xScale(points[0][xKey] as number)} ${baselineY}`;
		path += ` L ${xScale(points[0][xKey] as number)} ${yScale(points[0][yKey] as number)}`;

		if (smooth && points.length > 1) {
			for (let i = 1; i < points.length; i++) {
				const x0 = xScale(points[i - 1][xKey] as number);
				const y0 = yScale(points[i - 1][yKey] as number);
				const x1 = xScale(points[i][xKey] as number);
				const y1 = yScale(points[i][yKey] as number);
				const cpx = (x0 + x1) / 2;
				path += ` C ${cpx} ${y0}, ${cpx} ${y1}, ${x1} ${y1}`;
			}
		} else {
			for (let i = 1; i < points.length; i++) {
				path += ` L ${xScale(points[i][xKey] as number)} ${yScale(points[i][yKey] as number)}`;
			}
		}

		path += ` L ${xScale(points[points.length - 1][xKey] as number)} ${baselineY}`;
		path += ' Z';

		return path;
	}

	function createLinePath(points: DataPoint[], smooth: boolean = false): string {
		if (points.length === 0) return '';

		const xScale = createLinearScale(xDomain, [0, innerWidth]);
		const yScale = createLinearScale(yDomain, [innerHeight, 0]);

		let path = `M ${xScale(points[0][xKey] as number)} ${yScale(points[0][yKey] as number)}`;

		if (smooth && points.length > 1) {
			for (let i = 1; i < points.length; i++) {
				const x0 = xScale(points[i - 1][xKey] as number);
				const y0 = yScale(points[i - 1][yKey] as number);
				const x1 = xScale(points[i][xKey] as number);
				const y1 = yScale(points[i][yKey] as number);
				const cpx = (x0 + x1) / 2;
				path += ` C ${cpx} ${y0}, ${cpx} ${y1}, ${x1} ${y1}`;
			}
		} else {
			for (let i = 1; i < points.length; i++) {
				path += ` L ${xScale(points[i][xKey] as number)} ${yScale(points[i][yKey] as number)}`;
			}
		}

		return path;
	}

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

		const xMap = new Map<number, number>();
		const allXValues = [
			...new Set(series.flatMap((s) => s.values.map((d) => d[xKey] as number)))
		].sort((a, b) => a - b);
		allXValues.forEach((x) => xMap.set(x, 0));

		return series.map((s) => {
			const stackedValues = s.values.map((d) => {
				const x = d[xKey] as number;
				const y = d[yKey] as number;
				const baseline = xMap.get(x) || 0;
				xMap.set(x, baseline + y);
				return {
					...d,
					y0: baseline,
					y1: baseline + y,
					[yKey]: baseline + y
				};
			});

			return { ...s, values: stackedValues };
		});
	});

	let tooltipData = $state<TooltipData | null>(null);
	let tooltipPosition = $state<{ x: number; y: number }>({ x: 0, y: 0 });
	let isTooltipActive = $state(false);

	function handlePointHover(
		point: DataPoint,
		seriesName: string,
		event: MouseEvent,
		pointColor: Color
	): void {
		const target = event.target as SVGCircleElement;
		const rect = target.getBoundingClientRect();

		tooltipData = { point, seriesName, color: pointColor };
		tooltipPosition = {
			x: rect.right + 8,
			y: rect.top + rect.height / 2
		};
		isTooltipActive = true;
	}

	function handlePointLeave(): void {
		isTooltipActive = false;
		setTimeout(() => {
			if (!isTooltipActive) {
				tooltipData = null;
			}
		}, 100);
	}
</script>

<div
	class="area-chart-container {className}"
	style="width: {width}px; height: {height}px;"
	{...restProps}
>
	{#if loading}
		<div class="area-chart-loading">
			<svg class="area-chart-loading-spinner" viewBox="0 0 24 24">
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
		<div class="area-chart-empty">
			<svg class="area-chart-empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					stroke-width="2"
					d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z"
				/>
			</svg>
			<span>{emptyText}</span>
		</div>
	{:else}
		<div class="area-chart">
			<svg class="area-chart-svg" {width} {height}>
				<defs>
					{#each series as s, i}
						{#if gradient}
							<linearGradient id="area-gradient-{i}" x1="0%" y1="0%" x2="0%" y2="100%">
								<stop
									offset="0%"
									class="area-chart-gradient-start is-{s.color}"
									style="stop-opacity: {fillOpacity}"
								/>
								<stop
									offset="100%"
									class="area-chart-gradient-end is-{s.color}"
									style="stop-opacity: 0.05"
								/>
							</linearGradient>
						{/if}
					{/each}
				</defs>

				<g transform="translate({margin.left}, {margin.top})">
					{#if series.length > 0}
						{@const grid = createGridLines()}
						{@const xScale = createLinearScale(xDomain, [0, innerWidth])}
						{@const yScale = createLinearScale(yDomain, [innerHeight, 0])}

						{#if showGrid}
							<g class="area-chart-grid">
								{#each grid as line}
									<line x1={0} y1={line.y} x2={line.x} y2={line.y} class="area-chart-grid-line" />
								{/each}
							</g>
						{/if}

						<g class="area-chart-axis">
							<line
								x1={0}
								y1={innerHeight}
								x2={innerWidth}
								y2={innerHeight}
								class="area-chart-axis-line"
							/>
							<line x1={0} y1={0} x2={0} y2={innerHeight} class="area-chart-axis-line" />

							{#each grid as line}
								<text
									x={-10}
									y={line.y}
									class="area-chart-axis-label"
									text-anchor="end"
									dominant-baseline="middle"
								>
									{formatNumber(line.value)}
								</text>
							{/each}
						</g>

						{#each stacked ? stackedData : series as s, i}
							{@const baselineY =
								stacked && s.values[0]?.y0 !== undefined ? yScale(s.values[0].y0) : innerHeight}

							<path
								d={createAreaPath(s.values, baselineY, curve === 'smooth')}
								fill={gradient ? `url(#area-gradient-${i})` : undefined}
								class="area-chart-area is-{s.color}"
								style={!gradient ? `opacity: ${fillOpacity}` : ''}
							/>

							{#if showLine}
								<path
									d={createLinePath(s.values, curve === 'smooth')}
									class="area-chart-line is-{s.color}"
									style="stroke-width: {strokeWidth};"
								/>
							{/if}

							{#if showPoints}
								{#each s.values as point}
									<!-- svelte-ignore a11y_no_static_element_interactions -->
									<circle
										cx={xScale(point[xKey] as number)}
										cy={yScale(point[yKey] as number)}
										r={3}
										class="area-chart-point is-{s.color}"
										onmouseenter={(e) => handlePointHover(point, s.name, e, s.color)}
										onmouseleave={handlePointLeave}
									/>
								{/each}
							{/if}
						{/each}
					{/if}
				</g>
			</svg>
		</div>

		{#if tooltipData && isTooltipActive}
			<div
				class="area-chart-tooltip"
				style="top: {tooltipPosition.y}px; left: {tooltipPosition.x}px;"
			>
				<div class="area-chart-tooltip-content">
					{#if tooltipData.seriesName !== 'Data'}
						<div class="area-chart-tooltip-title">{tooltipData.seriesName}</div>
					{/if}
					<div class="area-chart-tooltip-row">
						<span class="area-chart-tooltip-label">{xKey}:</span>
						<span class="area-chart-tooltip-value">{tooltipData.point[xKey]}</span>
					</div>
					<div class="area-chart-tooltip-row">
						<span class="area-chart-tooltip-label">{yKey}:</span>
						<span class="area-chart-tooltip-value">{tooltipData.point[yKey]}</span>
					</div>
				</div>
			</div>
		{/if}

		{#if showLegend && series.length > 1}
			<div class="area-chart-legend">
				{#each series as s}
					<div class="area-chart-legend-item">
						<div class="area-chart-legend-color is-{s.color}"></div>
						<span>{s.name}</span>
					</div>
				{/each}
			</div>
		{/if}
	{/if}
</div>
