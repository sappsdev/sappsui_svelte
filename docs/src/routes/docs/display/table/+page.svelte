<script lang="ts">
	import { Card, Code, Section, Divider, Table, useTable, Button } from 'sappsui';

	const transformData = useTable({
		url: 'https://pokeapi.co/api/v2/pokemon',
		columns: [
			{ label: 'ID', field: 'id' },
			{ label: 'Name', field: 'name' },
			{ label: 'Email', field: 'email' },
			{
				label: 'Actions',
				field: 'actions',
				render: actions
			}
		],
		initialPageSize: 5,
		buildQueryParams: (options) => {
			return {
				limit: String(options.limit),
				offset: String(options.offset)
			};
		},
		transformData: (response, options) => {
			return {
				data: response.results,
				total: response.count,
				page: options.page || 1,
				pageSize: options.pageSize || 10,
				totalPages: Math.ceil(response.count / (options.pageSize || 10))
			};
		}
	});
</script>

{#snippet actions(row: any)}
	<Button onclick={() => console.log(row)} size="tiny" color="warning">Edit</Button>
{/snippet}

<Section contentClass="gap-4 p-3">
	<div class="prose">
		<h1>Table</h1>
		<p>Tables display sets of data.</p>
	</div>
	<Card contentClass="column gap-4">
		<div class="column">
			<h4>Preview</h4>
			<div class="column gap-4 p-4">
				<Table table={transformData} showPagination />
			</div>
		</div>
		<Divider />
		<div class="column gap-4 ml-4 w-56">
			<h4>Settings</h4>
		</div>

		{#snippet footer()}
			<Code
				lang="svelte"
				code={`<script lang="ts">
  import { Table, useTable } from 'sappsui';
  const transformData = useTable({
    url: 'https://jsonplaceholder.typicode.com/users',
	columns: [
		{ label: 'ID', field: 'id' },
		{ label: 'Name', field: 'name' },
		{ label: 'Email', field: 'email' },
		{
			label: 'Actions',
			field: 'actions',
			render: actions
		}
	],
	transformData: (response) => {
		const users = Array.isArray(response) ? response : [];

		return {
			data: users,
			total: users.length,
			page: 1,
			pageSize: users.length,
			totalPages: 1
		};
	}
  });
<\/script>
{#snippet actions(row: any)}
  <Button
	onclick={() => console.log(row)}
	size="tiny"
	color="warning"
  >
    Edit
  </Button>
{/snippet}
<Table table={transformData} showPagination />`}
			/>
		{/snippet}
	</Card>
</Section>
