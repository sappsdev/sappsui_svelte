<script lang="ts">
	import { Card, Checkbox, Code, Divider, Section, Select } from 'sappsui';

	const variantOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'surface', label: 'Surface' },
		{ id: 'soft', label: 'Soft' },
		{ id: 'outline', label: 'Outline' },
		{ id: 'ghost', label: 'Ghost' }
	];

	let selectedVariant: any = $state('outline');
	let selectedColor: any = $state('default');

	let showHeader = $state(false);
	let showFooter = $state(false);
	let showDivider = $state(false);
	let showShadow = $state(false);
	let showHover = $state(false);
	let showOverlay = $state(false);
	let showCover = $state(false);

	let hasProps = $derived(
		[
			showDivider,
			showShadow,
			showHover,
			showCover && showOverlay,
			showCover,
			selectedVariant !== 'outline',
			selectedColor !== 'default'
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Card } from 'sappsui';`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<Card`,
			selectedVariant !== 'outline' && `\tvariant="${selectedVariant}"`,
			selectedColor !== 'default' && `\tcolor="${selectedColor}"`,
			showCover && `\tcover='/img-1.jpeg'`,
			showDivider && `\tdivider`,
			showShadow && `\tshadow`,
			showCover && showOverlay && `\toverlay`,
			showHover && `\thover`,
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
</script>

{#snippet header()}
	<h6>Header</h6>
{/snippet}

{#snippet footer()}
	<h6>Footer</h6>
{/snippet}

<Section>
	<div class="prose">
		<h1>Card</h1>
		<p>Cards are surfaces that display content and actions on a single topic.</p>
	</div>
</Section>
<Section>
	<Card>
		<div class="column lg:row w-full gap-3">
			<div class="column flex-1">
				<h4>Preview</h4>
				<div class="column center gap-4 flex-1 p-4">
					<Card
						class="min-w-xs"
						color={selectedColor}
						variant={selectedVariant}
						header={showHeader ? header : undefined}
						footer={showFooter ? footer : undefined}
						cover={showCover ? '/img-1.jpeg' : undefined}
						divider={showDivider}
						shadow={showShadow}
						overlay={showOverlay}
						hover={showHover}
					>
						<p>Card body</p>
					</Card>
				</div>
			</div>
			<Divider class="invisible lg:visible" vertical />
			<Divider class="lg:hidden" />
			<div class="column gap-3 min-w-64">
				<h4>Builder</h4>

				<Select
					label="Variant"
					name="variant"
					size="sm"
					options={variantOptions}
					bind:value={selectedVariant}
				/>

				<div class="flex flex-col gap-2">
					<h6>Sections</h6>
					<div class="grid grid-cols-2 gap-2">
						<Checkbox bind:checked={showHeader} name="show-header" label="Header" />
						<Checkbox bind:checked={showFooter} name="show-footer" label="Footer" />
					</div>
				</div>

				<div class="flex flex-col gap-2">
					<h6>Decorations</h6>
					<div class="grid grid-cols-2 gap-2">
						{#if showHeader || showFooter}
							<Checkbox bind:checked={showDivider} name="show-divider" label="Divider" />
						{/if}
						<Checkbox bind:checked={showShadow} name="show-shadow" label="Shadow" />
						<Checkbox bind:checked={showHover} name="show-hover" label="Hover" />
						<Checkbox bind:checked={showCover} name="show-cover" label="Cover" />
						{#if showCover}
							<Checkbox bind:checked={showOverlay} name="show-overlay" label="Overlay" />
						{/if}
					</div>
				</div>
			</div>
		</div>
	</Card>
</Section>

<Section>
	<Code lang="svelte" code={code()} />
</Section>
<Section>
	<div class="prose">
		<h3>Custom Classes</h3>
		<p>You can pass custom classes to different parts of the Card component:</p>
		<ul>
			<li><code>class</code> - Applies to the card container</li>
			<li><code>headerClass</code> - Applies to the header section</li>
			<li><code>bodyClass</code> - Applies to the body section</li>
			<li><code>footerClass</code> - Applies to the footer section</li>
		</ul>
	</div>
</Section>
