<script lang="ts">
	import { SideNav, Card, Checkbox, Code, Section, Divider, Select } from 'sappsui';

	const colorOptions = [
		{ id: 'primary', label: 'Primary' },
		{ id: 'secondary', label: 'Secondary' }
	];

	let selectedColor: any = $state('primary');
	let showDivider = $state(false);
	let showHeader = $state(true);
	let showSubmenu = $state(true);
	let showIcons = $state(true);
	let showDescriptions = $state(false);
	let submenuOpen = $state(true);

	let navItems = $derived(() => {
		const items = [];

		if (showHeader) {
			items.push({
				type: 'header',
				icon: showIcons ? 'fluent:play-circle-hint-24-regular' : undefined,
				label: 'Media'
			});
		}

		items.push(
			{
				label: 'Audio',
				icon: showIcons ? 'fluent:speaker-2-24-regular' : undefined,
				description: showDescriptions ? 'Audio playback controls' : undefined,
				href: '/docs/media/audio'
			},
			{
				label: 'Record',
				icon: showIcons ? 'fluent:record-24-regular' : undefined,
				description: showDescriptions ? 'Recording functionality' : undefined,
				href: '/docs/media/record'
			},
			{
				label: 'Video',
				icon: showIcons ? 'fluent:video-24-regular' : undefined,
				description: showDescriptions ? 'Video player component' : undefined,
				href: '/docs/media/video'
			}
		);

		if (showDivider) {
			items.push({ type: 'divider' });
		}

		if (showSubmenu) {
			items.push({
				type: 'submenu',
				icon: showIcons ? 'fluent:street-sign-24-regular' : undefined,
				label: 'Navigation',
				open: submenuOpen,
				subitems: [
					{
						label: 'AppBar',
						icon: showIcons ? 'fluent:navigation-24-regular' : undefined,
						href: '/docs/navigation/app-bar'
					},
					{
						label: 'SideNav',
						icon: showIcons ? 'fluent:panel-left-24-regular' : undefined,
						href: '/docs/navigation/side-nav'
					},
					{
						label: 'Tabs',
						icon: showIcons ? 'fluent:tabs-24-regular' : undefined,
						href: '/docs/navigation/tabs'
					}
				]
			});
		}

		return items;
	});

	let hasProps = $derived(selectedColor !== 'primary');

	let code: any = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { SideNav } from 'sappsui';`,
			``,
			`\tconst navItems = [`
		];

		if (showHeader) {
			scriptLines.push(
				`\t\t{`,
				`\t\t\ttype: 'header',`,
				showIcons ? `\t\t\ticon: 'fluent:play-circle-hint-24-regular',` : '',
				`\t\t\tlabel: 'Media'`,
				`\t\t},`
			);
		}

		scriptLines.push(
			`\t\t{`,
			`\t\t\tlabel: 'Audio',`,
			showIcons ? `\t\t\ticon: 'fluent:speaker-2-24-regular',` : '',
			showDescriptions ? `\t\t\tdescription: 'Audio playback controls',` : '',
			`\t\t\thref: '/docs/media/audio'`,
			`\t\t},`,
			`\t\t{`,
			`\t\t\tlabel: 'Record',`,
			showIcons ? `\t\t\ticon: 'fluent:record-24-regular',` : '',
			showDescriptions ? `\t\t\tdescription: 'Recording functionality',` : '',
			`\t\t\thref: '/docs/media/record'`,
			`\t\t},`,
			`\t\t{`,
			`\t\t\tlabel: 'Video',`,
			showIcons ? `\t\t\ticon: 'fluent:video-24-regular',` : '',
			showDescriptions ? `\t\t\tdescription: 'Video player component',` : '',
			`\t\t\thref: '/docs/media/video'`,
			`\t\t}`
		);

		if (showDivider) {
			scriptLines.push(`,`, `\t\t{ type: 'divider' }`);
		}

		if (showSubmenu) {
			scriptLines.push(
				`,`,
				`\t\t{`,
				`\t\t\ttype: 'submenu',`,
				showIcons ? `\t\t\ticon: 'fluent:street-sign-24-regular',` : '',
				`\t\t\tlabel: 'Navigation',`,
				submenuOpen ? `\t\t\topen: true,` : '',
				`\t\t\tsubitems: [`,
				`\t\t\t\t{`,
				`\t\t\t\t\tlabel: 'AppBar',`,
				showIcons ? `\t\t\t\t\ticon: 'fluent:navigation-24-regular',` : '',
				`\t\t\t\t\thref: '/docs/navigation/app-bar'`,
				`\t\t\t\t},`,
				`\t\t\t\t{`,
				`\t\t\t\t\tlabel: 'SideNav',`,
				showIcons ? `\t\t\t\t\ticon: 'fluent:panel-left-24-regular',` : '',
				`\t\t\t\t\thref: '/docs/navigation/side-nav'`,
				`\t\t\t\t},`,
				`\t\t\t\t{`,
				`\t\t\t\t\tlabel: 'Tabs',`,
				showIcons ? `\t\t\t\t\ticon: 'fluent:tabs-24-regular',` : '',
				`\t\t\t\t\thref: '/docs/navigation/tabs'`,
				`\t\t\t\t}`,
				`\t\t\t]`,
				`\t\t}`
			);
		}

		scriptLines.push(`\t];`, `<\/script>`);

		const componentLines = [
			hasProps && `<SideNav`,
			hasProps && `\titems={navItems}`,
			selectedColor !== 'primary' && `\tcolor="${selectedColor}"`,
			hasProps && `/>`,
			!hasProps && `<SideNav items={navItems} />`
		].filter(Boolean);

		return [...scriptLines.filter(Boolean), ...componentLines].join('\n');
	});
</script>

<Section>
	<div class="prose">
		<h1>SideNav</h1>
		<p>Side navigation provides hierarchical, vertical navigation for your application.</p>
	</div>
</Section>

<Section>
	<Card>
		<div class="column lg:row w-full gap-3">
			<div class="column flex-1">
				<h4>Preview</h4>
				<div class="column center gap-4 flex-1 p-4">
					<div class="w-full max-w-xs">
						<SideNav items={navItems()} color={selectedColor} />
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
					<h6>Item Types</h6>
					<div class="grid grid-cols-2 gap-2">
						<Checkbox bind:checked={showHeader} name="show-header" label="Header" />
						<Checkbox bind:checked={showSubmenu} name="show-submenu" label="Submenu" />
						<Checkbox bind:checked={showDivider} name="show-divider" label="Divider" />
					</div>
				</div>

				<div class="flex flex-col gap-2">
					<h6>Item Features</h6>
					<div class="grid grid-cols-2 gap-2">
						<Checkbox bind:checked={showIcons} name="show-icons" label="Icons" />
						<Checkbox
							bind:checked={showDescriptions}
							name="show-descriptions"
							label="Descriptions"
						/>
						{#if showSubmenu}
							<Checkbox bind:checked={submenuOpen} name="submenu-open" label="Submenu Open" />
						{/if}
					</div>
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
		<p>The SideNav component accepts the following props:</p>
		<ul>
			<li><code>items</code> - Array of navigation items (required)</li>
			<li><code>color</code> - Color theme: primary or secondary (default: primary)</li>
			<li><code>class</code> - Custom CSS classes for the container</li>
			<li><code>itemClass</code> - Custom CSS classes for individual items</li>
		</ul>
	</div>
</Section>

<Section>
	<div class="prose">
		<h3>Item Types</h3>
		<p>Navigation items support different types:</p>

		<h4>Regular Item</h4>
		<ul>
			<li><code>label</code> - Display text (required)</li>
			<li><code>href</code> - Navigation URL</li>
			<li><code>icon</code> - Icon name from Iconify</li>
			<li><code>description</code> - Optional description text</li>
			<li><code>external</code> - Opens link in new tab</li>
			<li><code>onclick</code> - Click handler function</li>
			<li><code>status</code> - Badge or status indicator</li>
		</ul>

		<h4>Header</h4>
		<ul>
			<li><code>type: 'header'</code> - Marks item as a section header</li>
			<li><code>label</code> - Header text</li>
			<li><code>icon</code> - Optional header icon</li>
		</ul>

		<h4>Divider</h4>
		<ul>
			<li><code>type: 'divider'</code> - Adds a visual separator</li>
		</ul>

		<h4>Submenu</h4>
		<ul>
			<li><code>type: 'submenu'</code> - Creates expandable submenu</li>
			<li><code>label</code> - Submenu title</li>
			<li><code>icon</code> - Submenu icon</li>
			<li><code>open</code> - Initially expanded state</li>
			<li><code>subitems</code> - Array of nested items</li>
		</ul>
	</div>
</Section>

<Section>
	<div class="prose">
		<h3>SubItem Structure</h3>
		<p>Items within a submenu support the following properties:</p>
		<ul>
			<li><code>label</code> - Display text (required)</li>
			<li><code>href</code> - Navigation URL (required)</li>
			<li><code>icon</code> - Icon name</li>
			<li><code>description</code> - Optional description</li>
			<li><code>button</code> - Renders as button instead of link</li>
			<li><code>external</code> - Opens in new tab</li>
			<li><code>onclick</code> - Click handler function</li>
			<li><code>status</code> - Badge or status indicator</li>
		</ul>
	</div>
</Section>

<Section>
	<div class="prose">
		<h3>Custom Classes</h3>
		<p>You can pass custom classes to different parts of the SideNav component:</p>
		<ul>
			<li><code>class</code> - Applies to the navigation container</li>
			<li><code>itemClass</code> - Applies to each navigation item</li>
		</ul>
	</div>
</Section>
