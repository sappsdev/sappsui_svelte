<script lang="ts">
	import { Button, Card, Checkbox, Code, Section, Divider, Select, Table, useTable } from 'sappsui';

	const dataSourceOptions = [
		{ id: 'local', label: 'Local Data' },
		{ id: 'api', label: 'API Data' }
	];

	const tableSizeOptions = [
		{ id: 'small', label: 'Small' },
		{ id: 'medium', label: 'Medium' },
		{ id: 'large', label: 'Large' }
	];

	const paginationAlignOptions = [
		{ id: 'left', label: 'Left' },
		{ id: 'center', label: 'Center' },
		{ id: 'right', label: 'Right' }
	];

	const emptyTypeOptions = [
		{ id: 'data', label: 'Data' },
		{ id: 'result', label: 'Result' },
		{ id: 'playlist', label: 'Playlist' },
		{ id: 'template', label: 'Template' }
	];

	let selectedDataSource: any = $state('local');
	let selectedTableSize: any = $state('medium');
	let selectedPaginationAlign: any = $state('center');
	let selectedEmptyType: any = $state('data');

	let isStriped = $state(false);
	let isCondensed = $state(false);
	let isBordered = $state(false);
	let showDividers = $state(true);
	let showPagination = $state(true);

	// Local data example
	const localData = [
		{ id: 1, name: 'Tony Reichert', email: 'tony.reichert@example.com', role: 'CEO' },
		{ id: 2, name: 'Zoey Lang', email: 'zoey.lang@example.com', role: 'Technical Lead' },
		{ id: 3, name: 'Jane Fisher', email: 'jane.fisher@example.com', role: 'Senior Developer' },
		{
			id: 4,
			name: 'William Howard',
			email: 'william.howard@example.com',
			role: 'Community Manager'
		},
		{ id: 5, name: 'Kristen Cooper', email: 'kristen.cooper@example.com', role: 'Sales Manager' }
	];

	const localColumns = [
		{ label: 'ID', field: 'id', width: '80px' },
		{ label: 'Name', field: 'name' },
		{ label: 'Email', field: 'email' },
		{ label: 'Role', field: 'role' }
	];

	// API data example
	const apiColumns = [
		{ label: 'ID', field: 'id', width: '80px' },
		{ label: 'Name', field: 'name' },
		{ label: 'URL', field: 'url' }
	];

	const localTable = useTable({
		data: localData,
		columns: localColumns,
		initialPageSize: 3,
		clientSide: true
	});

	const apiTable = useTable({
		url: 'https://pokeapi.co/api/v2/pokemon',
		columns: apiColumns,
		initialPageSize: 5,
		buildQueryParams: (options) => {
			return {
				limit: String(options.limit),
				offset: String(options.offset)
			};
		},
		transformData: (response, options) => {
			return {
				data: response.results.map((item: any, index: number) => ({
					id: options.offset! + index + 1,
					name: item.name,
					url: item.url
				})),
				total: response.count,
				page: options.page || 1,
				pageSize: options.pageSize || 10,
				totalPages: Math.ceil(response.count / (options.pageSize || 10))
			};
		}
	});

	let activeTable = $derived(selectedDataSource === 'local' ? localTable : apiTable);

	let hasProps = $derived(
		[
			selectedTableSize !== 'medium',
			selectedPaginationAlign !== 'center',
			selectedEmptyType !== 'data',
			isStriped,
			isCondensed,
			isBordered,
			!showDividers,
			!showPagination
		].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Table } from 'sappsui';`,
			`\timport { useTable } from '$lib/hooks/use-table.svelte.js';`,
			``
		];

		if (selectedDataSource === 'local') {
			scriptLines.push(
				`\tconst data = [`,
				`\t\t{ id: 1, name: 'Tony Reichert', email: 'tony.reichert@example.com', role: 'CEO' },`,
				`\t\t{ id: 2, name: 'Zoey Lang', email: 'zoey.lang@example.com', role: 'Technical Lead' },`,
				`\t\t// ... more data`,
				`\t];`,
				``,
				`\tconst table = useTable({`,
				`\t\tdata,`,
				`\t\tcolumns: [`,
				`\t\t\t{ label: 'ID', field: 'id', width: '80px' },`,
				`\t\t\t{ label: 'Name', field: 'name' },`,
				`\t\t\t{ label: 'Email', field: 'email' },`,
				`\t\t\t{ label: 'Role', field: 'role' }`,
				`\t\t],`,
				`\t\tinitialPageSize: 10,`,
				`\t\tclientSide: true`,
				`\t});`
			);
		} else {
			scriptLines.push(
				`\tconst table = useTable({`,
				`\t\turl: 'https://api.example.com/data',`,
				`\t\tcolumns: [`,
				`\t\t\t{ label: 'ID', field: 'id', width: '80px' },`,
				`\t\t\t{ label: 'Name', field: 'name' },`,
				`\t\t\t{ label: 'Email', field: 'email' }`,
				`\t\t],`,
				`\t\tinitialPageSize: 10,`,
				`\t\tbuildQueryParams: (options) => ({`,
				`\t\t\tlimit: String(options.limit),`,
				`\t\t\toffset: String(options.offset)`,
				`\t\t}),`,
				`\t\ttransformData: (response, options) => ({`,
				`\t\t\tdata: response.results,`,
				`\t\t\ttotal: response.count,`,
				`\t\t\tpage: options.page || 1,`,
				`\t\t\tpageSize: options.pageSize || 10,`,
				`\t\t\ttotalPages: Math.ceil(response.count / (options.pageSize || 10))`,
				`\t\t})`,
				`\t});`
			);
		}

		scriptLines.push(`<\/script>`, ``);

		const componentLines = [
			hasProps ? `<Table` : `<Table {table} />`,
			hasProps && `\t{table}`,
			selectedTableSize !== 'medium' && `\ttableSize="${selectedTableSize}"`,
			selectedPaginationAlign !== 'center' && `\tpaginationAlign="${selectedPaginationAlign}"`,
			selectedEmptyType !== 'data' && `\tnoDataType="${selectedEmptyType}"`,
			isStriped && `\tstriped`,
			isCondensed && `\tcondensed`,
			isBordered && `\tbordered`,
			!showDividers && `\tshowDividers={false}`,
			!showPagination && `\tshowPagination={false}`,
			hasProps && `/>`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});
