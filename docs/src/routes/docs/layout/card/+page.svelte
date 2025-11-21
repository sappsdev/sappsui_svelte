<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { Card, Checkbox, Select } from 'sappsui';

	const variantOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' },
		{ id: 'surface', label: 'Surface' },
		{ id: 'outline', label: 'Outline' },
		{ id: 'ghost', label: 'Ghost' }
	];

	// Selects
	let variant: any = $state('surface');

	// Props
	let cover = $state('');

	// States
	let showHeader = $state(false);
	let showFooter = $state(false);
	let overlay = $state(false);
	let divider = $state(false);
	let shadow = $state(false);
	let solid = $state(false);

	let hasProps = $derived(
		[variant !== 'outline', showHeader, showFooter, cover, overlay, divider, shadow].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Card } from 'sappsui';`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<Card`,
			variant !== 'outline' && `\tvariant="${variant}"`,
			cover && `\tcover="/img-1.jpeg"`,
			overlay && `\toverlay`,
			divider && `\tdivider`,
			shadow && `\tshadow`,
			hasProps && `>`,
			!hasProps && `<Card>`,
			showHeader && `\t{#snippet header()}`,
			showHeader && `\t\t<h3>Header</h3>`,
			showHeader && `\t{/snippet}\n`,
			`\t<p>Card body</p>`,
			showFooter && `\n\t{#snippet footer()}`,
			showFooter && `\t\t<h4>Footer</h4>`,
			showFooter && `\t{/snippet}`,
			`</Card>`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'children', type: 'Snippet', initial: '', required: true },
		{ prop: 'header', type: 'Snippet', initial: '' },
		{ prop: 'footer', type: 'Snippet', initial: '' },
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'cover', type: 'string', initial: '' },
		{ prop: 'overlay', type: 'boolean', initial: 'false' },
		{ prop: 'divider', type: 'boolean', initial: 'false' },
		{ prop: 'shadow', type: 'boolean', initial: 'false' },
		{ prop: 'solid', type: 'boolean', initial: 'false' },
		{
			prop: 'variant',
			type: 'primary | secondary | surface | outline | soft | ghost',
			initial: 'outline'
		},
		{ prop: 'headerClass', type: 'string', initial: '' },
		{ prop: 'footerClass', type: 'string', initial: '' },
		{ prop: 'bodyClass', type: 'string', initial: '' },
		{ prop: 'coverClass', type: 'string', initial: '' },
		{ prop: 'overlayClass', type: 'string', initial: '' }
	];
</script>

{#snippet header()}
	<h6>Header</h6>
{/snippet}

{#snippet footer()}
	<h6>Footer</h6>
{/snippet}

{#snippet preview()}
	<Card
		class="min-w-xs"
		{variant}
		header={showHeader ? header : undefined}
		footer={showFooter ? footer : undefined}
		cover={cover ? '/img-1.jpeg' : undefined}
		{overlay}
		{divider}
		{shadow}
		{solid}
	>
		<p>Card body</p>
	</Card>
{/snippet}

{#snippet builder()}
	<Select label="Variant" name="variant" size="sm" options={variantOptions} bind:value={variant} />

	<DocOptions title="Sections">
		<Checkbox bind:checked={showHeader} name="show-header" label="Header" />
		<Checkbox bind:checked={showFooter} name="show-footer" label="Footer" />
	</DocOptions>

	<DocOptions title="Props">
		<Checkbox
			onchange={(v) => (v ? (cover = '/img-1.jpeg') : (cover = ''))}
			name="cover"
			label="Cover"
		/>
		{#if cover}
			<Checkbox bind:checked={overlay} name="overlay" label="Overlay" />
		{/if}
		{#if showHeader || showFooter}
			<Checkbox bind:checked={divider} name="divider" label="Divider" />
		{/if}
		<Checkbox bind:checked={shadow} name="shadow" label="Shadow" />
		<Checkbox bind:checked={solid} name="solid" label="Solid" />
	</DocOptions>
{/snippet}

<DocHeader title="Card"
	>Cards are surfaces that display content and actions on a single topic.</DocHeader
>

<DocPreview {preview} {builder} />

<DocCode code={code()} />

<DocProps {props} />
