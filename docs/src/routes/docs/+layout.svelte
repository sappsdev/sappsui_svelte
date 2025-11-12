<script lang="ts">
	import {
		Scaffold,
		Avatar,
		Drawer,
		Dropdown,
		Icon,
		AppBar,
		Sidebar,
		ToggleTheme,
		SideNav
	} from 'sappsui';

	let { children } = $props();

	let drawerOpen = $state(false);

	const uiItems = [
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
			label: 'Table',
			href: '/docs/display/table'
		},
		{
			type: 'header',
			icon: 'fluent:form-24-regular',
			label: 'Form'
		},
		{
			label: 'Select',
			href: '/docs/form/select'
		},
		{
			label: 'TextField',
			href: '/docs/form/text-field'
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
			label: 'Form',
			href: '/docs/form'
		},
		{
			type: 'header',
			icon: 'fluent:layout-row-two-split-bottom-24-regular',
			label: 'Layout'
		},
		{
			label: 'Media',
			href: '/docs/media'
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
			type: 'submenu',
			icon: 'fluent:street-sign-24-regular',
			label: 'Navigation',
			open: true,
			subitems: [
				{
					label: 'AppBar',
					href: '/docs/navigation/app-bar'
				},
				{
					label: 'SideNav',
					href: '/docs/navigation/side-nav'
				}
			]
		}
	];
	const dropdownOptions = [{ label: 'Settings' }, { label: 'My Account' }];
</script>

<Scaffold
	mainClass="lg:pl-48 lg:pr-56 vh-16"
	startClass="invisible lg:visible vh-16"
	endClass="invisible lg:visible vh-16 mr-8"
	bodyClass="boxed"
>
	{#snippet appBar()}
		<AppBar class="h-16 sticky" contentClass="boxed">
			{#snippet start()}
				<div class="row gap-2">
					<Icon
						icon="duo-icons:menu"
						class="w-6 h-6 lg:hidden"
						onclick={() => (drawerOpen = !drawerOpen)}
					/>
					hello
				</div>
			{/snippet}
			{#snippet end()}
				<ToggleTheme />
				<Dropdown options={dropdownOptions}>
					<Avatar size="small" src="/avatar1.png" alt="User Avatar" bordered />
				</Dropdown>
			{/snippet}
		</AppBar>
	{/snippet}
	{#snippet start()}
		<Sidebar class="w-48">
			<SideNav class="p-4" items={uiItems} />
		</Sidebar>
	{/snippet}
	{@render children()}
	{#snippet end()}
		<Sidebar class="w-48">
			<SideNav class="p-4" items={uiItems} />
		</Sidebar>
	{/snippet}
</Scaffold>
<Drawer bind:open={drawerOpen} onclose={() => (drawerOpen = false)} class="w-56">
	<SideNav class="p-4" items={uiItems} />
</Drawer>
