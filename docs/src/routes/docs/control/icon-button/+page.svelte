<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { IconButton, Checkbox, Select } from 'sappsui';

	const variantOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' },
		{ id: 'outline', label: 'Outline' },
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
	let icon = $state('fluent:heart-24-regular');
	let href = $state('');

	// States
	let loading = $state(false);
	let disabled = $state(false);
	let shadow = $state(false);
	let solid = $state(true);

	let hasProps = $derived(
		[
			variant !== 'primary',
			size !== 'md',
			type !== 'button',
			icon !== 'fluent:heart-24-regular',
			href,
			loading,
			disabled,
			shadow,
			solid
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { IconButton } from 'sappsui';`,
			!href && `\n\tconst handleClick = () => {`,
			!href && `\t\tconsole.log('IconButton clicked');`,
			!href && `\t};`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<IconButton`,
			hasProps && `\ticon="${icon}"`,
			variant !== 'primary' && `\tvariant="${variant}"`,
			size !== 'md' && `\tsize="${size}"`,
			type !== 'button' && `\ttype="${type}"`,
			href && `\thref="/example"`,
			hasProps && !href && `\tonclick={handleClick}`,
			loading && `\tloading`,
			disabled && `\tdisabled`,
			shadow && `\tshadow`,
			solid && `\tsolid`,
			hasProps && `/>`,
			!hasProps && `<IconButton icon="${icon}" onclick={handleClick} />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'icon', type: 'IconName', initial: '', required: true },
		{ prop: 'onclick', type: '() => void', initial: '' },
		{ prop: 'type', type: 'button | submit | reset', initial: 'button' },
		{ prop: 'href', type: 'string', initial: '' },
		{
			prop: 'variant',
			type: 'primary | secondary | muted | outline | ghost | success | info | warning | danger',
			initial: 'primary'
		},
		{ prop: 'size', type: 'xs | sm | md | lg', initial: 'md' },
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'loading', type: 'boolean', initial: 'false' },
		{ prop: 'disabled', type: 'boolean', initial: 'false' },
		{ prop: 'shadow', type: 'boolean', initial: 'false' },
		{ prop: 'solid', type: 'boolean', initial: 'false' }
	];
</script>

{#snippet preview()}
	<IconButton {icon} {variant} {size} {type} {href} {loading} {disabled} {shadow} {solid} />
{/snippet}

{#snippet builder()}
	<Select label="Variant" name="variant" size="sm" options={variantOptions} bind:value={variant} />
	<Select label="Size" name="size" size="sm" options={sizeOptions} bind:value={size} />
	<Select label="Type" name="type" size="sm" options={typeOptions} bind:value={type} />

	<DocOptions title="Props">
		<Checkbox onchange={(v) => (v ? (href = '/example') : (href = ''))} name="href" label="Link" />
		<Checkbox bind:checked={loading} name="loading" label="Loading" />
		<Checkbox bind:checked={disabled} name="disabled" label="Disabled" />
		<Checkbox bind:checked={shadow} name="shadow" label="Shadow" />
		<Checkbox bind:checked={solid} name="solid" label="Solid" />
	</DocOptions>
{/snippet}

<DocHeader title="IconButton"
	>Icon buttons allow users to take actions with a single icon tap.</DocHeader
>

<DocPreview {preview} {builder} />

<DocCode code={code()} />

<DocProps {props} />
