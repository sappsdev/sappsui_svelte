<script lang="ts">
	import { Card, Divider, Section } from 'sappsui';
	import type { Snippet } from 'svelte';
	type Props = {
		preview: Snippet;
		builder: Snippet;
	};
	let { preview, builder }: Props = $props();
</script>

<Section>
	<Card variant="outline">
		<div class="column lg:row w-full gap-3">
			<div class="column flex-1">
				<h4>Preview</h4>
				<div class="column center gap-4 flex-1 p-4">
					{@render preview()}
				</div>
			</div>
			<Divider class="invisible lg:visible" vertical />
			<Divider class="lg:hidden" />
			<div class="column gap-3 lg:w-64">
				<h4>Builder</h4>

				{@render builder()}
			</div>
		</div>
	</Card>
</Section>
