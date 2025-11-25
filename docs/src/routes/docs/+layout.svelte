<script lang="ts">
	import {
		Scaffold,
		Avatar,
		Drawer,
		Dropdown,
		AppBar,
		Sidebar,
		ToggleTheme,
		SideNav,
		Card,
		IconButton
	} from 'sappsui';

	let { children } = $props();

	let drawerOpen = $state(false);

	const uiItems: any = [
		{
			type: 'header',
			icon: 'fluent:star-arrow-right-start-24-regular',
			label: 'Getting Started'
		},
		{
			label: 'Installation',
			href: '/docs/starter/install'
		},
		{
			label: 'Icons',
			href: '/docs/starter/icons'
		},
		{
			label: 'LLM',
			href: '/docs/starter/llm'
		},
		{
			label: 'Typography',
			href: '/docs/starter/typography'
		},
		{
			label: 'Theme',
			href: '/docs/starter/theme'
		},
		{
			type: 'header',
			icon: 'fluent:layout-row-two-split-bottom-24-regular',
			label: 'Layout'
		},
		{
			label: 'Scaffold',
			href: '/docs/layout/scaffold'
		},
		{
			type: 'header',
			icon: 'fluent:hand-draw-24-regular',
			label: 'Control'
		},
		{
			label: 'Button',
			href: '/docs/control/button'
		},
		{
			label: 'IconButton',
			href: '/docs/control/icon-button'
		},
		{
			label: 'Audio',
			href: '/docs/control/audio'
		},
		{
			label: 'Record',
			href: '/docs/control/record'
		},
		{
			label: 'Video',
			href: '/docs/control/video'
		},
		{
			type: 'header',
			icon: 'fluent:person-chat-24-regular',
			label: 'Display'
		},
		{
			label: 'Avatar',
			href: '/docs/display/avatar'
		},
		{
			label: 'Card',
			href: '/docs/display/card'
		},
		{
			label: 'ChatBox',
			href: '/docs/display/chat-box'
		},
		{
			label: 'Empty',
			href: '/docs/display/empty'
		},
		{
			label: 'Icon',
			href: '/docs/display/icon'
		},
		{
			label: 'Item',
			href: '/docs/display/item'
		},
		{
			label: 'Section',
			href: '/docs/display/section'
		},
		{
			label: 'Table',
			href: '/docs/display/table'
		},
		{
			type: 'header',
			icon: 'fluent:form-24-regular',
			label: 'Form'
		},
		{
			label: 'Checkbox',
			href: '/docs/form/checkbox'
		},
		{
			label: 'Combobox',
			href: '/docs/form/combobox'
		},
		{
			label: 'CsvField',
			href: '/docs/form/csv-field'
		},
		{
			label: 'Dropzone',
			href: '/docs/form/dropzone'
		},
		{
			label: 'Form',
			href: '/docs/form/form'
		},
		{
			label: 'Select',
			href: '/docs/form/select'
		},
		{
			label: 'Slider',
			href: '/docs/form/slider'
		},
		{
			label: 'PhoneField',
			href: '/docs/form/phone-field'
		},
		{
			label: 'RadioGroup',
			href: '/docs/form/radio-group'
		},
		{
			label: 'TextField',
			href: '/docs/form/text-field'
		},
		{
			label: 'Toggle',
			href: '/docs/form/toggle'
		},
		{
			type: 'header',
			icon: 'fluent:layout-column-one-third-right-hint-24-regular',
			label: 'Overlay'
		},
		{
			label: 'Toast',
			href: '/docs/overlay/toast'
		},
		{
			label: 'Tooltip',
			href: '/docs/overlay/tooltip'
		},
		{
			type: 'header',
			icon: 'fluent:street-sign-24-regular',
			label: 'Navigation'
		},
		{
			label: 'Tabs',
			href: '/docs/navigation/tabs'
		},
		{
			label: 'Sidenav',
			href: '/docs/navigation/sidenav'
		},
		{
			type: 'header',
			icon: 'fluent:layout-column-one-third-right-hint-24-regular',
			label: 'Charts'
		},
		{
			label: 'Arc',
			href: '/docs/charts/arc'
		},
		{
			label: 'Area',
			href: '/docs/charts/area'
		},
		{
			label: 'Bar',
			href: '/docs/charts/bar'
		},
		{
			label: 'Candlestick',
			href: '/docs/charts/candlestick'
		},
		{
			label: 'Line',
			href: '/docs/charts/line'
		},
		{
			label: 'Pie',
			href: '/docs/charts/pie'
		}
	];
	const dropdownOptions = [{ label: 'Settings' }, { label: 'My Account' }];
</script>

<Scaffold
	mainClass="lg:ml-48 xl:mr-56 vh-16 lg:p-4 mt-16"
	startClass="invisible lg:visible vh-16 mt-16"
	endClass="invisible xl:visible vh-16 mr-8 my-4 mt-16"
	bodyClass="boxed"
>
	{#snippet appBar()}
		<AppBar class="h-16" contentClass="boxed" isBlurred>
			{#snippet start()}
				<IconButton
					icon="fluent:list-24-regular"
					variant="ghost"
					onclick={() => (drawerOpen = !drawerOpen)}
				/>
			{/snippet}
			{#snippet end()}
				<ToggleTheme />
				<Dropdown options={dropdownOptions}>
					<Avatar size="sm" src="/avatar1.png" alt="User Avatar" />
				</Dropdown>
			{/snippet}
		</AppBar>
	{/snippet}
	{#snippet start()}
		<Sidebar class="w-48 py-8">
			<SideNav items={uiItems} />
		</Sidebar>
	{/snippet}
	{@render children()}
	{#snippet end()}
		<Card>SappsJs</Card>
	{/snippet}
</Scaffold>
<Drawer bind:open={drawerOpen} onclose={() => (drawerOpen = false)} class="w-56">
	<SideNav items={uiItems} />
</Drawer>
