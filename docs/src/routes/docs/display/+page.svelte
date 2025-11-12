<script lang="ts">
	import { PUBLIC_BASE_URL } from '$env/static/public';
	import { Button, Card, Section, Table, useTable } from 'sappsui';

	const tableData = useTable({
		url: `${PUBLIC_BASE_URL}/users/paginated`,
		columns: [
			{ label: 'ID', field: 'id' },
			{ label: 'Name', field: 'name' },
			{ label: 'Email', field: 'email' },
			{
				label: 'Actions',
				field: 'actions',
				render: actions
			}
		]
	});

	const localData = useTable({
		data: [
			{ id: 1, name: 'Juan', email: 'juan@example.com' },
			{ id: 2, name: 'María', email: 'maria@example.com' },
			{ id: 3, name: 'Carlos', email: 'carlos@example.com' },
			{ id: 4, name: 'Ana', email: 'ana@example.com' },
			{ id: 5, name: 'Luis', email: 'luis@example.com' },
			{ id: 6, name: 'Carmen', email: 'carmen@example.com' },
			{ id: 7, name: 'Pedro', email: 'pedro@example.com' },
			{ id: 8, name: 'Laura', email: 'laura@example.com' },
			{ id: 9, name: 'Miguel', email: 'miguel@example.com' },
			{ id: 10, name: 'Sofia', email: 'sofia@example.com' },
			{ id: 11, name: 'Diego', email: 'diego@example.com' },
			{ id: 12, name: 'Valentina', email: 'valentina@example.com' },
			{ id: 13, name: 'Andrés', email: 'andres@example.com' },
			{ id: 14, name: 'Camila', email: 'camila@example.com' },
			{ id: 15, name: 'Jorge', email: 'jorge@example.com' },
			{ id: 16, name: 'Isabella', email: 'isabella@example.com' },
			{ id: 17, name: 'Ricardo', email: 'ricardo@example.com' },
			{ id: 18, name: 'Daniela', email: 'daniela@example.com' },
			{ id: 19, name: 'Fernando', email: 'fernando@example.com' },
			{ id: 20, name: 'Gabriela', email: 'gabriela@example.com' },
			{ id: 21, name: 'Roberto', email: 'roberto@example.com' },
			{ id: 22, name: 'Natalia', email: 'natalia@example.com' },
			{ id: 23, name: 'Javier', email: 'javier@example.com' },
			{ id: 24, name: 'Paula', email: 'paula@example.com' },
			{ id: 25, name: 'Sergio', email: 'sergio@example.com' },
			{ id: 26, name: 'Andrea', email: 'andrea@example.com' },
			{ id: 27, name: 'Martín', email: 'martin@example.com' },
			{ id: 28, name: 'Lucía', email: 'lucia@example.com' },
			{ id: 29, name: 'Raúl', email: 'raul@example.com' },
			{ id: 30, name: 'Victoria', email: 'victoria@example.com' }
		],
		columns: [
			{ label: 'ID', field: 'id' },
			{ label: 'Name', field: 'name' },
			{ label: 'Email', field: 'email' }
		]
	});

	const transformData = useTable({
		url: 'https://jsonplaceholder.typicode.com/users',
		columns: [
			{ label: 'ID', field: 'id' },
			{ label: 'Name', field: 'name' },
			{ label: 'Email', field: 'email' },
			{
				label: 'Actions',
				field: 'actions'
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
</script>

{#snippet actions(row: any)}
	<div class="row">
		<Button onclick={() => console.log(row)} size="small">Edit</Button>
	</div>
{/snippet}

<Section contentClass="gap-4 p-4">
	<Card>
		<Table table={tableData} showPagination />
	</Card>
	<Card>
		<Table table={localData} showPagination />
	</Card>
	<Card>
		<Table table={transformData} showPagination />
	</Card>
</Section>
