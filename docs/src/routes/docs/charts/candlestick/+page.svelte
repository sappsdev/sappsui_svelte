<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { Candlestick, Checkbox, Select } from 'sappsui';

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
		{ date: '2024-01-01', open: 100, high: 110, low: 95, close: 105, volume: 1000 },
		{ date: '2024-01-02', open: 105, high: 115, low: 100, close: 108, volume: 1200 },
		{ date: '2024-01-03', open: 108, high: 112, low: 102, close: 103, volume: 900 },
		{ date: '2024-01-04', open: 103, high: 120, low: 103, close: 118, volume: 1500 },
		{ date: '2024-01-05', open: 118, high: 125, low: 115, close: 120, volume: 1300 }
	];

	// Selects
	let bullishColor: any = $state('success');
	let bearishColor: any = $state('danger');

	// Props
	let width = $state(800);
	let height = $state(400);
	let candleWidth = $state(8);
	let wickWidth = $state(1);

	// States
	let showVolume = $state(false);
	let showGrid = $state(true);
	let loading = $state(false);
	let empty = $state(false);

	let hasProps = $derived(
		[
			width !== 800,
			height !== 400,
			candleWidth !== 8,
			wickWidth !== 1,
			bullishColor !== 'success',
			bearishColor !== 'danger',
			showVolume,
			!showGrid,
			loading,
			empty
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Candlestick } from 'sappsui';`,
			`\n\tconst data = [`,
			`\t\t{ date: '2024-01-01', open: 100, high: 110, low: 95, close: 105, volume: 1000 },`,
			`\t\t{ date: '2024-01-02', open: 105, high: 115, low: 100, close: 108, volume: 1200 },`,
			`\t\t// ... more data`,
			`\t];`,
			`<\/script>`
		];

		const componentLines = [
			hasProps && `<Candlestick`,
			hasProps && `\t{data}`,
			width !== 800 && `\twidth={${width}}`,
			height !== 400 && `\theight={${height}}`,
			candleWidth !== 8 && `\tcandleWidth={${candleWidth}}`,
			wickWidth !== 1 && `\twickWidth={${wickWidth}}`,
			bullishColor !== 'success' && `\tbullishColor="${bullishColor}"`,
			bearishColor !== 'danger' && `\tbearishColor="${bearishColor}"`,
			showVolume && `\tshowVolume`,
			!showGrid && `\tshowGrid={false}`,
			loading && `\tloading`,
			empty && `\tempty`,
			hasProps && `/>`,
			!hasProps && `<Candlestick {data} />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'data', type: 'CandleData[]', initial: '[]', required: true },
		{ prop: 'width', type: 'number', initial: '800' },
		{ prop: 'height', type: 'number', initial: '400' },
		{ prop: 'margin', type: 'Margin', initial: '{ top: 20, right: 20, bottom: 40, left: 60 }' },
		{ prop: 'dateKey', type: 'string', initial: 'date' },
		{ prop: 'openKey', type: 'string', initial: 'open' },
		{ prop: 'highKey', type: 'string', initial: 'high' },
		{ prop: 'lowKey', type: 'string', initial: 'low' },
		{ prop: 'closeKey', type: 'string', initial: 'close' },
		{ prop: 'volumeKey', type: 'string', initial: 'volume' },
		{ prop: 'showVolume', type: 'boolean', initial: 'false' },
		{ prop: 'showGrid', type: 'boolean', initial: 'true' },
		{ prop: 'candleWidth', type: 'number', initial: '8' },
		{
			prop: 'bullishColor',
			type: 'primary | secondary | success | info | warning | danger | muted',
			initial: 'success'
		},
		{
			prop: 'bearishColor',
			type: 'primary | secondary | success | info | warning | danger | muted',
			initial: 'danger'
		},
		{ prop: 'wickWidth', type: 'number', initial: '1' },
		{ prop: 'loading', type: 'boolean', initial: 'false' },
		{ prop: 'empty', type: 'boolean', initial: 'false' },
		{ prop: 'emptyText', type: 'string', initial: 'No data available' },
		{ prop: 'class', type: 'string', initial: '' }
	];
</script>

{#snippet preview()}
	<Candlestick
		data={sampleData}
		{width}
		{height}
		{candleWidth}
		{wickWidth}
		{bullishColor}
		{bearishColor}
		{showVolume}
		{showGrid}
		{loading}
		{empty}
	/>
{/snippet}

{#snippet builder()}
	<Select
		label="Bullish Color"
		name="bullish-color"
		size="sm"
		options={colorOptions}
		bind:value={bullishColor}
	/>
	<Select
		label="Bearish Color"
		name="bearish-color"
		size="sm"
		options={colorOptions}
		bind:value={bearishColor}
	/>

	<DocOptions title="Dimensions">
		<label>
			Width: {width}px
			<input type="range" bind:value={width} min="400" max="1200" step="50" />
		</label>
		<label>
			Height: {height}px
			<input type="range" bind:value={height} min="200" max="600" step="50" />
		</label>
		<label>
			Candle Width: {candleWidth}px
			<input type="range" bind:value={candleWidth} min="4" max="20" step="1" />
		</label>
		<label>
			Wick Width: {wickWidth}px
			<input type="range" bind:value={wickWidth} min="1" max="5" step="1" />
		</label>
	</DocOptions>

	<DocOptions title="Display Options">
		<Checkbox bind:checked={showVolume} name="volume" label="Show Volume" />
		<Checkbox bind:checked={showGrid} name="grid" label="Show Grid" />
		<Checkbox bind:checked={loading} name="loading" label="Loading" />
		<Checkbox bind:checked={empty} name="empty" label="Empty State" />
	</DocOptions>
{/snippet}

<DocHeader title="Candlestick">
	Candlestick charts display financial data with open, high, low, and close values for time series
	analysis.
</DocHeader>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<DocProps {props} />
