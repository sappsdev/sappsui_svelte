<script lang="ts">
	import { Card, Checkbox, Code, Section, Divider, Select, Dropzone } from 'sappsui';
	const colorOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'accent', label: 'Accent' },
		{ id: 'muted', label: 'Muted' }
	];

	const sizeOptions = [
		{ id: 'small', label: 'Small' },
		{ id: 'medium', label: 'Medium' },
		{ id: 'large', label: 'Large' }
	];

	const variantOptions = [
		{ id: 'solid', label: 'Solid' },
		{ id: 'soft', label: 'Soft' },
		{ id: 'outline', label: 'Outline' },
		{ id: 'line', label: 'Line' }
	];

	let selectedVariant: any = $state('soft');
	let selectedColor: any = $state('primary');
	let selectedSize: any = $state('medium');

	let isLabelOutside = $state(false);
	let isLabelActive = $state(false);

	let hasStartIcon = $state(false);
	let hasStartText = $state(false);
	let hasEndIcon = $state(false);
	let hasEndText = $state(false);

	let showHelpText = $state(false);
	let showErrorText = $state(false);

	let hasBinding = $state(false);
	let hasEvents = $state(false);
	let hasDefaultValue = $state(false);

	let textValue = $state('');
</script>

<Section contentClass="gap-4 p-3">
	<div class="prose">
		<h1>Dropzone</h1>
		<p>Dropzone component is used to upload files via drag and drop or file selection.</p>
	</div>
	<Card bodyClass="column gap-2">
		<div class="column lg:row w-full gap-4">
			<div class="column w-full">
				<h4>Preview</h4>
				<div class="column center flex-1 p-2 md:p-4">
					<Dropzone label="Label" name="form_name" class="max-w-md" />
				</div>
			</div>
			<Divider class="invisible lg:visible" vertical />
			<Divider class="lg:hidden" />
			<div class="column gap-3 min-w-64">
				<h4>Builder</h4>
				<Select
					label="Variant"
					name="variant"
					size="small"
					options={variantOptions}
					bind:value={selectedVariant}
				/>
				<Select
					label="Color"
					name="color"
					size="small"
					options={colorOptions}
					bind:value={selectedColor}
				/>
				<Select
					label="Size"
					name="size"
					size="small"
					options={sizeOptions}
					bind:value={selectedSize}
				/>
			</div>
		</div>

		{#snippet footer()}
			<Code
				lang="svelte"
				code={`<script lang="ts">
  import { Dropzone } from 'sappsui';
<\/script>
<Dropzone
  label="Label"
  name="form_name"
  placeholder="Enter text"
/>`.replace(/^\s*\n/gm, '')}
			/>
		{/snippet}
	</Card>
</Section>
