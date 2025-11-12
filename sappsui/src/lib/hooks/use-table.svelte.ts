import type { Snippet } from 'svelte';

interface Column<T> {
	label: string;
	field: keyof T | string;
	sortable?: boolean;
	width?: string;
	align?: 'left' | 'center' | 'right';
	render?: Snippet<[T]>;
}

export interface TableState<T> {
	data: T[];
	isLoading: boolean;
	error: any;
	sortBy?: string;
	sortOrder: 'ASC' | 'DESC';
	setSort: (column: string, order?: 'ASC' | 'DESC') => void;
	page?: number;
	totalPages?: number;
	total?: number;
	hasNextPage?: boolean;
	hasPrevPage?: boolean;
	nextPage?: () => void;
	prevPage?: () => void;
	goToPage?: (page: number) => void;
	columns: Column<T>[];
	setPage: (newPage: number) => void;
	setPageSize: (newPageSize: number) => void;
	setSearch: (query: string) => void;
	refresh: () => void;
	reset: () => void;
	pageSize: number;
	search: string;
	setData: (newData: T[]) => void;
}

export type PaginationOptions = {
	page?: number;
	pageSize?: number;
	sortBy?: string;
	sortOrder?: 'ASC' | 'DESC';
	search?: string;
	offset?: number;
	limit?: number;
};

export interface PaginatedResponse<T> {
	data: T[];
	total: number;
	page: number;
	pageSize: number;
	totalPages: number;
}

export interface TableConfig<T> {
	url?: string;
	data?: T[];
	columns: Column<T>[];
	initialPage?: number;
	initialPageSize?: number;
	initialSortBy?: string;
	initialSortOrder?: 'ASC' | 'DESC';
	initialSearch?: string;
	headers?: Record<string, string>;
	transformData?: (data: any, options: PaginationOptions) => PaginatedResponse<T>;
	onError?: (error: any) => void;
	onSuccess?: (response: PaginatedResponse<T>) => void;
	debounceSearch?: number;
	clientSide?: boolean;
	buildQueryParams?: (options: PaginationOptions) => Record<string, string>;
}

