import type { Snippet } from 'svelte';

export interface SearchOption<T> {
	label: string;
	value: string | number;
	data?: T;
	disabled?: boolean;
	render?: Snippet<[T]>;
}

export interface SearchState<T> {
	options: SearchOption<T>[];
	isLoading: boolean;
	error: any;
	search: string;
	selectedValue: string | number | null;
	selectedOption: SearchOption<T> | null;
	setSearch: (query: string) => void;
	setSelectedValue: (value: string | number | null) => void;
	refresh: () => void;
	reset: () => void;
	setOptions: (newOptions: SearchOption<T>[]) => void;
}

export interface SearchResponse<T> {
	options: SearchOption<T>[];
	total?: number;
}

export interface SearchConfig<T> {
	url?: string;
	options?: SearchOption<T>[];
	initialSearch?: string;
	initialValue?: string | number | null;
	headers?: Record<string, string>;
	transformData?: (data: any, search: string) => SearchResponse<T>;
	onError?: (error: any) => void;
	onSuccess?: (response: SearchResponse<T>) => void;
	debounceSearch?: number;
	clientSide?: boolean;
	minSearchLength?: number;
	buildQueryParams?: (search: string) => Record<string, string>;
	labelField?: keyof T;
	valueField?: keyof T;
}

export const useSearch = <T>(config: SearchConfig<T>): SearchState<T> => {
	const isManualMode = !config.url || config.clientSide;

	let allOptions = $state<SearchOption<T>[]>(config.options ?? []);
	let options = $state<SearchOption<T>[]>([]);
	let search = $state(config.initialSearch ?? '');
	let selectedValue = $state<string | number | null>(config.initialValue ?? null);
	let isLoading = $state(false);
	let error = $state<any>(null);

	let debounceTimeout: number | undefined;

	const buildUrl = (): string => {
		if (!config.url) return '';

		const params = new URLSearchParams();

		if (config.buildQueryParams) {
			const customParams = config.buildQueryParams(search);

			Object.entries(customParams).forEach(([key, value]) => {
				if (value !== undefined && value !== null && value !== '') {
					params.append(key, value);
				}
			});
		} else {
			if (search) params.append('search', search);
		}

		return `${config.url}?${params.toString()}`;
	};

	const processClientSideData = () => {
		let processedOptions = [...allOptions];

		if (search) {
			const lowerSearch = search.toLowerCase();
			processedOptions = processedOptions.filter((option) => {
				return (
					option.label.toLowerCase().includes(lowerSearch) ||
					String(option.value).toLowerCase().includes(lowerSearch)
				);
			});
		}

		options = processedOptions;
	};

	const fetchData = async () => {
		if (isManualMode) {
			processClientSideData();
			return;
		}

		// Si hay un minSearchLength configurado, no buscar hasta alcanzarlo
		if (config.minSearchLength && search.length < config.minSearchLength) {
			options = [];
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

			const searchResponse = config.transformData ? config.transformData(result, search) : result;

			options = searchResponse.options;

			config.onSuccess?.(searchResponse);
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
			search;
			allOptions;

			processClientSideData();
		} else {
			search;

			debouncedFetch();
		}

		return () => {
			clearTimeout(debounceTimeout);
		};
	});

	const setSearch = (query: string) => {
		search = query;
	};

	const setSelectedValue = (value: string | number | null) => {
		selectedValue = value;
	};

	const setOptions = (newOptions: SearchOption<T>[]) => {
		allOptions = newOptions;
	};

	const refresh = () => {
		if (isManualMode) {
			processClientSideData();
		} else {
			fetchData();
		}
	};

	const reset = () => {
		search = config.initialSearch ?? '';
		selectedValue = config.initialValue ?? null;
		if (isManualMode) {
			processClientSideData();
		}
	};

	return {
		get options(): SearchOption<T>[] {
			return options;
		},
		get search() {
			return search;
		},
		get selectedValue() {
			return selectedValue;
		},
		get selectedOption(): SearchOption<T> | null {
			return options.find((opt) => opt.value === selectedValue) ?? null;
		},
		get isLoading() {
			return isLoading;
		},
		get error() {
			return error;
		},
		setSearch,
		setSelectedValue,
		refresh,
		reset,
		setOptions
	};
};
