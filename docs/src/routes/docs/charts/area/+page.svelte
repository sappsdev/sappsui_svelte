<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { AreaChart, Checkbox, Select } from 'sappsui';

	const colorOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'success', label: 'Success' },
		{ id: 'info', label: 'Info' },
		{ id: 'danger', label: 'Danger' },
		{ id: 'warning', label: 'Warning' },
		{ id: 'muted', label: 'Muted' }
	];

	const curveOptions = [
		{ id: 'linear', label: 'Linear' },
		{ id: 'smooth', label: 'Smooth' }
	];

	// Selects
	let color: any = $state('primary');
	let curve: any = $state('linear');

	// States
	let showLine = $state(true);
	let showPoints = $state(false);
	let showGrid = $state(true);
	let showLegend = $state(false);
	let stacked = $state(false);
	let gradient = $state(true);
	let loading = $state(false);
	let empty = $state(false);

	// Sample data
	const sampleData = [
		{ month: 'Jan', value: 400 },
		{ month: 'Feb', value: 300 },
		{ month: 'Mar', value: 600 },
		{ month: 'Apr', value: 800 },
		{ month: 'May', value: 500 },
		{ month: 'Jun', value: 700 }
	];

	const multiSeriesData = [
		{
			name: 'Series 1',
			color: 'primary',
			values: [
				{ month: 'Jan', value: 400 },
				{ month: 'Feb', value: 300 },
				{ month: 'Mar', value: 600 },
				{ month: 'Apr', value: 800 },
				{ month: 'May', value: 500 },
				{ month: 'Jun', value: 700 }
			]
		},
		{
			name: 'Series 2',
			color: 'secondary',
			values: [
				{ month: 'Jan', value: 200 },
				{ month: 'Feb', value: 450 },
				{ month: 'Mar', value: 300 },
				{ month: 'Apr', value: 550 },
				{ month: 'May', value: 650 },
				{ month: 'Jun', value: 400 }
			]
		}
	];

	let hasProps = $derived(
		[
			color !== 'primary',
			curve !== 'linear',
			!showLine,
			showPoints,
			!showGrid,
			showLegend,
			stacked,
			!gradient,
			loading,
			empty
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { AreaChart } from 'sappsui';`,
			``,
			`\tconst data = [`,
			`\t\t{ month: 'Jan', value: 400 },`,
			`\t\t{ month: 'Feb', value: 300 },`,
			`\t\t{ month: 'Mar', value: 600 },`,
			`\t\t{ month: 'Apr', value: 800 },`,
			`\t\t{ month: 'May', value: 500 },`,
			`\t\t{ month: 'Jun', value: 700 }`,
			`\t];`,
			`<\/script>`
		];

		const componentLines = [
			hasProps && `<AreaChart`,
			hasProps && `\t{data}`,
			hasProps && `\txKey="month"`,
			hasProps && `\tyKey="value"`,
			color !== 'primary' && `\tcolor="${color}"`,
			curve !== 'linear' && `\tcurve="${curve}"`,
			!showLine && `\tshowLine={false}`,
			showPoints && `\tshowPoints`,
			!showGrid && `\tshowGrid={false}`,
			showLegend && `\tshowLegend`,
			stacked && `\tstacked`,
			!gradient && `\tgradient={false}`,
			loading && `\tloading`,
			empty && `\tempty`,
			hasProps && `/>`,
			!hasProps && `<AreaChart {data} xKey="month" yKey="value" />`
		].filter(Boolean);

		return [...scriptLines, '', ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'data', type: 'DataPoint[] | Series[]', initial: '[]', required: true },
		{ prop: 'width', type: 'number', initial: '600' },
		{ prop: 'height', type: 'number', initial: '400' },
		{
			prop: 'margin',
			type: '{ top: number, right: number, bottom: number, left: number }',
			initial: '{ top: 20, right: 20, bottom: 40, left: 50 }'
		},
		{ prop: 'xKey', type: 'string', initial: 'x' },
		{ prop: 'yKey', type: 'string', initial: 'y' },
		{
			prop: 'color',
			type: 'primary | secondary | success | info | warning | danger | muted',
			initial: 'primary'
		},
		{
			prop: 'colors',
			type: 'Color[]',
			initial: '[primary, secondary, success, info, warning, danger]'
		},
		{ prop: 'showLine', type: 'boolean', initial: 'true' },
		{ prop: 'showPoints', type: 'boolean', initial: 'false' },
		{ prop: 'showGrid', type: 'boolean', initial: 'true' },
		{ prop: 'showLegend', type: 'boolean', initial: 'false' },
		{ prop: 'curve', type: 'linear | smooth', initial: 'linear' },
		{ prop: 'strokeWidth', type: 'number', initial: '2' },
		{ prop: 'fillOpacity', type: 'number', initial: '0.3' },
		{ prop: 'stacked', type: 'boolean', initial: 'false' },
		{ prop: 'gradient', type: 'boolean', initial: 'true' },
		{ prop: 'loading', type: 'boolean', initial: 'false' },
		{ prop: 'empty', type: 'boolean', initial: 'false' },
		{ prop: 'emptyText', type: 'string', initial: 'No data available' },
		{ prop: 'class', type: 'string', initial: '' }
	];
</script>

{#snippet preview()}
	<AreaChart
		data={empty ? [] : sampleData}
		xKey="month"
		yKey="value"
		{color}
		{curve}
		{showLine}
		{showPoints}
		{showGrid}
		{showLegend}
		{stacked}
		{gradient}
		{loading}
		{empty}
	/>
{/snippet}

{#snippet builder()}
	<Select label="Color" name="color" size="sm" options={colorOptions} bind:value={color} />
	<Select label="Curve" name="curve" size="sm" options={curveOptions} bind:value={curve} />

	<DocOptions title="Display Options">
		<Checkbox bind:checked={showLine} name="showLine" label="Show Line" />
		<Checkbox bind:checked={showPoints} name="showPoints" label="Show Points" />
		<Checkbox bind:checked={showGrid} name="showGrid" label="Show Grid" />
		<Checkbox bind:checked={showLegend} name="showLegend" label="Show Legend" />
	</DocOptions>

	<DocOptions title="Chart Options">
		<Checkbox bind:checked={stacked} name="stacked" label="Stacked" />
		<Checkbox bind:checked={gradient} name="gradient" label="Gradient" />
	</DocOptions>

	<DocOptions title="States">
		<Checkbox bind:checked={loading} name="loading" label="Loading" />
		<Checkbox bind:checked={empty} name="empty" label="Empty" />
	</DocOptions>
{/snippet}

<DocHeader title="AreaChart">Display data trends over time with filled area charts.</DocHeader>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<DocProps {props} />
