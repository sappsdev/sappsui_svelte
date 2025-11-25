<script lang="ts">
	import { Card, Divider, Section } from 'sappsui';
	import type { Snippet } from 'svelte';
	type Props = {
		children: Snippet;
		builder?: Snippet;
	};
	let { children, builder }: Props = $props();
</script>

<Section>
	<Card>
		<div class="column lg:row w-full gap-3">
			<div class="column flex-1">
				<h4>Preview</h4>
				<div class="column center gap-4 flex-1 p-4">
					{@render children()}
				</div>
			</div>
			{#if builder}
				<Divider class="invisible lg:visible" vertical />
				<Divider class="lg:hidden" />
				<div class="column gap-3 lg:w-64">
					<h4>Builder</h4>

					{@render builder()}
				</div>
			{/if}
		</div>
	</Card>
</Section>