</script>

<Section>
	<div class="prose">
		<h1>Table</h1>
		<p>Tables display sets of data with pagination, sorting, and filtering capabilities.</p>
	</div>
</Section>

<Section>
	<Card>
		<div class="column lg:row w-full gap-3">
			<div class="column flex-1">
				<h4>Preview</h4>
				<div class="column gap-4 flex-1 p-4">
					<Table
						table={activeTable}
						tableSize={selectedTableSize}
						paginationAlign={selectedPaginationAlign}
						noDataType={selectedEmptyType}
						striped={isStriped}
						condensed={isCondensed}
						bordered={isBordered}
						{showDividers}
						{showPagination}
					/>
				</div>
			</div>
			<Divider class="invisible lg:visible" vertical />
			<Divider class="lg:hidden" />
			<div class="column gap-3 min-w-64">
				<h4>Builder</h4>

				<Select
					label="Data Source"
					name="dataSource"
					size="sm"
					options={dataSourceOptions}
					bind:value={selectedDataSource}
				/>

				<Select
					label="Table Size"
					name="tableSize"
					size="sm"
					options={tableSizeOptions}
					bind:value={selectedTableSize}
				/>

				<Select
					label="Pagination Align"
					name="paginationAlign"
					size="sm"
					options={paginationAlignOptions}
					bind:value={selectedPaginationAlign}
				/>

				<Select
					label="Empty Type"
					name="emptyType"
					size="sm"
					options={emptyTypeOptions}
					bind:value={selectedEmptyType}
				/>

				<div class="flex flex-col gap-2">
					<h6>Variants</h6>
					<div class="grid grid-cols-2 gap-2">
						<Checkbox bind:checked={isStriped} name="striped" label="Striped" />
						<Checkbox bind:checked={isCondensed} name="condensed" label="Condensed" />
						<Checkbox bind:checked={isBordered} name="bordered" label="Bordered" />
						<Checkbox bind:checked={showDividers} name="showDividers" label="Show Dividers" />
					</div>
				</div>

				<div class="flex flex-col gap-2">
					<h6>Features</h6>
					<Checkbox bind:checked={showPagination} name="showPagination" label="Show Pagination" />
				</div>
			</div>
		</div>
	</Card>
</Section>

<Section>
	<Code lang="svelte" code={code()} />
</Section>

