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
			label: 'Card',
			href: '/docs/layout/card'
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
			type: 'header',
			icon: 'fluent:person-chat-24-regular',
			label: 'Display'
		},
		{
			label: 'Avatar',
			href: '/docs/display/avatar'
		},
		{
			label: 'ChatBox',
			href: '/docs/display/chat-box'
		},
		{
			label: 'Chart',
			href: '/docs/display/chart'
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
			icon: 'fluent:person-feedback-24-regular',
			label: 'Feedback'
		},
		{
			label: 'Empty',
			href: '/docs/feedback/empty'
		},
		{
			type: 'header',
			icon: 'fluent:play-circle-hint-24-regular',
			label: 'Media'
		},
		{
			label: 'Audio',
			href: '/docs/media/audio'
		},
		{
			label: 'Record',
			href: '/docs/media/record'
		},
		{
			label: 'Video',
			href: '/docs/media/video'
		},
		{
			type: 'header',
			icon: 'fluent:layout-column-one-third-right-hint-24-regular',
			label: 'Overlay'
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
		}
	];
	const dropdownOptions = [{ label: 'Settings' }, { label: 'My Account' }];
</script>

<Scaffold
	mainClass="lg:ml-48 xl:mr-56 vh-16 lg:p-4"
	startClass="invisible lg:visible vh-16"
	endClass="invisible xl:visible vh-16 mr-8 my-4"
	bodyClass="boxed"
>
	{#snippet appBar()}
		<AppBar class="h-16 sticky" contentClass="boxed">
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
					<Avatar size="small" src="/avatar1.png" alt="User Avatar" />
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
