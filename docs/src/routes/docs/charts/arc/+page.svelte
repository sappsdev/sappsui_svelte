<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { ArcChart, Checkbox, Select, TextField } from 'sappsui';

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
	let trackColor: any = $state('muted');

	// Props
	let value = $state(65);
	let min = $state(0);
	let max = $state(100);
	let width = $state(300);
	let height = $state(200);
	let thickness = $state(20);
	let startAngle = $state(-120);
	let endAngle = $state(120);
	let label = $state('Progress');
	let unit = $state('%');
	let animationDuration = $state(1000);
	let paddingY = $state(10);

	// States
	let showValue = $state(true);
	let showLabels = $state(true);
	let animated = $state(true);
	let loading = $state(false);
	let empty = $state(false);

	let hasProps = $derived(
		[
			value !== 65,
			min !== 0,
			max !== 100,
			width !== 300,
			height !== 200,
			thickness !== 20,
			startAngle !== -120,
			endAngle !== 120,
			color !== 'primary',
			trackColor !== 'muted',
			!showValue,
			!showLabels,
			label !== 'Progress',
			unit !== '%',
			!animated,
			animationDuration !== 1000,
			loading,
			empty,
			paddingY !== 10
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { ArcChart } from 'sappsui';`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<ArcChart`,
			value !== 65 && `\tvalue={${value}}`,
			min !== 0 && `\tmin={${min}}`,
			max !== 100 && `\tmax={${max}}`,
			width !== 300 && `\twidth={${width}}`,
			height !== 200 && `\theight={${height}}`,
			thickness !== 20 && `\tthickness={${thickness}}`,
			startAngle !== -120 && `\tstartAngle={${startAngle}}`,
			endAngle !== 120 && `\tendAngle={${endAngle}}`,
			color !== 'primary' && `\tcolor="${color}"`,
			trackColor !== 'muted' && `\ttrackColor="${trackColor}"`,
			!showValue && `\tshowValue={false}`,
			!showLabels && `\tshowLabels={false}`,
			label !== 'Progress' && `\tlabel="${label}"`,
			unit !== '%' && `\tunit="${unit}"`,
			!animated && `\tanimated={false}`,
			animationDuration !== 1000 && `\tanimationDuration={${animationDuration}}`,
			loading && `\tloading`,
			empty && `\tempty`,
			paddingY !== 10 && `\tpaddingY={${paddingY}}`,
			hasProps && `/>`,
			!hasProps && `<ArcChart value={65} label="Progress" unit="%" />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'value', type: 'number', initial: '0' },
		{ prop: 'min', type: 'number', initial: '0' },
		{ prop: 'max', type: 'number', initial: '100' },
		{ prop: 'width', type: 'number', initial: 'undefined' },
		{ prop: 'height', type: 'number', initial: 'undefined' },
		{
			prop: 'margin',
			type: '{ top: number; right: number; bottom: number; left: number }',
			initial: '{ top: 10, right: 10, bottom: 10, left: 10 }'
		},
		{
			prop: 'color',
			type: 'primary | secondary | success | info | warning | danger | muted',
			initial: 'primary'
		},
		{
			prop: 'trackColor',
			type: 'primary | secondary | success | info | warning | danger | muted',
			initial: 'muted'
		},
		{ prop: 'thickness', type: 'number', initial: '20' },
		{ prop: 'startAngle', type: 'number', initial: '-120' },
		{ prop: 'endAngle', type: 'number', initial: '120' },
		{ prop: 'showValue', type: 'boolean', initial: 'true' },
		{ prop: 'showLabels', type: 'boolean', initial: 'true' },
		{ prop: 'label', type: 'string', initial: '' },
		{ prop: 'unit', type: 'string', initial: '' },
		{ prop: 'animated', type: 'boolean', initial: 'true' },
		{ prop: 'animationDuration', type: 'number', initial: '1000' },
		{ prop: 'loading', type: 'boolean', initial: 'false' },
		{ prop: 'empty', type: 'boolean', initial: 'false' },
		{ prop: 'emptyText', type: 'string', initial: 'No data' },
		{ prop: 'paddingY', type: 'number', initial: '10' },
		{ prop: 'class', type: 'string', initial: '' }
	];

	const arcsAuto = [
		{ value: 75, max: 100, color: 'danger', label: 'Ventas' },
		{ value: 120, max: 150, color: 'warning', label: 'Marketing' },
		{ value: 30, max: 50, color: 'info', label: 'Soporte' },
		{ value: 24, max: 100, color: 'primary', label: 'Desarrollo' }
	];

	const arcsCustom = [
		{ value: 85, max: 100, color: 'success', label: 'Completado' },
		{ value: 45, max: 100, color: 'warning', label: 'En progreso' },
		{ value: 20, max: 100, color: 'danger', label: 'Pendiente' }
	];
</script>

{#snippet builder()}
	<Select label="Color" name="color" size="sm" options={colorOptions} bind:value={color} />
	<Select
		label="Track Color"
		name="trackColor"
		size="sm"
		options={colorOptions}
		bind:value={trackColor}
	/>

	<DocOptions title="Values">
		<TextField name="value" type="number" label="Value" bind:value size="sm" />
		<TextField name="min" type="number" label="Min" bind:value={min} size="sm" />
		<TextField name="max" type="number" label="Max" bind:value={max} size="sm" />
	</DocOptions>

	<DocOptions title="Dimensions">
		<TextField name="width" type="number" label="Width" bind:value={width} size="sm" />
		<TextField name="heigth" type="number" label="Height" bind:value={height} size="sm" />
		<TextField type="number" label="Thickness" bind:value={thickness} size="sm" />
		<TextField type="number" label="Padding Y" bind:value={paddingY} size="sm" />
	</DocOptions>

	<DocOptions title="Angles">
		<TextField type="number" label="Start Angle" bind:value={startAngle} size="sm" />
		<TextField type="number" label="End Angle" bind:value={endAngle} size="sm" />
	</DocOptions>

	<DocOptions title="Labels">
		<TextField label="Label" bind:value={label} size="sm" />
		<TextField label="Unit" bind:value={unit} size="sm" />
	</DocOptions>

	<DocOptions title="Animation">
		<Checkbox bind:checked={animated} name="animated" label="Animated" />
		<TextField
			type="number"
			label="Animation Duration (ms)"
			bind:value={animationDuration}
			size="sm"
		/>
	</DocOptions>

	<DocOptions title="States">
		<Checkbox bind:checked={showValue} name="showValue" label="Show Value" />
		<Checkbox bind:checked={showLabels} name="showLabels" label="Show Labels" />
		<Checkbox bind:checked={loading} name="loading" label="Loading" />
		<Checkbox bind:checked={empty} name="empty" label="Empty" />
	</DocOptions>
{/snippet}

<DocHeader title="ArcChart">
	Arc charts display data in a circular arc format, ideal for showing progress, gauges, or
	percentage values.
</DocHeader>

<DocPreview {builder}>
	<ArcChart arcs={arcsAuto} centerText="" size={200} />
</DocPreview>
<DocPreview>
	<ArcChart arcs={arcsCustom} centerText="Progreso" centerValue="56%" size={300} />
</DocPreview>
<DocPreview>
	<ArcChart arcs={[]} empty={true} emptyText="No hay datos disponibles" size={300} />
</DocPreview>
<DocPreview>
	<ArcChart arcs={arcsAuto} centerText="Total" thickness={24} gap={12} size={350} />
</DocPreview>

<DocCode code={code()} />

<DocProps {props} />
