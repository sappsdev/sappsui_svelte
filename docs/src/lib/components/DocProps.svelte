<script lang="ts">
	import { Section, Badge, Chip } from 'sappsui';

	type Prop = {
		prop: string;
		type: string;
		initial: string;
		required?: boolean;
	};
	type Props = {
		props: Prop[];
	};
	let { props }: Props = $props();
</script>

<Section>
	<div class="prose">
		<h4>The component accepts the following props:</h4>
		<table>
			<thead>
				<tr>
					<th>Prop</th>
					<th>Type</th>
					<th>Default</th>
				</tr>
			</thead>
			<tbody>
				{#each props as { prop, type, initial, required }}
					<tr>
						<td>
							<code>{prop}</code>
						</td>
						<td>
							<div class="flex items-center gap-3">
								<code> {type} </code>
								{#if required}
									<Chip label="required" variant="danger" />
								{/if}
							</div>
						</td>
						<td>{initial || '—'}</td>
					</tr>
				{/each}
			</tbody>
		</table>
	</div>
</Section>
