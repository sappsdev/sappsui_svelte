<script lang="ts">
	import { Button, Card, Checkbox, Code, Section, Divider, Select } from 'sappsui';
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
	];

	const variantOptions = [
		{ id: 'solid', label: 'Solid' },
		{ id: 'outline', label: 'Outline' },
		{ id: 'soft', label: 'Soft' },
		{ id: 'ghost', label: 'Ghost' },
		{ id: 'link', label: 'Link' }
	];

	let selectedVariant: any = $state('solid');
	let selectedColor: any = $state('primary');
	let selectedSize: any = $state('medium');
	let isLoading: any = $state(false);
	let isLink: any = $state(false);
</script>

<Section contentClass="gap-4 p-3">
	<div class="prose">
		<h1>Button</h1>
		<p>Buttons allow users to take actions with a single tap.</p>
	</div>
	<Card contentClass="column gap-4">
		<div class="row w-full">
			<div class="column w-full">
				<h4>Preview</h4>
				<div class="column center gap-4 flex-1 p-4">
					<div class="wrap gap-4">
						{#each themeColors as color}
							<Button
								onclick={() => (selectedColor = color.id)}
								color={color.id}
								variant={selectedVariant}
								size={selectedSize}
								loading={isLoading}>{color.label}</Button
							>
						{/each}
					</div>
					<div class="wrap gap-4">
						{#each semanticColors as color}
							<Button
								onclick={() => (selectedColor = color.id)}
								color={color.id}
								variant={selectedVariant}
								size={selectedSize}
								loading={isLoading}>{color.label}</Button
							>
						{/each}
					</div>
				</div>
			</div>
			<Divider vertical />
			<div class="column gap-4 ml-4 w-56">
				<h4>Settings</h4>
				<Select
					label="Variant"
					name="variant"
					options={variantOptions}
					bind:value={selectedVariant}
				/>
				<Select label="Size" name="size" options={sizeOptions} bind:value={selectedSize} />

				<Checkbox bind:checked={isLoading} name="loading" label="Loading" />
				<Checkbox bind:checked={isLink} name="loading" label="Link" />
			</div>
		</div>

		{#snippet footer()}
			<Code
				lang="svelte"
				code={`<script lang="ts">
  import { Button } from 'sappsui'; ${!isLink ? '\n  const handleClick = () => console.log("clicked");' : ''}
<\/script>
<Button
  ${isLink ? 'href="https://example.com"' : 'onclick={handleClick}'}
  color="${selectedColor}"
  variant="${selectedVariant}"
  size="${selectedSize}"${isLoading ? '\n  loading' : ''}
>
    Label
</Button>`}
			/>
		{/snippet}
	</Card>
</Section>
