<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { PieChart, Checkbox, Select } from 'sappsui';

	const colorOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'success', label: 'Success' },
		{ id: 'info', label: 'Info' },
		{ id: 'warning', label: 'Warning' },
		{ id: 'danger', label: 'Danger' },
		{ id: 'muted', label: 'Muted' }
	];

	// Sample data
	const sampleData = [
		{ label: 'Category A', value: 30 },
		{ label: 'Category B', value: 25 },
		{ label: 'Category C', value: 20 },
		{ label: 'Category D', value: 15 },
		{ label: 'Category E', value: 10 }
	];

	// Props
	let width = $state(400);
	let height = $state(400);
	let labelKey = $state('label');
	let valueKey = $state('value');
	let centerLabel = $state('Total');
	let centerValue = $state(undefined);
	let startAngle = $state(-90);
	let padAngle = $state(0);
	let donutWidth = $state(60);

	// States
	let donut = $state(false);
	let showLabels = $state(true);
	let showValues = $state(true);
	let showLegend = $state(true);
	let showPercentages = $state(true);
	let loading = $state(false);
	let empty = $state(false);

	let hasProps = $derived(
		[
			width !== 400,
			height !== 400,
			labelKey !== 'label',
			valueKey !== 'value',
			centerLabel !== 'Total',
			centerValue !== undefined,
			startAngle !== -90,
			padAngle !== 0,
			donutWidth !== 60,
			!donut,
			!showLabels,
			!showValues,
			!showLegend,
			!showPercentages,
			loading,
			empty
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { PieChart } from 'sappsui';`,
			`\n\tconst data = [`,
			`\t\t{ label: 'Category A', value: 30 },`,
			`\t\t{ label: 'Category B', value: 25 },`,
			`\t\t{ label: 'Category C', value: 20 },`,
			`\t\t{ label: 'Category D', value: 15 },`,
			`\t\t{ label: 'Category E', value: 10 }`,
			`\t];`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<PieChart`,
			hasProps && `\t{data}`,
			width !== 400 && `\twidth={${width}}`,
			height !== 400 && `\theight={${height}}`,
			labelKey !== 'label' && `\tlabelKey="${labelKey}"`,
			valueKey !== 'value' && `\tvalueKey="${valueKey}"`,
			donut && `\tdonut`,
			donutWidth !== 60 && donut && `\tdonutWidth={${donutWidth}}`,
			!showLabels && `\tshowLabels={false}`,
			!showValues && `\tshowValues={false}`,
			!showLegend && `\tshowLegend={false}`,
			!showPercentages && `\tshowPercentages={false}`,
			centerLabel !== 'Total' && donut && `\tcenterLabel="${centerLabel}"`,
			centerValue !== undefined && donut && `\tcenterValue="${centerValue}"`,
			startAngle !== -90 && `\tstartAngle={${startAngle}}`,
			padAngle !== 0 && `\tpadAngle={${padAngle}}`,
			loading && `\tloading`,
			empty && `\tempty`,
			hasProps && `/>`,
			!hasProps && `<PieChart {data} />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'data', type: 'DataPoint[]', initial: '[]', required: true },
		{ prop: 'width', type: 'number', initial: '400' },
		{ prop: 'height', type: 'number', initial: '400' },
		{ prop: 'margin', type: 'Margin', initial: '{ top: 20, right: 20, bottom: 20, left: 20 }' },
		{ prop: 'labelKey', type: 'string', initial: 'label' },
		{ prop: 'valueKey', type: 'string', initial: 'value' },
		{
			prop: 'colors',
			type: 'Color[]',
			initial: '[primary, secondary, success, info, warning, danger, muted]'
		},
		{ prop: 'donut', type: 'boolean', initial: 'false' },
		{ prop: 'donutWidth', type: 'number', initial: '60' },
		{ prop: 'showLabels', type: 'boolean', initial: 'true' },
		{ prop: 'showValues', type: 'boolean', initial: 'true' },
		{ prop: 'showLegend', type: 'boolean', initial: 'true' },
		{ prop: 'showPercentages', type: 'boolean', initial: 'true' },
		{ prop: 'centerLabel', type: 'string', initial: 'Total' },
		{ prop: 'centerValue', type: 'string | number', initial: 'undefined' },
		{ prop: 'startAngle', type: 'number', initial: '-90' },
		{ prop: 'padAngle', type: 'number', initial: '0' },
		{ prop: 'loading', type: 'boolean', initial: 'false' },
		{ prop: 'empty', type: 'boolean', initial: 'false' },
		{ prop: 'emptyText', type: 'string', initial: 'No data available' },
		{ prop: 'class', type: 'string', initial: '' }
	];
</script>

{#snippet preview()}
	<PieChart
		data={sampleData}
		{width}
		{height}
		{labelKey}
		{valueKey}
		{donut}
		{donutWidth}
		{showLabels}
		{showValues}
		{showLegend}
		{showPercentages}
		{centerLabel}
		{centerValue}
		{startAngle}
		{padAngle}
		{loading}
		{empty}
	/>
{/snippet}

{#snippet builder()}
	<DocOptions title="Dimensions">
		<label>
			Width: {width}px
			<input type="range" min="200" max="600" bind:value={width} />
		</label>
		<label>
			Height: {height}px
			<input type="range" min="200" max="600" bind:value={height} />
		</label>
	</DocOptions>

	<DocOptions title="Appearance">
		<Checkbox bind:checked={donut} name="donut" label="Donut Chart" />
		{#if donut}
			<label>
				Donut Width: {donutWidth}px
				<input type="range" min="20" max="120" bind:value={donutWidth} />
			</label>
		{/if}
		<label>
			Start Angle: {startAngle}°
			<input type="range" min="-180" max="180" bind:value={startAngle} />
		</label>
		<label>
			Pad Angle: {padAngle}°
			<input type="range" min="0" max="10" bind:value={padAngle} />
		</label>
	</DocOptions>

	<DocOptions title="Display Options">
		<Checkbox bind:checked={showLabels} name="show-labels" label="Show Labels" />
		<Checkbox bind:checked={showValues} name="show-values" label="Show Values" />
		<Checkbox bind:checked={showLegend} name="show-legend" label="Show Legend" />
		<Checkbox bind:checked={showPercentages} name="show-percentages" label="Show Percentages" />
	</DocOptions>

	<DocOptions title="States">
		<Checkbox bind:checked={loading} name="loading" label="Loading" />
		<Checkbox bind:checked={empty} name="empty" label="Empty State" />
	</DocOptions>
{/snippet}

<DocHeader title="PieChart">
	Display data proportions in a circular chart with support for labels, legends, and donut variants.
</DocHeader>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<DocProps {props} />
