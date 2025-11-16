<script lang="ts">
	import { Slider, Card, Checkbox, Code, Section, Divider, Select, TextField } from 'sappsui';

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

	let selectedColor: any = $state('primary');
	let selectedSize: any = $state('medium');
	let minValue = $state(0);
	let maxValue = $state(100);
	let stepValue = $state(1);
	let sliderValue = $state(50);
	let hideLabel = $state(false);

	let hasProps = $derived(
		[
			selectedColor !== 'primary',
			selectedSize !== 'medium',
			minValue !== 0,
			maxValue !== 100,
			stepValue !== 1,
			hideLabel
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Slider } from 'sappsui';`,
			`\n\tlet value = $state(${sliderValue});`,
			`\n\tconst handleChange = (newValue: number) => {`,
			`\t\tvalue = newValue;`,
			`\t\tconsole.log('Slider value:', newValue);`,
			`\t};`,
			`<\/script>`
		];

		const componentLines = [
			hasProps && `<Slider`,
			hasProps && `\tlabel="Volume"`,
			hasProps && `\tname="volume"`,
			minValue !== 0 && `\tmin={${minValue}}`,
			maxValue !== 100 && `\tmax={${maxValue}}`,
			stepValue !== 1 && `\tstep={${stepValue}}`,
			hasProps && `\tvalue={value}`,
			hasProps && `\tonchange={handleChange}`,
			selectedSize !== 'medium' && `\tsize="${selectedSize}"`,
			selectedColor !== 'primary' && `\tcolor="${selectedColor}"`,
			hideLabel && `\thideLabel`,
			hasProps && `/>`,
			!hasProps && `<Slider label="Volume" name="volume" value={value} onchange={handleChange} />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const handleSliderChange = (newValue: number) => {
		sliderValue = newValue;
	};
</script>

<Section>
	<div class="prose">
		<h1>Slider</h1>
		<p>Sliders allow users to select a value from a range by moving a handle along a track.</p>
	</div>
</Section>

<Section>
	<Card>
		<div class="column lg:row w-full gap-3">
			<div class="column flex-1">
				<h4>Preview</h4>
				<div class="column center gap-4 flex-1 p-4">
					<div class="w-full max-w-md">
						<Slider
							label="Volume"
							name="demo-slider"
							min={minValue}
							max={maxValue}
							step={stepValue}
							value={sliderValue}
							size={selectedSize}
							color={selectedColor}
							onchange={handleSliderChange}
							{hideLabel}
						/>
						<p class="text-sm text-muted-foreground mt-2 text-center">
							Current value: {sliderValue}
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
				<Select
					label="Size"
					name="size"
					size="sm"
					options={sizeOptions}
					bind:value={selectedSize}
				/>
				<TextField
					label="Min Value"
					name="min_value"
					size="sm"
					type="number"
					bind:value={minValue}
					min={0}
					max={maxValue - 1}
				/>
				<TextField
					label="Max Value"
					name="max_value"
					size="sm"
					type="number"
					bind:value={maxValue}
					min={minValue + 1}
					max={1000}
				/>
				<TextField
					label="Step"
					name="step"
					size="sm"
					type="number"
					bind:value={stepValue}
					min={1}
					max={maxValue - minValue}
				/>

				<div class="flex flex-col gap-2">
					<h6>Options</h6>
					<Checkbox bind:checked={hideLabel} name="hide-label" label="Hide Label" />
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
		<p>The Slider component accepts the following props:</p>
		<ul>
			<li><code>name</code> - Input name attribute (required)</li>
			<li><code>label</code> - Label text displayed above the slider</li>
			<li><code>min</code> - Minimum value (default: 0)</li>
			<li><code>max</code> - Maximum value (default: 100)</li>
			<li><code>step</code> - Step increment (default: 1)</li>
			<li><code>value</code> - Current value of the slider</li>
			<li><code>onchange</code> - Callback function called when value changes</li>
			<li><code>size</code> - Size: small, medium, or large (default: medium)</li>
			<li><code>color</code> - Color theme: primary, secondary, or muted (default: primary)</li>
		</ul>
	</div>
</Section>
