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

	interface GridLine {
		x: number;
		y: number;
		value?: number;
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
		showPoints?: boolean;
		showGrid?: boolean;
		showLegend?: boolean;
		curve?: 'linear' | 'smooth';
		strokeWidth?: number;
		pointRadius?: number;
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
		showPoints = true,
		showGrid = true,
		showLegend = false,
		curve = 'linear' as 'linear' | 'smooth',
		strokeWidth = 2,
		pointRadius = 3,
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
		const allValues = series.flatMap((s) => s.values);
		const values = allValues.map((d) => d[yKey] as number);
		const min = Math.min(...values);
		const max = Math.max(...values);
		const padding = (max - min) * 0.1;
		return [min - padding, max + padding];
	});

	function createPath(points: DataPoint[], smooth: boolean = false): string {
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

	function createGridLines(): { xLines: GridLine[]; yLines: GridLine[] } {
		const xScale = createLinearScale(xDomain, [0, innerWidth]);
		const yScale = createLinearScale(yDomain, [innerHeight, 0]);

		const xTicks = 5;
		const yTicks = 5;

		const xLines = Array.from({ length: xTicks + 1 }, (_, i) => {
			const value = xDomain[0] + (xDomain[1] - xDomain[0]) * (i / xTicks);
			return { x: xScale(value), y: innerHeight };
		});

		const yLines = Array.from({ length: yTicks + 1 }, (_, i) => {
			const value = yDomain[0] + (yDomain[1] - yDomain[0]) * (i / yTicks);
			return { x: innerWidth, y: yScale(value), value };
		});

		return { xLines, yLines };
	}

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
	class="line-chart-container {className}"
	style="width: {width}px; height: {height}px;"
	{...restProps}
>
	{#if loading}
		<div class="line-chart-loading">
			<svg class="line-chart-loading-spinner" viewBox="0 0 24 24">
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
		<div class="line-chart-empty">
			<svg class="line-chart-empty-icon" fill="none" viewBox="0 0 24 24" stroke="currentColor">
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
		<div class="line-chart">
			<svg class="line-chart-svg" {width} {height}>
				<g transform="translate({margin.left}, {margin.top})">
					{#if series.length > 0}
						{@const grid = createGridLines()}
						{@const xScale = createLinearScale(xDomain, [0, innerWidth])}
						{@const yScale = createLinearScale(yDomain, [innerHeight, 0])}

						{#if showGrid}
							<g class="line-chart-grid">
								{#each grid.yLines as line}
									<line x1={0} y1={line.y} x2={line.x} y2={line.y} class="line-chart-grid-line" />
								{/each}
							</g>
						{/if}

						<g class="line-chart-axis">
							<line
								x1={0}
								y1={innerHeight}
								x2={innerWidth}
								y2={innerHeight}
								class="line-chart-axis-line"
							/>
							<line x1={0} y1={0} x2={0} y2={innerHeight} class="line-chart-axis-line" />

							{#each grid.yLines as line}
								<text
									x={-10}
									y={line.y}
									class="line-chart-axis-label"
									text-anchor="end"
									dominant-baseline="middle"
								>
									{formatNumber(line.value!)}
								</text>
							{/each}
						</g>

						{#each series as s}
							<path
								d={createPath(s.values, curve === 'smooth')}
								class="line-chart-line is-{s.color}"
								style="stroke-width: {strokeWidth};"
							/>

							{#if showPoints}
								{#each s.values as point}
									<!-- svelte-ignore a11y_no_static_element_interactions -->
									<circle
										cx={xScale(point[xKey] as number)}
										cy={yScale(point[yKey] as number)}
										r={pointRadius}
										class="line-chart-point is-{s.color}"
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
				class="line-chart-tooltip"
				style="top: {tooltipPosition.y}px; left: {tooltipPosition.x}px;"
			>
				<div class="line-chart-tooltip-content">
					{#if tooltipData.seriesName !== 'Data'}
						<div class="line-chart-tooltip-title">{tooltipData.seriesName}</div>
					{/if}
					<div class="line-chart-tooltip-row">
						<span class="line-chart-tooltip-label">{xKey}:</span>
						<span class="line-chart-tooltip-value">{tooltipData.point[xKey]}</span>
					</div>
					<div class="line-chart-tooltip-row">
						<span class="line-chart-tooltip-label">{yKey}:</span>
						<span class="line-chart-tooltip-value">{tooltipData.point[yKey]}</span>
					</div>
				</div>
			</div>
		{/if}

		{#if showLegend && series.length > 1}
			<div class="line-chart-legend">
				{#each series as s}
					<div class="line-chart-legend-item">
						<div class="line-chart-legend-color is-{s.color}"></div>
						<span>{s.name}</span>
					</div>
				{/each}
			</div>
		{/if}
	{/if}
</div>
