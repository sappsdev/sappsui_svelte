<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { TextField, Checkbox, Select } from 'sappsui';

	const variantOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' },
		{ id: 'outlined', label: 'Outlined' },
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
		{ id: 'email', label: 'Email' },
		{ id: 'number', label: 'Number' },
		{ id: 'tel', label: 'Tel' },
		{ id: 'url', label: 'URL' }
	];

	// Selects
	let variant: any = $state('outlined');
	let size: any = $state('md');
	let type: any = $state('text');

	// Props
	let startIcon = $state('');
	let endIcon = $state('');
	let startText = $state('');
	let endText = $state('');
	let label = $state('');
	let helpText = $state('');
	let errorText = $state('');

	// States
	let isFloatLabel = $state(false);
	let isSolid = $state(false);

	let hasProps = $derived(
		[
			variant !== 'primary',
			size !== 'md',
			type !== 'text',
			startIcon,
			endIcon,
			startText,
			endText,
			label,
			helpText,
			errorText,
			isFloatLabel,
			isSolid
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { TextField } from 'sappsui';`,
			`\n\tlet value = $state('');`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<TextField`,
			hasProps && `\tname="textfield"`,
			hasProps && `\tplaceholder="Enter text..."`,
			label && `\tlabel="${label}"`,
			variant !== 'primary' && `\tvariant="${variant}"`,
			size !== 'md' && `\tsize="${size}"`,
			type !== 'text' && `\ttype="${type}"`,
			startIcon && `\tstartIcon="fluent:search-24-regular"`,
			endIcon && `\tendIcon="fluent:mail-24-regular"`,
			startText && `\tstartText="https://"`,
			endText && `\tendText=".com"`,
			helpText && `\thelpText="This is a help text"`,
			errorText && `\terrorText="This field is required"`,
			isFloatLabel && `\tisFloatLabel`,
			isSolid && `\tisSolid`,
			hasProps && `\tbind:value`,
			hasProps && `/>`,
			!hasProps && `<TextField name="textfield" placeholder="Enter text..." bind:value />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'name', type: 'string', initial: '', required: true },
		{ prop: 'el', type: 'HTMLInputElement', initial: '' },
		{ prop: 'value', type: 'string | number', initial: '' },
		{ prop: 'defaultValue', type: 'string', initial: '' },
		{ prop: 'placeholder', type: 'string', initial: '' },
		{ prop: 'type', type: 'text | password | email | number | tel | url', initial: 'text' },
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'controlClass', type: 'string', initial: '' },
		{ prop: 'startIcon', type: 'IconName', initial: '' },
		{ prop: 'endIcon', type: 'IconName', initial: '' },
		{ prop: 'startText', type: 'string', initial: '' },
		{ prop: 'endText', type: 'string', initial: '' },
		{ prop: 'onchange', type: '(value: unknown) => void', initial: '' },
		{ prop: 'oninput', type: '(value: unknown) => void', initial: '' },
		{ prop: 'variant', type: 'primary | secondary | soft | line', initial: 'primary' },
		{ prop: 'size', type: 'sm | md | lg', initial: 'md' },
		{ prop: 'label', type: 'string', initial: '' },
		{ prop: 'labelActive', type: 'boolean', initial: 'false' },
		{ prop: 'helpText', type: 'string', initial: '' },
		{ prop: 'errorText', type: 'string', initial: '' },
		{ prop: 'autocomplete', type: "HTMLInputAttributes['autocomplete']", initial: '' },
		{ prop: 'min', type: "HTMLInputAttributes['min']", initial: '' },
		{ prop: 'max', type: "HTMLInputAttributes['max']", initial: '' },
		{ prop: 'maxlength', type: "HTMLInputAttributes['maxlength']", initial: '' },
		{ prop: 'isFloatLabel', type: 'boolean', initial: 'false' },
		{ prop: 'isSolid', type: 'boolean', initial: 'false' }
	];

	let value = $state('');
</script>

{#snippet preview()}
	<TextField
		name="textfield"
		placeholder="Enter text..."
		{variant}
		{size}
		{type}
		{isSolid}
		startIcon={startIcon || undefined}
		endIcon={endIcon || undefined}
		startText={startText || undefined}
		endText={endText || undefined}
		label={label || undefined}
		helpText={helpText || undefined}
		errorText={errorText || undefined}
		isFloatLabel={label && isFloatLabel ? isFloatLabel : undefined}
		bind:value
	/>
{/snippet}

{#snippet builder()}
	<Select label="Variant" name="variant" size="sm" options={variantOptions} bind:value={variant} />
	<Select label="Size" name="size" size="sm" options={sizeOptions} bind:value={size} />
	<Select label="Type" name="type" size="sm" options={typeOptions} bind:value={type} />

	<DocOptions title="Icons">
		<Checkbox
			onchange={(v) => (v ? (startIcon = 'fluent:search-24-regular') : (startIcon = ''))}
			name="start-icon"
			label="startIcon"
		/>
		<Checkbox
			onchange={(v) => (v ? (endIcon = 'fluent:mail-24-regular') : (endIcon = ''))}
			name="end-icon"
			label="endIcon"
		/>
	</DocOptions>

	<DocOptions title="Text Addons">
		<Checkbox
			onchange={(v) => (v ? (startText = 'https://') : (startText = ''))}
			name="start-text"
			label="startText"
		/>
		<Checkbox
			onchange={(v) => (v ? (endText = '.com') : (endText = ''))}
			name="end-text"
			label="endText"
		/>
	</DocOptions>

	<DocOptions title="Labels & Messages">
		<Checkbox onchange={(v) => (v ? (label = 'Label') : (label = ''))} name="label" label="Label" />
		{#if label}
			<Checkbox bind:checked={isFloatLabel} name="float-label" label="floatLabel" />
		{/if}
		<Checkbox
			onchange={(v) => (v ? (helpText = 'This is a help text') : (helpText = ''))}
			name="help-text"
			label="helpText"
		/>
		<Checkbox
			onchange={(v) => (v ? (errorText = 'This field is required') : (errorText = ''))}
			name="error-text"
			label="errorText"
		/>
		<Checkbox bind:checked={isSolid} name="solid" label="solid" />
	</DocOptions>
{/snippet}

<DocHeader title="TextField">Text fields allow users to enter and edit text.</DocHeader>

<DocPreview {preview} {builder} />

<DocCode code={code()} />

<DocProps {props} />
