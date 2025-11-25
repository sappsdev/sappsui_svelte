<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { Button, Checkbox, Select } from 'sappsui';

	const variantOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' },
		{ id: 'outlined', label: 'Outlined' },
		{ id: 'ghost', label: 'Ghost' },
		{ id: 'success', label: 'Success' },
		{ id: 'info', label: 'Info' },
		{ id: 'danger', label: 'Danger' },
		{ id: 'warning', label: 'Warning' }
	];

	const sizeOptions = [
		{ id: 'xs', label: 'xs' },
		{ id: 'sm', label: 'sm' },
		{ id: 'md', label: 'md' },
		{ id: 'lg', label: 'lg' }
	];

	// options

	const typeOptions = [
		{ id: 'button', label: 'Button' },
		{ id: 'submit', label: 'Submit' },
		{ id: 'reset', label: 'Reset' }
	];

	// Selects

	let variant: any = $state('primary');
	let size: any = $state('md');
	let type: any = $state('button');

	// Props

	let startIcon = $state('');
	let endIcon = $state('');
	let href = $state('');

	// states

	let isLoading = $state(false);
	let isWide = $state(false);
	let isDisabled = $state(false);
	let hasShadow = $state(false);
	let isSolid = $state(true);

	let hasProps = $derived(
		[
			variant !== 'primary',
			size !== 'md',
			type !== 'button',
			startIcon,
			endIcon,
			href,
			isLoading,
			isWide,
			isSolid,
			isDisabled,
			hasShadow
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Button } from 'sappsui';`,
			!href && `\n\tconst handleClick = () => {`,
			!href && `\t\tconsole.log('Button clicked');`,
			!href && `\t};`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<Button`,
			variant !== 'primary' && `\tvariant="${variant}"`,
			type !== 'button' && `\ttype="${type}"`,
			startIcon && `\tstartIcon="fluent:search-24-regular"`,
			endIcon && `\tendIcon="fluent:camera-sparkles-24-regular"`,
			href && `\thref="/example"`,
			hasProps && `\tlabel="Label"`,
			hasProps && !href && `\tonclick={handleClick}`,
			isLoading && `\tisLoading`,
			isWide && `\tisWide`,
			isSolid && `\tisSolid`,
			isDisabled && `\tisDisabled`,
			hasShadow && `\thasShadow`,
			hasProps && `/>`,
			!hasProps && `<Button label="Label" onclick={handleClick} />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'label', type: 'string', initial: '', required: true },
		{ prop: 'onclick', type: '() => void', initial: '' },
		{ prop: 'type', type: 'button | submit | reset', initial: 'button' },
		{ prop: 'href', type: 'string', initial: '' },
		{
			prop: 'variant',
			type: 'primary | secondary | muted | outline | ghost | success | info | danger | warning',
			initial: 'primary'
		},
		{ prop: 'size', type: 'xs | sm | md | lg', initial: 'md' },
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'startIcon', type: 'IconName', initial: '' },
		{ prop: 'endIcon', type: 'IconName', initial: '' },
		{ prop: 'isLoading', type: 'boolean', initial: 'false' },
		{ prop: 'loadingIcon', type: 'IconName', initial: '' },
		{ prop: 'isWide', type: 'boolean', initial: 'false' },
		{ prop: 'isDisabled', type: 'boolean', initial: 'false' },
		{ prop: 'hasShadow', type: 'boolean', initial: 'false' },
		{ prop: 'isSolid', type: 'boolean', initial: 'false' }
	];
</script>

{#snippet preview()}
	<Button
		label="Label"
		{variant}
		{size}
		{type}
		{startIcon}
		{endIcon}
		{isLoading}
		{isDisabled}
		{isWide}
		{hasShadow}
		{isSolid}
	/>
{/snippet}

{#snippet builder()}
	<Select label="Variant" name="variant" size="sm" options={variantOptions} bind:value={variant} />
	<Select label="Size" name="size" size="sm" options={sizeOptions} bind:value={size} />
	<Select label="Type" name="type" size="sm" options={typeOptions} bind:value={type} />

	<DocOptions title="Props">
		<Checkbox
			onchange={(v) => (v ? (startIcon = 'fluent:search-24-regular') : (startIcon = ''))}
			name="start-icon"
			label="startIcon"
		/>
		<Checkbox
			onchange={(v) => (v ? (endIcon = 'fluent:camera-sparkles-24-regular') : (endIcon = ''))}
			name="start-icon"
			label="startIcon"
		/>
		<Checkbox onchange={(v) => (v ? (href = '/example') : (href = ''))} name="href" label="Link" />
		<Checkbox bind:checked={isLoading} name="loading" label="Loading" />
		<Checkbox bind:checked={isWide} name="wide" label="Wide" />
		<Checkbox bind:checked={isDisabled} name="disabled" label="Disabled" />
		<Checkbox bind:checked={hasShadow} name="shadow" label="Shadow" />
		<Checkbox bind:checked={isSolid} name="solid" label="Solid" />
	</DocOptions>
{/snippet}

<DocHeader title="Button">Buttons allow users to take actions with a single tap.</DocHeader>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<DocProps {props} />
