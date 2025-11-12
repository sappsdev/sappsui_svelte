<script lang="ts">
	import { Button, Card, Drawer, Modal, Section, Sidebar } from 'sappsui';
	let openModal = $state(false);
	let drawerStart = $state(false);
	let drawerEnd = $state(false);
	let drawerTop = $state(false);
	let drawerBottom = $state(false);
</script>

{#snippet drawerHorizontal()}
	<h1>Horizontal</h1>
{/snippet}
{#snippet drawerVertical()}
	<Card><h1>Vertical</h1></Card>
{/snippet}

<Section contentClass="column gap-4 p-4">
	<Card contentClass="wrap gap-4">
		<Button onclick={() => (openModal = !openModal)}>OpenModal</Button>
	</Card>
	<Card contentClass="wrap gap-4">
		<Button onclick={() => (drawerStart = !drawerStart)}>drawerStart</Button>
		<Button onclick={() => (drawerEnd = !drawerEnd)}>drawerEnd</Button>
		<Button onclick={() => (drawerTop = !drawerTop)}>drawerTop</Button>
		<Button onclick={() => (drawerBottom = !drawerBottom)}>drawerBottom</Button>
	</Card>
</Section>
<Modal open={openModal} onclose={() => (openModal = false)}>
	<h1>Modal Content</h1>
</Modal>
<Drawer bind:open={drawerStart} position="start" onclose={() => (drawerStart = false)}>
	{@render drawerHorizontal()}
</Drawer>
<Drawer bind:open={drawerEnd} position="end" onclose={() => (drawerEnd = false)}>
	{@render drawerHorizontal()}
</Drawer>
<Drawer bind:open={drawerTop} position="top" onclose={() => (drawerTop = false)}>
	{@render drawerVertical()}
</Drawer>
<Drawer bind:open={drawerBottom} position="bottom" onclose={() => (drawerBottom = false)}>
	{@render drawerVertical()}
</Drawer>
