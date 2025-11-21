<script lang="ts">
	import { RadioGroup, Card, Checkbox, Code, Section, Divider, Select, TextField } from 'sappsui';

	const colorOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' }
	];

	const sizeOptions = [
		{ id: 'small', label: 'Small' },
		{ id: 'medium', label: 'Medium' },
		{ id: 'large', label: 'Large' }
	];

	const radioItems = [
		{ value: 'solid', label: 'Solid' },
		{ value: 'soft', label: 'Soft' },
		{ value: 'outlined', label: 'Outlined' }
	];

	let selectedColor: any = $state('primary');
	let selectedSize: any = $state('medium');
	let selectedValue = $state('solid');
	let groupLabel = $state('Select variant');
	let infoText = $state('');
	let errorText = $state('');
	let hasLabel = $state(true);
	let hasInfo = $state(false);
	let hasError = $state(false);

	let hasProps = $derived(
		[selectedColor !== 'primary', selectedSize !== 'medium', !hasLabel, hasInfo, hasError].some(
			Boolean
		)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { RadioGroup } from 'sappsui';`,
			`\n\tconst radioItems = [`,
			`\t\t{ value: 'solid', label: 'Solid' },`,
			`\t\t{ value: 'soft', label: 'Soft' },`,
			`\t\t{ value: 'outline', label: 'Outline' }`,
			`\t];`,
			`\n\tlet selectedValue = $state('${selectedValue}');`,
			`\n\tconst handleChange = (value: string | number) => {`,
			`\t\tselectedValue = value;`,
			`\t\tconsole.log('Selected:', value);`,
			`\t};`,
			`<\/script>`
		];

		const componentLines = [
			hasProps && `<RadioGroup`,
			hasProps && `\toptions={radioItems}`,
			hasProps && `\tname="variant"`,
			hasLabel && hasProps && `\tlabel="${groupLabel}"`,
			hasProps && `\tvalue={selectedValue}`,
			hasProps && `\tonchange={handleChange}`,
			selectedSize !== 'medium' && `\tradioSize="${selectedSize}"`,
			selectedColor !== 'primary' && `\tcolor="${selectedColor}"`,
			hasInfo && infoText && `\tinfo="${infoText}"`,
			hasError && errorText && `\terror="${errorText}"`,
			hasProps && `/>`,
			!hasProps &&
				`<RadioGroup options={radioItems} name="variant" label="${groupLabel}" value={selectedValue} onchange={handleChange} />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const handleRadioChange = (value: string | number) => {
		selectedValue = value as string;
	};
</script>

<Section>
	<div class="prose">
		<h1>RadioGroup</h1>
		<p>
			Radio groups allow users to select a single option from a set of mutually exclusive choices.
		</p>
	</div>
</Section>

<Section>
	<Card>
		<div class="column lg:row w-full gap-3">
			<div class="column flex-1">
				<h4>Preview</h4>
				<div class="column center gap-4 flex-1 p-4">
					<div class="w-full max-w-md">
						<RadioGroup
							options={radioItems}
							name="demo-radio"
							label={hasLabel ? groupLabel : undefined}
							value={selectedValue}
							radioSize={selectedSize}
							color={selectedColor}
							info={hasInfo ? infoText : undefined}
							error={hasError ? errorText : undefined}
							onchange={handleRadioChange}
						/>
						<p class="text-sm text-muted-foreground mt-2 text-center">
							Selected value: {selectedValue}
						</p>
					</div>
				</div>
			</div>
			<Divider class="invisible lg:visible" vertical />
			<Divider class="lg:hidden" />
			<div class="column gap-3 min-w-64">
				<h4>Builder</h4>

				<TextField
					label="Group Label"
					name="group_label"
					size="sm"
					type="text"
					bind:value={groupLabel}
					disabled={!hasLabel}
				/>

				<Select
					label="Color"
					name="color"
					size="sm"
					options={colorOptions}
					bind:value={selectedColor}
				/>

				<Select
					label="Radio Size"
					name="size"
					size="sm"
					options={sizeOptions}
					bind:value={selectedSize}
				/>

				<TextField
					label="Info Text"
					name="info_text"
					size="sm"
					type="text"
					bind:value={infoText}
					disabled={!hasInfo}
					placeholder="Helper text"
				/>

				<TextField
					label="Error Text"
					name="error_text"
					size="sm"
					type="text"
					bind:value={errorText}
					disabled={!hasError}
					placeholder="Error message"
				/>

				<div class="flex flex-col gap-2">
					<h6>Options</h6>
					<Checkbox bind:checked={hasLabel} name="has-label" label="Show Label" />
					<Checkbox bind:checked={hasInfo} name="has-info" label="Show Info" />
					<Checkbox bind:checked={hasError} name="has-error" label="Show Error" />
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
		<h3>Props</h3>
		<p>The RadioGroup component accepts the following props:</p>
		<ul>
			<li>
				<code>options</code> - Array of options with value and label properties (required)
			</li>
			<li><code>name</code> - Input name attribute for the radio group (required)</li>
			<li><code>label</code> - Label text displayed above the radio group</li>
			<li><code>value</code> - Currently selected value (controlled component)</li>
			<li>
				<code>onchange</code> - Callback function called when selection changes. Receives the selected
				value
			</li>
			<li>
				<code>radioSize</code> - Size of radio buttons: small, medium, or large (default: medium)
			</li>
			<li>
				<code>color</code> - Color theme: primary, secondary, or muted (default: primary)
			</li>
			<li><code>info</code> - Helper text displayed below the radio group</li>
			<li><code>error</code> - Error message displayed below the radio group (overrides info)</li>
			<li><code>class</code> - Additional CSS classes to apply</li>
		</ul>

		<h3>Option Type</h3>
		<p>Each option in the options array should have the following structure:</p>
		<Code
			lang="typescript"
			code={`type Option = {
	value: string | number;
	label: string;
};`}
		/>

		<h3>Example Usage</h3>
		<p>Basic usage:</p>
		<Code
			lang="svelte"
			code={`<script lang="ts">
	import { RadioGroup } from 'sappsui';

	const radioItems = [
		{ value: 'solid', label: 'Solid' },
		{ value: 'soft', label: 'Soft' },
		{ value: 'outline', label: 'Outline' }
	];
<\/script>

<RadioGroup options={radioItems} name="variant" label="Select variant" />`}
		/>

		<p>Controlled with change handler:</p>
		<Code
			lang="svelte"
			code={`<script lang="ts">
	let selected = $state('solid');

	const handleChange = (value: string | number) => {
		console.log('Selected:', value);
	};
<\/script>

<RadioGroup
	options={radioItems}
	name="variant"
	label="Select variant"
	value={selected}
	onchange={handleChange}
/>`}
		/>

		<p>With validation:</p>
		<Code
			lang="svelte"
			code={`<RadioGroup
	options={radioItems}
	name="variant"
	label="Select variant"
	info="Choose the style that fits your design"
	error={!selected ? "Please select an option" : undefined}
	color="secondary"
	radioSize="large"
/>`}
		/>

		<h3>Features</h3>
		<ul>
			<li><strong>Mutually Exclusive</strong> - Only one option can be selected at a time</li>
			<li><strong>Keyboard Navigation</strong> - Use arrow keys to navigate between options</li>
			<li><strong>Accessible</strong> - Proper ARIA labels and keyboard support</li>
			<li><strong>Validation Support</strong> - Built-in error and info message display</li>
			<li><strong>Customizable</strong> - Multiple sizes and color themes available</li>
		</ul>
	</div>
</Section>
