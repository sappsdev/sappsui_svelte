<script lang="ts">
	import Color from '$lib/components/utils/Color.svelte';
	import { Button, Card, Modal, Section } from 'sappsui';

	const themeColors = [
		{ bg: 'bg-primary', text: 'text-on-primary', label: 'Primary' },
		{ bg: 'bg-secondary', text: 'text-on-secondary', label: 'Secondary' },
		{ bg: 'bg-muted', text: 'text-on-muted', label: 'Muted' },
		{ bg: 'bg-success', text: 'text-on-success', label: 'Success' },
		{ bg: 'bg-info', text: 'text-on-info', label: 'Info' },
		{ bg: 'bg-warning', text: 'text-on-warning', label: 'Warning' },
		{ bg: 'bg-danger', text: 'text-on-danger', label: 'Danger' },
		{ bg: 'bg-surface', text: 'text-on-surface', label: 'Surface' }
	];

	let openColor = $state(false);
</script>

<Section>
	<Card>
		<div class="grid grid-cols-4 gap-4 p-4">
			{#each themeColors as color}
				<div class={`size-32 ${color.bg} ${color.text} rounded-ui row center`}>{color.label}</div>
			{/each}
		</div>
		<Button onclick={() => (openColor = true)}>open</Button>
	</Card>
</Section>

<Modal bind:open={openColor}>
	<Color />
</Modal>
