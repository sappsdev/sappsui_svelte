<script lang="ts">
	import { Card, Section, Tabs } from 'sappsui';
	const tabItems = [
		{ id: 'tab1', label: 'Tab 1', content: 'Content for Tab 1' },
		{ id: 'tab2', label: 'Tab 2', content: 'Content for Tab 2' },
		{ id: 'tab3', label: 'Tab 3', content: 'Content for Tab 3' }
	];
	const tabsScroll = [
		{ id: 'tab1', label: 'Tab 1', content: 'Content for Tab 1' },
		{ id: 'tab2', label: 'Tab 2', content: 'Content for Tab 2' },
		{ id: 'tab3', label: 'Tab 3', content: 'Content for Tab 3' },
		{ id: 'tab4', label: 'Tab 4', content: 'Content for Tab 4' },
		{ id: 'tab5', label: 'Tab 5', content: 'Content for Tab 5' },
		{ id: 'tab6', label: 'Tab 6', content: 'Content for Tab 6' },
		{ id: 'tab7', label: 'Tab 7', content: 'Content for Tab 7' },
		{ id: 'tab8', label: 'Tab 8', content: 'Content for Tab 8' },
		{ id: 'tab9', label: 'Tab 9', content: 'Content for Tab 9' },
		{ id: 'tab10', label: 'Tab 10', content: 'Content for Tab 10' }
	];
</script>

<Section contentClass="gap-4 p-4">
	<Card contentClass="wrap gap-4">
		<Tabs tabs={tabItems} />
		<Tabs tabs={tabItems} variant="underlined" />
		<Tabs tabs={tabItems} variant="outline" />
		<Tabs tabs={tabItems} variant="pill" />
		<Tabs tabs={tabItems} variant="ghost" />
	</Card>
	<Card contentClass="wrap gap-4">
		<Tabs tabs={tabItems} position="start" />
		<Tabs tabs={tabItems} variant="underlined" position="start" />
		<Tabs tabs={tabItems} variant="outline" position="start" />
		<Tabs tabs={tabItems} variant="pill" position="start" />
		<Tabs tabs={tabItems} variant="ghost" position="start" />
	</Card>
	<Card>
		<Tabs tabs={tabsScroll} />
	</Card>
</Section>
