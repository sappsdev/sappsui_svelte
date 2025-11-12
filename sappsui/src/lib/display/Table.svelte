<script lang="ts" generics="T">
	import type { TableState } from '$lib/hooks/use-table.svelte.js';
	import { cn } from '$lib/utils/class-names.js';

	type Props = {
		table: TableState<T>;
		striped?: boolean;
		noDataMessage?: string;
		tableSize?: 'small' | 'medium' | 'large';
		showPagination?: boolean;
		paginationAlign?: 'left' | 'center' | 'right';
	};

	const {
		table,
		striped = false,
		noDataMessage = 'No data available',
		tableSize = 'medium',
		showPagination,
		paginationAlign = 'center'
	}: Props = $props();

	const getPageNumbers = (current: number, total: number): (number | string)[] => {
		const pages: (number | string)[] = [];
		const delta = 1;

		if (total <= 7) {
			for (let i = 1; i <= total; i++) {
				pages.push(i);
			}
		} else {
			pages.push(1);
			const start = Math.max(2, current - delta);
			const end = Math.min(total - 1, current + delta);

			if (start > 2) {
				pages.push('...');
			}
			for (let i = start; i <= end; i++) {
				pages.push(i);
			}

			if (end < total - 1) {
				pages.push('...');
			}
			pages.push(total);
		}
		return pages;
	};

	const pageNumbers = $derived(
		showPagination && table.page && table.totalPages
			? getPageNumbers(table.page, table.totalPages)
			: []
	);
</script>

<div class="table-wrapper">
	<div class="table-container">
		<table class={cn('table', striped && 'table-striped', tableSize && `table-${tableSize}`)}>
			<thead class="table-header">
				<tr>
					{#each table.columns as column}
						<th
							style="width: {column.width}; text-align: {column.align || 'left'}"
							class:sortable={column.sortable}
							class="table-head"
						>
							{column.label}
						</th>
					{/each}
				</tr>
			</thead>
			<tbody class="table-body">
				{#if table.data.length === 0}
					<tr>
						<td colspan={table.columns.length}>
							{noDataMessage}
						</td>
					</tr>
				{:else}
					{#each table.data as item, index}
						<tr>
							{#each table.columns as column}
								<td style="text-align: {column.align || 'left'}">
									{#if column.render}
										{@render column.render(item)}
									{:else}
										{item[column.field as keyof T]}
									{/if}
								</td>
							{/each}
						</tr>
					{/each}
				{/if}
			</tbody>
		</table>
	</div>
	{#if showPagination && table.totalPages && table.totalPages > 1}
		<div
			class="pagination-container"
			style="justify-content: {paginationAlign === 'left'
				? 'flex-start'
				: paginationAlign === 'right'
					? 'flex-end'
					: 'center'}"
		>
			<div class="pagination">
				<button
					class="pagination-btn"
					onclick={() => table.prevPage?.()}
					disabled={!table.hasPrevPage}
					aria-label="Previous page"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<polyline points="15 18 9 12 15 6"></polyline>
					</svg>
				</button>

				{#each pageNumbers as pageNum}
					{#if pageNum === '...'}
						<span class="pagination-ellipsis">...</span>
					{:else}
						<button
							class="pagination-btn"
							class:active={pageNum === table.page}
							onclick={() => table.goToPage?.(pageNum as number)}
							aria-label="Page {pageNum}"
							aria-current={pageNum === table.page ? 'page' : undefined}
						>
							{pageNum}
						</button>
					{/if}
				{/each}

				<button
					class="pagination-btn"
					onclick={() => table.nextPage?.()}
					disabled={!table.hasNextPage}
					aria-label="Next page"
				>
					<svg
						xmlns="http://www.w3.org/2000/svg"
						width="16"
						height="16"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					>
						<polyline points="9 18 15 12 9 6"></polyline>
					</svg>
				</button>
			</div>
		</div>
	{/if}
</div>
