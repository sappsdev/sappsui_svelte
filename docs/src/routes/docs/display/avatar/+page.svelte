<script lang="ts">
	import { Button, Card, Checkbox, Code, Section, Divider, Select, Avatar } from 'sappsui';
	const colorOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'accent', label: 'Accent' },
		{ id: 'muted', label: 'Muted' },
		{ id: 'success', label: 'Success' },
		{ id: 'warning', label: 'Warning' },
		{ id: 'error', label: 'Error' },
		{ id: 'info', label: 'Info' }
	];

	const sizeOptions = [
		{ id: 'tiny', label: 'Tiny' },
		{ id: 'small', label: 'Small' },
		{ id: 'medium', label: 'Medium' },
		{ id: 'large', label: 'Large' },
		{ id: 'extra', label: 'Extra' }
	];

	const sourceOptions = [
		{ id: 'image', label: 'Image' },
		{ id: 'name', label: 'Name' },
		{ id: 'icon', label: 'Icon' }
	];

	let selectedColor: any = $state('primary');
	let selectedSize: any = $state('large');
	let selectedSource: any = $state('image');

	let isOutline: any = $state(false);
</script>

<Section contentClass="gap-4 p-3">
	<div class="prose">
		<h1>Avatar</h1>
		<p>Avatar component is used to display user profile pictures or initials.</p>
	</div>
	<Card bodyClass="column gap-4">
		<div class="row w-full">
			<div class="column w-full">
				<h4>Preview</h4>
				<div class="column center flex-1 p-2 md:p-4">
					<Avatar
						color={selectedColor}
						src={selectedSource === 'image' ? '/avatar-1.jpeg' : undefined}
						name={selectedSource === 'name' ? 'J' : undefined}
						icon={selectedSource === 'icon' ? 'fluent:person-24-regular' : undefined}
						size={selectedSize}
						outline={isOutline}
					/>
				</div>
			</div>
			<Divider vertical />
			<div class="column gap-4 ml-4 w-56">
				<h4>Builder</h4>
				<Select
					label="Source"
					name="source"
					size="small"
					options={sourceOptions}
					bind:value={selectedSource}
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
				<Checkbox bind:checked={isOutline} name="outline" label="Outline" />
			</div>
		</div>

		{#snippet footer()}
			<Code
				lang="svelte"
				code={`<script lang="ts">
  import { Avatar } from 'sappsui';
<\/script>
<Avatar
  ${selectedSource === 'image' ? `src="/avatar-1.jpeg"` : ''}
  ${selectedSource === 'icon' ? `icon="fluent:person-24-regular"` : ''}
  ${selectedSource === 'name' ? `name="Jonh"` : ''}
  ${selectedColor !== 'primary' ? `color="${selectedColor}"` : ''}
  ${selectedSize !== 'large' ? `size="${selectedSize}"` : ''}
  ${isOutline ? '\n  outline' : ''}
/>`.replace(/^\s*\n/gm, '')}
			/>
		{/snippet}
	</Card>
</Section>
