<script lang="ts">
	import { Card, Checkbox, Code, Section, Divider, Select, TextField, Alert } from 'sappsui';
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
		<h1>TextField</h1>
		<p>TextField component is used to get user input in forms.</p>
	</div>
	<Alert showIcon>
		<strong>Note:</strong> Use bind:value only if you're not using useForm, since useForm manages the
		value via the field name.
	</Alert>
	<Card bodyClass="column gap-2">
		<div class="column lg:row w-full gap-4">
			<div class="column w-full">
				<h4>Preview</h4>
				<div class="column center flex-1 p-2 md:p-4">
					<TextField
						label="Label"
						name="form_name"
						class="max-w-md"
						placeholder="Enter text"
						defaultValue={hasDefaultValue ? 'Default value' : ''}
						color={selectedColor}
						variant={selectedVariant}
						size={selectedSize}
						labelOutside={isLabelOutside}
						labelActive={isLabelActive}
						startIcon={hasStartIcon ? 'fluent:search-24-regular' : ''}
						startText={hasStartText ? 'start' : ''}
						endIcon={hasEndIcon ? 'fluent:weather-partly-cloudy-day-24-regular' : ''}
						endText={hasEndText ? 'end' : ''}
						helpText={showHelpText ? 'Help text' : ''}
						errorText={showErrorText ? 'Form validation error' : ''}
						bind:value={textValue}
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
				<h6>Decorations</h6>
				<div class="grid grid-cols-2 gap-2">
					<Checkbox bind:checked={hasStartIcon} name="start-icon" label="startIcon" />
					<Checkbox bind:checked={hasStartText} name="start-text" label="startText" />
					<Checkbox bind:checked={hasEndIcon} name="end-icon" label="endIcon" />
					<Checkbox bind:checked={hasEndText} name="end-text" label="endText" />
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
					<Checkbox bind:checked={hasDefaultValue} name="default-value" label="defaultValue" />
				</div>
			</div>
		</div>

		{#snippet footer()}
			<Code
				lang="svelte"
				code={`<script lang="ts">
  import { TextField } from 'sappsui';
  ${hasBinding ? '\n  let textValue = $state("")' : ''}
<\/script>
<TextField
  label="Label"
  name="form_name"
  placeholder="Enter text"
  ${hasDefaultValue ? 'defaultValue="Default value"' : ''}
  ${selectedVariant !== 'soft' ? `variant="${selectedVariant}"` : ''}
  ${selectedColor !== 'primary' ? `color="${selectedColor}"` : ''}
  ${selectedSize !== 'medium' ? `size="${selectedSize}"` : ''}
  ${hasStartIcon ? 'startIcon="fluent:search-24-regular"' : ''}
  ${hasEndIcon ? 'endIcon="fluent:weather-partly-cloudy-day-24-regular"' : ''}
  ${hasStartText ? 'startText="start"' : ''}
  ${hasEndText ? 'endText="end"' : ''}
  ${showHelpText ? 'helpText="Help text"' : ''}
  ${showErrorText ? 'errorText={formState.errors.form_name}' : ''}
  ${hasBinding ? '\n  bind:value={textValue}' : ''}
  ${hasEvents ? '\n  onchange={(v) => console.log(v)}' : ''}
  ${hasEvents ? '\n  oninput={(v) => console.log(v)}' : ''}
  ${isLabelOutside ? '\n  labelOutside' : ''}
  ${isLabelActive ? '\n  labelActive' : ''}
/>`.replace(/^\s*\n/gm, '')}
			/>
		{/snippet}
	</Card>
</Section>
