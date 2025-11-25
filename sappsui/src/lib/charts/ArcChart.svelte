<script lang="ts">
	import { cn } from '$lib/utils/class-names.js';
	import { onMount, untrack } from 'svelte';

	type Color = 'primary' | 'secondary' | 'success' | 'info' | 'warning' | 'danger' | 'muted';

	interface ArcData {
		value: number;
		max: number;
		color: Color;
		label?: string;
	}

	interface Props {
		arcs?: ArcData[];
		centerText?: string;
		centerValue?: string | number;
		thickness?: number;
		gap?: number;
		animated?: boolean;
		animationDuration?: number;
		loading?: boolean;
		empty?: boolean;
		emptyText?: string;
		size?: number;
		class?: string;
	}

	let {
		arcs = [],
		centerText = '',
		centerValue = '',
		thickness = 16,
		gap = 8,
		animated = true,
		animationDuration = 1000,
		loading = false,
		empty = false,
		emptyText = 'No data',
		size = 300,
		class: className
	}: Props = $props();

	let containerEl: HTMLDivElement | undefined = $state();
	let displayPercentages = $state<number[]>(arcs.map(() => 0));
	let animationFrameId: number | null = null;

	let tooltipData = $state<(ArcData & { percentage: number }) | null>(null);
	let tooltipPosition = $state<{ x: number; y: number }>({ x: 0, y: 0 });
	let isTooltipActive = $state(false);

	let viewBoxSize = $derived(size);
	let center = $derived(viewBoxSize / 2);
	let maxRadius = $derived(center - 20);

	// Auto-calcular el total si no se proporciona centerValue
	let computedCenterValue = $derived(centerValue || arcs.reduce((sum, arc) => sum + arc.value, 0));

	onMount(() => {
		return () => {
			if (animationFrameId !== null) {
				cancelAnimationFrame(animationFrameId);
			}
		};
	});

	$effect(() => {
		const targetPercentages = arcs.map((arc) => Math.min(Math.max(arc.value / arc.max, 0), 1));

		if (animationFrameId !== null) {
			cancelAnimationFrame(animationFrameId);
			animationFrameId = null;
		}

		if (animated) {
			const startTime = Date.now();
			const startPercentages = untrack(() => [...displayPercentages]);

			const animate = () => {
				const now = Date.now();
				const progress = Math.min((now - startTime) / animationDuration, 1);
				const easeProgress = 1 - Math.pow(1 - progress, 3);

				const newPercentages = startPercentages.map(
					(start, i) => start + (targetPercentages[i] - start) * easeProgress
				);

				displayPercentages = newPercentages;

				if (progress < 1) {
					animationFrameId = requestAnimationFrame(animate);
				} else {
					animationFrameId = null;
				}
			};

			animationFrameId = requestAnimationFrame(animate);
		} else {
			displayPercentages = targetPercentages;
		}
	});

	function handleArcHover(arc: ArcData, percentage: number, event: MouseEvent): void {
		const target = event.target as SVGCircleElement;
		const rect = target.getBoundingClientRect();

		tooltipData = { ...arc, percentage: percentage * 100 };
		tooltipPosition = {
			x: rect.right + 8,
			y: rect.top + rect.height / 2
		};
		isTooltipActive = true;
	}

	function handleArcLeave(): void {
		isTooltipActive = false;
		setTimeout(() => {
			if (!isTooltipActive) {
				tooltipData = null;
			}
		}, 100);
	}
</script>

<div bind:this={containerEl} class={cn('arc-chart-container', className)}>
	{#if loading}
		<div class="arc-chart-loading">
			<svg class="arc-chart-loading-spinner" viewBox="0 0 24 24">
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
	{:else if empty}
		<div class="arc-chart-empty">
			<span>{emptyText}</span>
		</div>
	{:else}
		<div class="arc-chart" style="width: {size}px; height: {size}px;">
			<svg
				class="arc-chart-svg"
				viewBox="0 0 {viewBoxSize} {viewBoxSize}"
				width={size}
				height={size}
			>
				{#each arcs as arc, i}
					{@const radius = maxRadius - i * (thickness + gap)}
					{@const percentage = displayPercentages[i]}
					{@const circumference = 2 * Math.PI * radius}
					{@const strokeDashoffset = circumference * (1 - percentage)}

					<circle
						cx={center}
						cy={center}
						r={radius}
						class="arc-chart-background"
						stroke-width={thickness}
					/>

					<!-- svelte-ignore a11y_no_static_element_interactions -->
					<circle
						cx={center}
						cy={center}
						r={radius}
						class="arc-chart-arc is-{arc.color}"
						stroke-width={thickness}
						style="
							stroke-dasharray: {circumference};
							stroke-dashoffset: {strokeDashoffset};
							transform: rotate(-90deg);
							transform-origin: center;
						"
						onmouseenter={(e) => handleArcHover(arc, percentage, e)}
						onmouseleave={handleArcLeave}
					/>
				{/each}

				{#if centerText || computedCenterValue}
					<text
						x={center}
						y={center - 10}
						class="arc-chart-label"
						text-anchor="middle"
						dominant-baseline="middle"
						style="font-size: 14px; font-weight: 500;"
					>
						{centerText}
					</text>
					<text
						x={center}
						y={center + 15}
						class="arc-chart-value"
						text-anchor="middle"
						dominant-baseline="middle"
						style="font-size: 32px;"
					>
						{computedCenterValue}
					</text>
				{/if}
			</svg>
		</div>

		{#if tooltipData && isTooltipActive}
			<div
				class="arc-chart-tooltip"
				style="left: {tooltipPosition.x}px; top: {tooltipPosition.y}px;"
			>
				<div class="arc-chart-tooltip-content">
					{#if tooltipData.label}
						<div class="arc-chart-tooltip-title">{tooltipData.label}</div>
					{/if}
					<div class="arc-chart-tooltip-row">
						<div class="arc-chart-tooltip-color is-{tooltipData.color}"></div>
						<span class="arc-chart-tooltip-value">
							{tooltipData.value} / {tooltipData.max} ({tooltipData.percentage.toFixed(1)}%)
						</span>
					</div>
				</div>
			</div>
		{/if}
	{/if}
</div>
