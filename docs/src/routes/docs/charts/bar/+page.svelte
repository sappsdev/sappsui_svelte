<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { BarChart, Checkbox, Select } from 'sappsui';

	const colorOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'success', label: 'Success' },
		{ id: 'info', label: 'Info' },
		{ id: 'warning', label: 'Warning' },
		{ id: 'danger', label: 'Danger' },
		{ id: 'muted', label: 'Muted' }
	];

	// Selects
	let color: any = $state('primary');

	// States
	let horizontal = $state(false);
	let grouped = $state(false);
	let stacked = $state(false);
	let showGrid = $state(true);
	let showLegend = $state(false);
	let showValues = $state(false);
	let loading = $state(false);
	let empty = $state(false);

	// Sample data
	const sampleData = [
		{ label: 'January', value: 65 },
		{ label: 'February', value: 59 },
		{ label: 'March', value: 80 },
		{ label: 'April', value: 81 },
		{ label: 'May', value: 56 },
		{ label: 'June', value: 55 }
	];

	const groupedData = [
		{
			name: 'Series 1',
			values: [
				{ label: 'Q1', value: 65 },
				{ label: 'Q2', value: 59 },
				{ label: 'Q3', value: 80 },
				{ label: 'Q4', value: 81 }
			],
			color: 'primary'
		},
		{
			name: 'Series 2',
			values: [
				{ label: 'Q1', value: 45 },
				{ label: 'Q2', value: 70 },
				{ label: 'Q3', value: 55 },
				{ label: 'Q4', value: 60 }
			],
			color: 'secondary'
		}
	];

	let chartData = $derived(grouped || stacked ? groupedData : sampleData);

	let hasProps = $derived(
		[
			color !== 'primary',
			horizontal,
			grouped,
			stacked,
			!showGrid,
			showLegend,
			showValues,
			loading,
			empty
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { BarChart } from 'sappsui';`,
			``,
			grouped || stacked ? `\tconst data = [` : `\tconst data = [`,
			grouped || stacked ? `\t\t{` : `\t\t{ label: 'January', value: 65 },`,
			grouped || stacked ? `\t\t\tname: 'Series 1',` : `\t\t{ label: 'February', value: 59 },`,
			grouped || stacked ? `\t\t\tvalues: [` : `\t\t{ label: 'March', value: 80 }`,
			grouped || stacked ? `\t\t\t\t{ label: 'Q1', value: 65 },` : `\t];`,
			grouped || stacked ? `\t\t\t\t{ label: 'Q2', value: 59 }` : `<\/script>`,
			grouped || stacked ? `\t\t\t],` : ``,
			grouped || stacked ? `\t\t\tcolor: 'primary'` : ``,
			grouped || stacked ? `\t\t},` : ``,
			grouped || stacked ? `\t\t{` : ``,
			grouped || stacked ? `\t\t\tname: 'Series 2',` : ``,
			grouped || stacked ? `\t\t\tvalues: [` : ``,
			grouped || stacked ? `\t\t\t\t{ label: 'Q1', value: 45 },` : ``,
			grouped || stacked ? `\t\t\t\t{ label: 'Q2', value: 70 }` : ``,
			grouped || stacked ? `\t\t\t],` : ``,
			grouped || stacked ? `\t\t\tcolor: 'secondary'` : ``,
			grouped || stacked ? `\t\t}` : ``,
			grouped || stacked ? `\t];` : ``,
			grouped || stacked ? `<\/script>` : ``
		].filter(Boolean);

		const componentLines = [
			hasProps && `<BarChart`,
			hasProps && `\t{data}`,
			color !== 'primary' && !grouped && !stacked && `\tcolor="${color}"`,
			horizontal && `\thorizontal`,
			grouped && `\tgrouped`,
			stacked && `\tstacked`,
			!showGrid && `\tshowGrid={false}`,
			showLegend && `\tshowLegend`,
			showValues && `\tshowValues`,
			loading && `\tloading`,
			empty && `\tempty`,
			hasProps && `/>`,
			!hasProps && `<BarChart {data} />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'data', type: 'DataPoint[] | Series[]', initial: '[]', required: true },
		{ prop: 'width', type: 'number', initial: '600' },
		{ prop: 'height', type: 'number', initial: '400' },
		{ prop: 'margin', type: 'Margin', initial: '{ top: 20, right: 20, bottom: 40, left: 50 }' },
		{ prop: 'xKey', type: 'string', initial: 'label' },
		{ prop: 'yKey', type: 'string', initial: 'value' },
		{
			prop: 'color',
			type: 'primary | secondary | success | info | warning | danger | muted',
			initial: 'primary'
		},
		{
			prop: 'colors',
			type: 'Color[]',
			initial: "['primary', 'secondary', 'success', 'info', 'warning', 'danger']"
		},
		{ prop: 'horizontal', type: 'boolean', initial: 'false' },
		{ prop: 'grouped', type: 'boolean', initial: 'false' },
		{ prop: 'stacked', type: 'boolean', initial: 'false' },
		{ prop: 'showGrid', type: 'boolean', initial: 'true' },
		{ prop: 'showLegend', type: 'boolean', initial: 'false' },
		{ prop: 'showValues', type: 'boolean', initial: 'false' },
		{ prop: 'barPadding', type: 'number', initial: '0.2' },
		{ prop: 'groupPadding', type: 'number', initial: '0.1' },
		{ prop: 'barRadius', type: 'number', initial: '0' },
		{ prop: 'loading', type: 'boolean', initial: 'false' },
		{ prop: 'empty', type: 'boolean', initial: 'false' },
		{ prop: 'emptyText', type: 'string', initial: 'No data available' },
		{ prop: 'class', type: 'string', initial: '' }
	];
</script>

{#snippet preview()}
	<BarChart
		data={chartData}
		{color}
		{horizontal}
		{grouped}
		{stacked}
		{showGrid}
		{showLegend}
		{showValues}
		{loading}
		{empty}
	/>
{/snippet}

{#snippet builder()}
	<Select label="Color" name="color" size="sm" options={colorOptions} bind:value={color} />

	<DocOptions title="Chart Types">
		<Checkbox bind:checked={horizontal} name="horizontal" label="Horizontal" />
		<Checkbox bind:checked={grouped} name="grouped" label="Grouped" />
		<Checkbox bind:checked={stacked} name="stacked" label="Stacked" />
	</DocOptions>

	<DocOptions title="Display Options">
		<Checkbox bind:checked={showGrid} name="show-grid" label="Show Grid" />
		<Checkbox bind:checked={showLegend} name="show-legend" label="Show Legend" />
		<Checkbox bind:checked={showValues} name="show-values" label="Show Values" />
	</DocOptions>

	<DocOptions title="States">
		<Checkbox bind:checked={loading} name="loading" label="Loading" />
		<Checkbox bind:checked={empty} name="empty" label="Empty" />
	</DocOptions>
{/snippet}

<DocHeader title="BarChart">
	Display data as vertical or horizontal bars with support for grouped and stacked variations.
</DocHeader>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<DocProps {props} />
