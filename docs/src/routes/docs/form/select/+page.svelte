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

	const selectOptions = [
		{ id: '1', src: '/avatar-1.jpeg', label: 'Jonh Doe', description: 'Designer' },
		{ id: '2', src: '/avatar-2.jpeg', label: 'Jane Smith', description: 'Developer' },
		{ id: '3', src: '/avatar-3.jpeg', label: 'Mike Johnson', description: 'Manager' },
		{ id: '4', src: '/avatar-4.jpeg', label: 'Emily Davis', description: 'Intern' },
		{ id: '5', src: '/avatar-5.jpeg', label: 'David Wilson', description: 'CEO' },
		{ id: '6', src: '/avatar-1.jpeg', label: 'Jonh Doe', description: 'Designer' },
		{ id: '7', src: '/avatar-2.jpeg', label: 'Jane Smith', description: 'Developer' },
		{ id: '8', src: '/avatar-3.jpeg', label: 'Mike Johnson', description: 'Manager' },
		{ id: '9', src: '/avatar-4.jpeg', label: 'Emily Davis', description: 'Intern' },
		{ id: '10', src: '/avatar-5.jpeg', label: 'David Wilson', description: 'CEO' }
	];

	let variant: any = $state('primary');
	let size: any = $state('md');
	let type: any = $state('text');

	let startIcon = $state('');
	let endIcon = $state('');

	let floatLabel = $state(false);
	let disabled = $state(false);
	let shadow = $state(false);
	let withDescription = $state(false);
	let withAvatar = $state(false);

	let buildOptions: any = $derived.by(() => {
		if (withDescription && !withAvatar) {
			return selectOptions.map((option) => ({
				...option,
				description: option.description,
				src: undefined
			}));
		} else if (!withDescription && withAvatar) {
			return selectOptions.map((option) => ({
				...option,
				description: undefined,
				src: option.src
			}));
		} else if (withDescription && withAvatar) {
			return selectOptions;
		} else {
			return selectOptions.map((option) => ({
				...option,
				description: undefined,
				src: undefined
			}));
		}
	});

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
	<Select
		label="Label"
		name="form_select"
		class="max-w-md"
		options={buildOptions}
		{size}
		{variant}
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

	<DocOptions title="Option">
		<Checkbox bind:checked={withAvatar} name="avatar" label="Avatar" />
		<Checkbox bind:checked={withDescription} name="description" label="Description" />
	</DocOptions>
{/snippet}

<DocHeader title="Select">
	Select is a form component that allows users to choose an option from a dropdown list. For large
	datasets or searchable options, consider using
	<a href="/docs/form/combobox" class="link">Combobox</a> instead.
</DocHeader>

<DocPreview {preview} {builder} />

<DocCode code={code()} />

<DocProps {props} />
