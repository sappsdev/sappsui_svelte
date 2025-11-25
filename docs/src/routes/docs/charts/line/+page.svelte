<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { LineChart, Checkbox, Select } from 'sappsui';

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

	// Props
	let width = $state(600);
	let height = $state(400);
	let xKey = $state('x');
	let yKey = $state('y');
	let strokeWidth = $state(2);
	let pointRadius = $state(3);

	// States
	let showPoints = $state(true);
	let showGrid = $state(true);
	let showLegend = $state(false);
	let loading = $state(false);
	let empty = $state(false);

	// Sample data
	const sampleData = [
		{ x: 'Jan', y: 30 },
		{ x: 'Feb', y: 45 },
		{ x: 'Mar', y: 35 },
		{ x: 'Apr', y: 60 },
		{ x: 'May', y: 50 },
		{ x: 'Jun', y: 70 }
	];

	const multiSeriesData = [
		{
			name: 'Series 1',
			values: sampleData,
			color: 'primary'
		},
		{
			name: 'Series 2',
			values: [
				{ x: 'Jan', y: 20 },
				{ x: 'Feb', y: 35 },
				{ x: 'Mar', y: 45 },
				{ x: 'Apr', y: 40 },
				{ x: 'May', y: 60 },
				{ x: 'Jun', y: 55 }
			],
			color: 'secondary'
		}
	];

	let hasProps = $derived(
		[
			color !== 'primary',
			curve !== 'linear',
			width !== 600,
			height !== 400,
			xKey !== 'x',
			yKey !== 'y',
			strokeWidth !== 2,
			pointRadius !== 3,
			!showPoints,
			!showGrid,
			showLegend,
			loading,
			empty
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { LineChart } from 'sappsui';`,
			`\n\tconst data = [`,
			`\t\t{ x: 'Jan', y: 30 },`,
			`\t\t{ x: 'Feb', y: 45 },`,
			`\t\t{ x: 'Mar', y: 35 },`,
			`\t\t{ x: 'Apr', y: 60 },`,
			`\t\t{ x: 'May', y: 50 },`,
			`\t\t{ x: 'Jun', y: 70 }`,
			`\t];`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<LineChart`,
			hasProps && `\t{data}`,
			color !== 'primary' && `\tcolor="${color}"`,
			curve !== 'linear' && `\tcurve="${curve}"`,
			width !== 600 && `\twidth={${width}}`,
			height !== 400 && `\theight={${height}}`,
			xKey !== 'x' && `\txKey="${xKey}"`,
			yKey !== 'y' && `\tyKey="${yKey}"`,
			strokeWidth !== 2 && `\tstrokeWidth={${strokeWidth}}`,
			pointRadius !== 3 && `\tpointRadius={${pointRadius}}`,
			!showPoints && `\tshowPoints={false}`,
			!showGrid && `\tshowGrid={false}`,
			showLegend && `\tshowLegend`,
			loading && `\tloading`,
			empty && `\tempty`,
			hasProps && `/>`,
			!hasProps && `<LineChart {data} />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'data', type: 'DataPoint[] | Series[]', initial: '[]', required: true },
		{ prop: 'width', type: 'number', initial: '600' },
		{ prop: 'height', type: 'number', initial: '400' },
		{ prop: 'margin', type: 'Margin', initial: '{ top: 20, right: 20, bottom: 40, left: 50 }' },
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
			initial: "['primary', 'secondary', 'success', 'info', 'warning', 'danger']"
		},
		{ prop: 'showPoints', type: 'boolean', initial: 'true' },
		{ prop: 'showGrid', type: 'boolean', initial: 'true' },
		{ prop: 'showLegend', type: 'boolean', initial: 'false' },
		{ prop: 'curve', type: 'linear | smooth', initial: 'linear' },
		{ prop: 'strokeWidth', type: 'number', initial: '2' },
		{ prop: 'pointRadius', type: 'number', initial: '3' },
		{ prop: 'loading', type: 'boolean', initial: 'false' },
		{ prop: 'empty', type: 'boolean', initial: 'false' },
		{ prop: 'emptyText', type: 'string', initial: 'No data available' },
		{ prop: 'class', type: 'string', initial: '' }
	];
</script>

{#snippet preview()}
	<LineChart
		data={empty ? [] : showLegend ? multiSeriesData : sampleData}
		{color}
		{curve}
		{width}
		{height}
		{xKey}
		{yKey}
		{strokeWidth}
		{pointRadius}
		{showPoints}
		{showGrid}
		{showLegend}
		{loading}
		{empty}
	/>
{/snippet}

{#snippet builder()}
	<Select label="Color" name="color" size="sm" options={colorOptions} bind:value={color} />
	<Select label="Curve" name="curve" size="sm" options={curveOptions} bind:value={curve} />

	<DocOptions title="Props">
		<Checkbox bind:checked={showPoints} name="show-points" label="Show Points" />
		<Checkbox bind:checked={showGrid} name="show-grid" label="Show Grid" />
		<Checkbox bind:checked={showLegend} name="show-legend" label="Show Legend" />
		<Checkbox bind:checked={loading} name="loading" label="Loading" />
		<Checkbox bind:checked={empty} name="empty" label="Empty State" />
	</DocOptions>
{/snippet}

<DocHeader title="LineChart">
	Display data trends and comparisons using interactive line charts.
</DocHeader>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<DocProps {props} />
