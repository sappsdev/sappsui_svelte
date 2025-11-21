<script lang="ts">
	import StartUp from '$lib/shared/logos/StartUp.svelte';
	import { Card, Scaffold } from 'sappsui';
	let { children } = $props();
</script>

<Scaffold mainClass="center">
	<Card class="max-w-md w-full" headerClass="center" variant="ghost">
		{#snippet header()}
			<StartUp class="h-12 w-auto" />
		{/snippet}
		{@render children()}
	</Card>
</Scaffold>
