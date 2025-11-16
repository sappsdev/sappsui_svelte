<script lang="ts">
	import { Toggle, Card, Checkbox, Code, Section, Divider, Select } from 'sappsui';

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
			`\timport { Toggle } from 'sappsui';`,
			`\n\tlet enabled = $state(${isChecked});`,
			`\n\tconst handleChange = (newEnabled: boolean) => {`,
			`\t\tenabled = newEnabled;`,
			`\t\tconsole.log('Toggle enabled:', newEnabled);`,
			`\t};`,
			`<\/script>`
		];

		const componentLines = [
			hasProps && `<Toggle`,
			hasProps && `\tname="notifications"`,
			hasLabel && hasProps && `\tlabel="Enable notifications"`,
			hasProps && `\tchecked={enabled}`,
			hasProps && `\tonchange={handleChange}`,
			selectedColor !== 'primary' && `\tcolor="${selectedColor}"`,
			isDisabled && `\tdisabled`,
			hasProps && `/>`,
			!hasProps &&
				(hasLabel
					? `<Toggle name="notifications" label="Enable notifications" checked={enabled} onchange={handleChange} />`
					: `<Toggle name="notifications" checked={enabled} onchange={handleChange} />`)
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const handleToggleChange = (newChecked: boolean) => {
		isChecked = newChecked;
	};
</script>

<Section>
	<div class="prose">
		<h1>Toggle</h1>
		<p>
			Toggles are switches that allow users to turn an option on or off, commonly used for settings
			and preferences.
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
						<Toggle
							name="demo-toggle"
							label={hasLabel ? 'Enable notifications' : undefined}
							checked={isChecked}
							color={selectedColor}
							disabled={isDisabled}
							onchange={handleToggleChange}
						/>
						<p class="text-sm text-muted-foreground mt-2 text-center">
							Current state: {isChecked ? 'Enabled' : 'Disabled'}
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
		<p>The Toggle component accepts the following props:</p>
		<ul>
			<li><code>name</code> - Input name attribute (required)</li>
			<li><code>label</code> - Label text displayed next to the toggle</li>
			<li><code>checked</code> - Controlled checked state</li>
			<li><code>defaultChecked</code> - Default checked state for uncontrolled usage</li>
			<li><code>onchange</code> - Callback function called when toggle state changes</li>
			<li><code>disabled</code> - Disables the toggle interaction (default: false)</li>
			<li><code>color</code> - Color theme: primary, secondary, or muted (default: primary)</li>
			<li><code>class</code> - Additional CSS classes to apply</li>
		</ul>
	</div>
</Section>
