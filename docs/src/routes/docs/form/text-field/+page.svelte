<script lang="ts">
	import DocCode from '$lib/components/DocCode.svelte';
	import DocHeader from '$lib/components/DocHeader.svelte';
	import DocOptions from '$lib/components/DocOptions.svelte';
	import DocPreview from '$lib/components/DocPreview.svelte';
	import DocProps from '$lib/components/DocProps.svelte';
	import { Button, Checkbox, Select, TextField } from 'sappsui';

	const variantOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'soft', label: 'Soft' },
		{ id: 'line', label: 'Line' }
	];

	const sizeOptions = [
		{ id: 'sm', label: 'sm' },
		{ id: 'md', label: 'md' },
		{ id: 'lg', label: 'lg' }
	];

	const typeOptions = [
		{ id: 'text', label: 'Text' },
		{ id: 'password', label: 'Password' },
		{ id: 'number', label: 'Number' }
	];

	let variant: any = $state('primary');
	let size: any = $state('md');
	let type: any = $state('text');

	let startIcon = $state('');
	let endIcon = $state('');

	let floatLabel = $state(false);
	let disabled = $state(false);
	let shadow = $state(false);

	let hasProps = $derived(
		[variant !== 'primary', size !== 'md', startIcon, endIcon, floatLabel, disabled, shadow].some(
			Boolean
		)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Button } from 'sappsui';`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<Button`,
			variant !== 'primary' && `\tvariant="${variant}"`,
			type !== 'button' && `\ttype="${type}"`,
			startIcon && `\tstartIcon="fluent:search-24-regular"`,
			endIcon && `\tendIcon="fluent:camera-sparkles-24-regular"`,
			hasProps && `\tlabel="Label"`,
			disabled && `\tdisabled`,
			shadow && `\tshadow`,
			hasProps && `/>`,
			!hasProps && `<Button label="Label" onclick={handleClick} />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'label', type: 'string', initial: '', required: true },
		{ prop: 'onclick', type: '() => void', initial: '' },
		{ prop: 'type', type: "'button' | 'submit' | 'reset'", initial: 'button' },
		{ prop: 'href', type: 'string', initial: '' },
		{
			prop: 'variant',
			type: "'primary' | 'secondary' | 'outline' | 'soft' | 'ghost'",
			initial: 'primary'
		},
		{ prop: 'size', type: "'sm' | 'md' | 'lg'", initial: 'md' },
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'startIcon', type: 'IconName', initial: '' },
		{ prop: 'endIcon', type: 'IconName', initial: '' },
		{ prop: 'loading', type: 'boolean', initial: 'false' },
		{ prop: 'loadingIcon', type: 'IconName', initial: '' },
		{ prop: 'wide', type: 'boolean', initial: 'false' },
		{ prop: 'disabled', type: 'boolean', initial: 'false' },
		{ prop: 'shadow', type: 'boolean', initial: 'false' }
	];
</script>

{#snippet preview()}
	<TextField
		label="Label"
		name="text_field"
		placeholder="Enter text"
		{variant}
		{size}
		{type}
		{startIcon}
		{endIcon}
		{floatLabel}
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
	</DocOptions>

	<DocOptions title="States">
		<Checkbox bind:checked={floatLabel} name="float_label" label="floatLabel" />
		<Checkbox bind:checked={disabled} name="disabled" label="Disabled" />
		<Checkbox bind:checked={shadow} name="shadow" label="Shadow" />
	</DocOptions>
{/snippet}

<DocHeader title="TextField">TextField component is used to get user input in forms.</DocHeader>

<DocPreview {preview} {builder} />

<DocCode code={code()} />

<DocProps {props} />
