<script lang="ts">
	import { Button, Card, Code, IconButton, RadioGroup, Section } from 'sappsui';
	const themeColors = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'accent', label: 'Accent' },
		{ id: 'muted', label: 'Muted' }
	] as const;
	const semanticColors = [
		{ id: 'success', label: 'Success' },
		{ id: 'warning', label: 'Warning' },
		{ id: 'error', label: 'Error' },
		{ id: 'info', label: 'Info' }
	] as const;

	const sizeOptions = [
		{ id: 'tiny', label: 'Tiny' },
		{ id: 'small', label: 'Small' },
		{ id: 'medium', label: 'Medium' },
		{ id: 'large', label: 'Large' }
	] as const;

	const variantOptions = [
		{ id: 'solid', label: 'Solid' },
		{ id: 'outlined', label: 'Outlined' },
		{ id: 'soft', label: 'Soft' },
		{ id: 'ghost', label: 'Ghost' },
		{ id: 'link', label: 'Link' }
	];

	let selectedVariant: any = $state('solid');
	let selectedColor: any = $state('primary');
</script>

{#snippet selectVariant()}
	<RadioGroup
		label="Button Variant"
		name="variant"
		options={variantOptions}
		bind:value={selectedVariant}
	/>
{/snippet}
{#snippet selectColor()}
	<RadioGroup
		label="Button Color"
		name="variant"
		options={[...themeColors, ...semanticColors]}
		bind:value={selectedColor}
	/>
{/snippet}

<Section contentClass="gap-4 p-2">
	<h1>Button</h1>
	<p>Buttons allow users to take actions with a single tap.</p>
	<Card contentClass="column center gap-4 my-4">
		{#snippet header()}
			{@render selectVariant()}
			{@render selectColor()}
		{/snippet}
		<div class="wrap gap-4">
			{#each themeColors as color}
				<Button color={color.id} variant={selectedVariant} class="min-w-32">{color.label}</Button>
			{/each}
		</div>
		<div class="wrap gap-4">
			{#each semanticColors as color}
				<Button color={color.id} variant={selectedVariant} class="min-w-32">{color.label}</Button>
			{/each}
		</div>
		{#snippet footer()}
			<Code
				lang="svelte"
				code={`<script lang="ts">
  import { Button } from 'sappsui';
<\/script>
<Button color="${selectedColor}" variant="${selectedVariant}" class="min-w-32">Label</Button>`}
			/>
		{/snippet}
	</Card>
</Section>
