<script lang="ts">
	import { Checkbox, Card, Code, Section, Divider, Select } from 'sappsui';

	const colorOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' },
		{ id: 'muted', label: 'Muted' }
	];

	let selectedColor: any = $state('primary');
	let isChecked = $state(false);
	let isDisabled = $state(false);
	let hasLabel = $state(true);

	let hasProps = $derived([selectedColor !== 'primary', isDisabled, !hasLabel].some(Boolean));

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Checkbox } from 'sappsui';`,
			`\n\tlet checked = $state(${isChecked});`,
			`\n\tconst handleChange = (newChecked: boolean) => {`,
			`\t\tchecked = newChecked;`,
			`\t\tconsole.log('Checkbox checked:', newChecked);`,
			`\t};`,
			`<\/script>`
		];

		const componentLines = [
			hasProps && `<Checkbox`,
			hasProps && `\tname="subscribe"`,
			hasLabel && hasProps && `\tlabel="Subscribe to newsletter"`,
			hasProps && `\tchecked={checked}`,
			hasProps && `\tonchange={handleChange}`,
			selectedColor !== 'primary' && `\tcolor="${selectedColor}"`,
			isDisabled && `\tdisabled`,
			hasProps && `/>`,
			!hasProps &&
				(hasLabel
					? `<Checkbox name="subscribe" label="Subscribe to newsletter" checked={checked} onchange={handleChange} />`
					: `<Checkbox name="subscribe" checked={checked} onchange={handleChange} />`)
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const handleCheckboxChange = (newChecked: boolean) => {
		isChecked = newChecked;
	};
</script>

<Section>
	<div class="prose">
		<h1>Checkbox</h1>
		<p>
			Checkboxes allow users to select one or more options from a set, or to toggle a single option
			on or off.
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
						<Checkbox
							name="demo-checkbox"
							label={hasLabel ? 'Subscribe to newsletter' : undefined}
							checked={isChecked}
							color={selectedColor}
							disabled={isDisabled}
							onchange={handleCheckboxChange}
						/>
						<p class="text-sm text-muted-foreground mt-2 text-center">
							Current state: {isChecked ? 'Checked' : 'Unchecked'}
						</p>
					</div>
				</div>
			</div>
			<Divider class="invisible lg:visible" vertical />
			<Divider class="lg:hidden" />
			<div class="column gap-3 min-w-64">
				<h4>Builder</h4>

				<Select
					label="Color"
					name="color"
					size="sm"
					options={colorOptions}
					bind:value={selectedColor}
				/>

				<div class="flex flex-col gap-2">
					<h6>Options</h6>
					<Checkbox bind:checked={isDisabled} name="disabled" label="Disabled" />
					<Checkbox bind:checked={hasLabel} name="has-label" label="Show Label" />
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
		<p>The Checkbox component accepts the following props:</p>
		<ul>
			<li><code>name</code> - Input name attribute (required)</li>
			<li><code>label</code> - Label text displayed next to the checkbox</li>
			<li><code>checked</code> - Controlled checked state</li>
			<li><code>defaultChecked</code> - Default checked state for uncontrolled usage</li>
			<li><code>onchange</code> - Callback function called when checked state changes</li>
			<li><code>disabled</code> - Disables the checkbox interaction (default: false)</li>
			<li><code>color</code> - Color theme: primary, secondary, or muted (default: primary)</li>
			<li><code>class</code> - Additional CSS classes to apply</li>
		</ul>
	</div>
</Section>
