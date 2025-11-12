<script lang="ts">
	import { Card, Checkbox, Code, Section, Divider, Select, Alert } from 'sappsui';
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

	const selectOptions = [
		{ id: '1', src: '/avatar-1.jpeg', label: 'Jonh Doe', description: 'Designer' },
		{ id: '2', src: '/avatar-2.jpeg', label: 'Jane Smith', description: 'Developer' },
		{ id: '3', src: '/avatar-3.jpeg', label: 'Mike Johnson', description: 'Manager' },
		{ id: '4', src: '/avatar-4.jpeg', label: 'Emily Davis', description: 'Intern' },
		{ id: '5', src: '/avatar-5.jpeg', label: 'David Wilson', description: 'CEO' }
	];

	let selectedVariant: any = $state('soft');
	let selectedColor: any = $state('primary');
	let selectedSize: any = $state('medium');

	let isLabelOutside = $state(false);
	let isLabelActive = $state(false);

	let showHelpText = $state(false);
	let showErrorText = $state(false);

	let withDescription = $state(false);
	let withAvatar = $state(false);

	let hasBinding = $state(false);
	let hasEvents = $state(false);

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
</script>

<Section contentClass="gap-4 p-3">
	<div class="prose">
		<h1>Select</h1>
		<p>Select is a form component that allows users to choose an option from a dropdown list.</p>
	</div>
	<Alert showIcon>
		<strong>Note:</strong> Use bind:value only if you're not using useForm, since useForm manages the
		value via the field name.
	</Alert>
	<Card bodyClass="column gap-4">
		<div class="column lg:row w-full gap-4">
			<div class="column w-full">
				<h4>Preview</h4>
				<div class="column center gap-4 flex-1 p-4">
					<Select
						label="Label"
						name="form_select"
						color={selectedColor}
						size={selectedSize}
						variant={selectedVariant}
						labelOutside={isLabelOutside}
						labelActive={isLabelActive}
						options={buildOptions}
						helpText={showHelpText ? 'Help text' : ''}
						errorText={showErrorText ? 'Form validation error' : ''}
					/>
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
				<h6>Option</h6>
				<div class="grid grid-cols-2 gap-2">
					<Checkbox bind:checked={withDescription} name="description" label="Description" />
					<Checkbox bind:checked={withAvatar} name="avatar" label="Avatar" />
				</div>
				<h6>Decorations</h6>
				<div class="grid grid-cols-2 gap-2">
					<Checkbox bind:checked={isLabelOutside} name="labelOutside" label="labelOutside" />
					<Checkbox bind:checked={isLabelActive} name="labelActive" label="labelActive" />
				</div>
				<h6>Feedback Messages</h6>
				<div class="grid grid-cols-2 gap-2">
					<Checkbox bind:checked={showHelpText} name="help-text" label="Help Text" />
					<Checkbox bind:checked={showErrorText} name="error-text" label="Error Text" />
				</div>
				<h6>Data & Events</h6>
				<div class="grid grid-cols-2 gap-2">
					<Checkbox bind:checked={hasBinding} name="help-text" label="Binding" />
					<Checkbox bind:checked={hasEvents} name="has-events" label="Events" />
				</div>
			</div>
		</div>

		{#snippet footer()}
			<Code
				lang="svelte"
				code={`<script lang="ts">
  import { Select } from 'sappsui';
  const selectOptions = [
	{
	  id: '1',
	  ${withAvatar ? "src: '/avatar-1.jpeg'," : ''}
	  label: 'Jonh Doe',
	  ${withDescription ? "description: '/Designer'," : ''}
	},
  ];
  ${hasBinding ? '\n  let selectedValue = $state("1")' : ''}
<\/script>
<Select
  label="Label"
  name="form_select"
  placeholder="Select an option"
  options={selectOptions}
  ${selectedVariant !== 'soft' ? `variant="${selectedVariant}"` : ''}
  ${selectedColor !== 'primary' ? `color="${selectedColor}"` : ''}
  ${selectedSize !== 'medium' ? `size="${selectedSize}"` : ''}
  ${showHelpText ? 'helpText="Help text"' : ''}
  ${showErrorText ? 'errorText={formState.errors.form_name}' : ''}
  ${hasBinding ? '\n  bind:value={selectedValue}' : ''}
  ${hasEvents ? '\n  onchange={(v) => console.log(v)}' : ''}
  ${isLabelOutside ? '\n  labelOutside' : ''}
  ${isLabelActive ? '\n  labelActive' : ''}
/>`.replace(/^\s*\n/gm, '')}
			/>
		{/snippet}
	</Card>
</Section>