<Section>
	<div class="prose">
		<h3>useTable Hook</h3>
		<p>The <code>useTable</code> hook provides table state management and data fetching.</p>

		<h4>Configuration</h4>
		<ul>
			<li>
				<code>data</code> - Array of data for client-side mode
			</li>
			<li>
				<code>url</code> - API endpoint for server-side mode
			</li>
			<li>
				<code>columns</code> - Array of column definitions (required)
			</li>
			<li>
				<code>initialPage</code> - Starting page number (default: 1)
			</li>
			<li>
				<code>initialPageSize</code> - Items per page (default: 10)
			</li>
			<li>
				<code>initialSortBy</code> - Initial sort column
			</li>
			<li>
				<code>initialSortOrder</code> - Initial sort order: 'ASC' or 'DESC'
			</li>
			<li>
				<code>clientSide</code> - Enable client-side processing
			</li>
			<li>
				<code>buildQueryParams</code> - Custom query parameter builder
			</li>
			<li>
				<code>transformData</code> - Transform API response to table format
			</li>
			<li>
				<code>headers</code> - Custom HTTP headers
			</li>
			<li>
				<code>debounceSearch</code> - Search debounce delay in ms
			</li>
			<li>
				<code>onSuccess</code> - Success callback
			</li>
			<li>
				<code>onError</code> - Error callback
			</li>
		</ul>

		<h4>Column Definition</h4>
		<ul>
			<li>
				<code>label</code> - Column header text (required)
			</li>
			<li>
				<code>field</code> - Data property key (required)
			</li>
			<li>
				<code>sortable</code> - Enable sorting for this column
			</li>
			<li>
				<code>width</code> - Column width (e.g., '100px', '20%')
			</li>
			<li>
				<code>align</code> - Text alignment: 'left', 'center', or 'right'
			</li>
			<li>
				<code>render</code> - Custom render snippet for cell content
			</li>
		</ul>

		<h3>Table Component Props</h3>
		<ul>
			<li>
				<code>table</code> - Table state from useTable hook (required)
			</li>
			<li>
				<code>tableSize</code> - Size variant: 'small', 'medium', or 'large'
			</li>
			<li>
				<code>striped</code> - Alternate row colors
			</li>
			<li>
				<code>condensed</code> - Compact padding
			</li>
			<li>
				<code>bordered</code> - Add borders around table and cells
			</li>
			<li>
				<code>showDividers</code> - Show row dividers (default: true)
			</li>
			<li>
				<code>showPagination</code> - Display pagination controls
			</li>
			<li>
				<code>paginationAlign</code> - Pagination alignment: 'left', 'center', or 'right'
			</li>
			<li>
				<code>noDataTitle</code> - Empty state title (default: 'No data')
			</li>
			<li>
				<code>noDataDescription</code> - Empty state description
			</li>
			<li>
				<code>noDataType</code> - Empty state icon type: 'data', 'result', 'playlist', or 'template'
			</li>
			<li>
				<code>loadingRows</code> - Number of skeleton rows during loading (default: 5)
			</li>
		</ul>

		<h3>Examples</h3>

		<h4>Client-Side Table</h4>
		<p>For local data with client-side sorting, filtering, and pagination:</p>

		<Code
			lang="svelte"
			code={`<script lang="ts">
	import { Table } from 'sappsui';
	import { useTable } from '$lib/hooks/use-table.svelte.js';

	const data = [
		{ id: 1, name: 'John Doe', email: 'john@example.com' },
		{ id: 2, name: 'Jane Smith', email: 'jane@example.com' },
	];

	const table = useTable({
		data,
		columns: [
			{ label: 'ID', field: 'id', width: '80px' },
			{ label: 'Name', field: 'name' },
			{ label: 'Email', field: 'email' }
		],
		initialPageSize: 10,
		clientSide: true
	});
<\/script>

<Table {table} striped showPagination />`}
		/>

		<h4>Server-Side Table</h4>
		<p>For API data with server-side processing:</p>

		<Code
			lang="svelte"
			code={`<script lang="ts">
	import { Table } from 'sappsui';
	import { useTable } from '$lib/hooks/use-table.svelte.js';

	const table = useTable({
		url: 'https://api.example.com/users',
		columns: [
			{ label: 'ID', field: 'id', width: '80px' },
			{ label: 'Name', field: 'name' },
			{ label: 'Email', field: 'email' }
		],
		initialPageSize: 10,
		buildQueryParams: (options) => ({
			limit: String(options.limit),
			offset: String(options.offset),
			sort: options.sortBy,
			order: options.sortOrder
		}),
		transformData: (response, options) => ({
			data: response.items,
			total: response.total,
			page: options.page || 1,
			pageSize: options.pageSize || 10,
			totalPages: Math.ceil(response.total / (options.pageSize || 10))
		})
	});
<\/script>

<Table {table} showPagination />`}
		/>

		<h4>Custom Cell Rendering</h4>
		<p>Use snippets for custom cell content:</p>

		<Code
			lang="svelte"
			code={`<script lang="ts">
	import { Table, Button } from 'sappsui';
	import { useTable } from '$lib/hooks/use-table.svelte.js';

	const table = useTable({
		data: users,
		columns: [
			{ label: 'Name', field: 'name' },
			{ label: 'Email', field: 'email' },
			{
				label: 'Actions',
				field: 'actions',
				align: 'right',
				render: actionsSnippet
			}
		],
		clientSide: true
	});
<\/script>

{#snippet actionsSnippet(user)}
	<div class="flex gap-2 justify-end">
		<Button
			label="Edit"
			size="sm"
			variant="soft"
			onclick={() => editUser(user.id)}
		/>
		<Button
			label="Delete"
			size="sm"
			variant="soft"
			color="error"
			onclick={() => deleteUser(user.id)}
		/>
	</div>
{/snippet}

<Table {table} />`}
		/>
	</div>
</Section>
