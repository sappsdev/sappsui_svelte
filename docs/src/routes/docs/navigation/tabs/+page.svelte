<script lang="ts">
	import { Tabs, Card, Code, Section, Divider, Select } from 'sappsui';

	const positionOptions = [
		{ id: 'top', label: 'Top' },
		{ id: 'bottom', label: 'Bottom' },
		{ id: 'start', label: 'Start' },
		{ id: 'end', label: 'End' }
	];

	const variantOptions = [
		{ id: 'solid', label: 'Solid' },
		{ id: 'pill', label: 'Pill' },
		{ id: 'outline', label: 'Outline' },
		{ id: 'underlined', label: 'Underlined' },
		{ id: 'ghost', label: 'Ghost' }
	];

	const colorOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' }
	];

	let selectedPosition: any = $state('top');
	let selectedVariant: any = $state('solid');
	let selectedColor: any = $state('primary');

	const tabItems = [
		{ id: 'tab1', label: 'Tab 1', content: 'Content for Tab 1' },
		{ id: 'tab2', label: 'Tab 2', content: 'Content for Tab 2' },
		{ id: 'tab3', label: 'Tab 3', content: 'Content for Tab 3' }
	];

	let hasProps = $derived(
		[selectedPosition !== 'top', selectedVariant !== 'solid', selectedColor !== 'primary'].some(
			Boolean
		)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Tabs } from 'sappsui';`,
			``,
			`\tconst tabItems = [`,
			`\t\t{ id: 'tab1', label: 'Tab 1', content: 'Content for Tab 1' },`,
			`\t\t{ id: 'tab2', label: 'Tab 2', content: 'Content for Tab 2' },`,
			`\t\t{ id: 'tab3', label: 'Tab 3', content: 'Content for Tab 3' }`,
			`\t];`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<Tabs`,
			hasProps && `\ttabs={tabItems}`,
			selectedPosition !== 'top' && `\tposition="${selectedPosition}"`,
			selectedVariant !== 'solid' && `\tvariant="${selectedVariant}"`,
			selectedColor !== 'primary' && `\tcolor="${selectedColor}"`,
			hasProps && `/>`,
			!hasProps && `<Tabs tabs={tabItems} />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});
</script>

<Section>
	<div class="prose">
		<h1>Tabs</h1>
		<p>Tabs organize content into separate views where only one view can be visible at a time.</p>
	</div>
</Section>

<Section>
	<Card>
		<div class="column lg:row w-full gap-3">
			<div class="column flex-1">
				<h4>Preview</h4>
				<div class="column center gap-4 flex-1 p-4">
					<Tabs
						tabs={tabItems}
						position={selectedPosition}
						variant={selectedVariant}
						color={selectedColor}
					/>
				</div>
			</div>
			<Divider class="invisible lg:visible" vertical />
			<Divider class="lg:hidden" />
			<div class="column gap-3 min-w-64">
				<h4>Builder</h4>

				<Select
					label="Position"
					name="position"
					size="sm"
					options={positionOptions}
					bind:value={selectedPosition}
				/>
				<Select
					label="Variant"
					name="variant"
					size="sm"
					options={variantOptions}
					bind:value={selectedVariant}
				/>
				<Select
					label="Color"
					name="color"
					size="sm"
					options={colorOptions}
					bind:value={selectedColor}
				/>
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
		<p>The Tabs component accepts the following props:</p>
		<ul>
			<li><code>tabs</code> - Array of tab objects with id, label, and content (required)</li>
			<li><code>position</code> - Position of tabs: top, bottom, start, or end (default: top)</li>
			<li>
				<code>variant</code> - Visual style: solid, pill, outline, underlined, or ghost (default: solid)
			</li>
			<li><code>color</code> - Color theme: primary or secondary (default: primary)</li>
			<li><code>class</code> - Custom CSS classes for the container</li>
			<li><code>tabListClass</code> - Custom CSS classes for the tab list</li>
			<li><code>tabClass</code> - Custom CSS classes for individual tabs</li>
			<li><code>tabContentClass</code> - Custom CSS classes for tab content</li>
		</ul>
	</div>
</Section>

<Section>
	<div class="prose">
		<h3>Tab Object Structure</h3>
		<p>Each tab in the <code>tabs</code> array should have the following structure:</p>
		<ul>
			<li><code>id</code> - Unique identifier for the tab (required)</li>
			<li><code>label</code> - Display text for the tab (required)</li>
			<li><code>content</code> - Content to display when tab is active (required)</li>
		</ul>
	</div>
</Section>

<Section>
	<div class="prose">
		<h3>Custom Classes</h3>
		<p>You can pass custom classes to different parts of the Tabs component:</p>
		<ul>
			<li><code>class</code> - Applies to the tabs container</li>
			<li><code>tabListClass</code> - Applies to the tab list wrapper</li>
			<li><code>tabClass</code> - Applies to each individual tab button</li>
			<li><code>tabContentClass</code> - Applies to the tab content area</li>
		</ul>
	</div>
</Section>