export const useTable = <T>(config: TableConfig<T>): TableState<T> => {
	const isManualMode = !config.url || config.clientSide;

	let allData = $state<T[]>(config.data ?? []);
	let data = $state<T[]>([]);
	let total = $state(0);
	let page = $state(config.initialPage ?? 1);
	let pageSize = $state(config.initialPageSize ?? 10);
	let sortBy = $state(config.initialSortBy);
	let sortOrder = $state<'ASC' | 'DESC'>(config.initialSortOrder ?? 'ASC');
	let search = $state(config.initialSearch ?? '');
	let isLoading = $state(false);
	let error = $state<any>(null);
	const totalPages = $state(0);

	let debounceTimeout: number | undefined;

	const buildUrl = (): string => {
		if (!config.url) return '';

		const params = new URLSearchParams();

		if (config.buildQueryParams) {
			const paginationOptions: PaginationOptions = {
				page,
				pageSize,
				sortBy,
				sortOrder,
				search,
				offset: (page - 1) * pageSize,
				limit: pageSize
			};

			const customParams = config.buildQueryParams(paginationOptions);

			Object.entries(customParams).forEach(([key, value]) => {
				if (value !== undefined && value !== null && value !== '') {
					params.append(key, value);
				}
			});
		} else {
			if (page) params.append('page', page.toString());
			if (pageSize) params.append('pageSize', pageSize.toString());
			if (sortBy) params.append('sortBy', sortBy);
			if (sortOrder) params.append('sortOrder', sortOrder);
			if (search) params.append('search', search);
		}

		return `${config.url}?${params.toString()}`;
	};

	const processClientSideData = () => {
		let processedData = [...allData];

		if (search) {
			processedData = processedData.filter((item) => {
				return config.columns.some((column) => {
					const value = item[column.field as keyof T];
					return String(value).toLowerCase().includes(search.toLowerCase());
				});
			});
		}

		if (sortBy) {
			processedData.sort((a, b) => {
				const aVal = a[sortBy as keyof T];
				const bVal = b[sortBy as keyof T];

				if (aVal === bVal) return 0;

				const comparison = aVal > bVal ? 1 : -1;
				return sortOrder === 'ASC' ? comparison : -comparison;
			});
		}

		total = processedData.length;

		const startIndex = (page - 1) * pageSize;
		const endIndex = startIndex + pageSize;
		data = processedData.slice(startIndex, endIndex);
	};

	const fetchData = async () => {
		if (isManualMode) {
			processClientSideData();
			return;
		}

		isLoading = true;
		error = null;

		try {
			const response = await fetch(buildUrl(), {
				method: 'GET',
				headers: {
					'Content-Type': 'application/json',
					...config.headers
				}
			});

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const result = await response.json();

			const paginationOptions: PaginationOptions = {
				page,
				pageSize,
				sortBy,
				sortOrder,
				search,
				offset: (page - 1) * pageSize,
				limit: pageSize
			};

			const paginatedData = config.transformData
				? config.transformData(result, paginationOptions)
				: result;

			data = paginatedData.data;
			total = paginatedData.total;

			if (paginatedData.page !== undefined) page = paginatedData.page;
			if (paginatedData.pageSize !== undefined) pageSize = paginatedData.pageSize;

			config.onSuccess?.(paginatedData);
		} catch (err) {
			error = err;
			config.onError?.(err);
		} finally {
			isLoading = false;
		}
	};

	const debouncedFetch = () => {
		if (config.debounceSearch && config.debounceSearch > 0) {
			clearTimeout(debounceTimeout);
			debounceTimeout = setTimeout(() => {
				fetchData();
			}, config.debounceSearch) as unknown as number;
		} else {
			fetchData();
		}
	};

	$effect(() => {
		if (isManualMode) {
			page;
			pageSize;
			sortBy;
			sortOrder;
			search;
			allData;

			processClientSideData();
		} else {
			page;
			pageSize;
			sortBy;
			sortOrder;
			search;

			debouncedFetch();
		}

		return () => {
			clearTimeout(debounceTimeout);
		};
	});

	const setPage = (newPage: number) => {
		page = newPage;
	};

	const setPageSize = (newPageSize: number) => {
		pageSize = newPageSize;
		page = 1;
	};

	const setSort = (column: string, order?: 'ASC' | 'DESC') => {
		sortBy = column;
		sortOrder = order ?? (sortBy === column && sortOrder === 'ASC' ? 'DESC' : 'ASC');
	};

	const setSearch = (query: string) => {
		search = query;
		page = 1;
	};

	const setData = (newData: T[]) => {
		allData = newData;
		page = 1;
	};

	const refresh = () => {
		if (isManualMode) {
			processClientSideData();
		} else {
			fetchData();
		}
	};

	const reset = () => {
		page = config.initialPage ?? 1;
		pageSize = config.initialPageSize ?? 10;
		sortBy = config.initialSortBy;
		sortOrder = config.initialSortOrder ?? 'ASC';
		search = config.initialSearch ?? '';
	};

	const nextPage = () => {
		if (page < Math.ceil(total / pageSize)) {
			page++;
		}
	};

	const prevPage = () => {
		if (page > 1) {
			page--;
		}
	};

	const goToPage = (targetPage: number) => {
		const maxPages = Math.ceil(total / pageSize);
		if (targetPage >= 1 && targetPage <= maxPages) {
			page = targetPage;
		}
	};

	return {
		get data(): T[] {
			return data;
		},
		get total() {
			return total;
		},
		get page() {
			return page;
		},
		get pageSize() {
			return pageSize;
		},
		get sortBy() {
			return sortBy;
		},
		get sortOrder() {
			return sortOrder;
		},
		get search() {
			return search;
		},
		get isLoading() {
			return isLoading;
		},
		get error() {
			return error;
		},
		get totalPages() {
			return Math.ceil(total / pageSize);
		},
		get hasNextPage() {
			return page < Math.ceil(total / pageSize);
		},
		get hasPrevPage() {
			return page > 1;
		},
		get columns(): Column<T>[] {
			return config.columns;
		},
		setPage,
		setPageSize,
		setSort,
		setSearch,
		refresh,
		reset,
		nextPage,
		prevPage,
		goToPage,
		setData
	};
};
