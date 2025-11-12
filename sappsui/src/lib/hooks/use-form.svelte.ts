import { toast } from '$lib/stores/toast.svelte.js';
import { validateSchema } from '$lib/utils/validate-schema.js';

export type ValidationRuleType =
	| 'email'
	| 'required'
	| `min:${number}`
	| `max:${number}`
	| 'url'
	| 'phone'
	| `pattern:${string}`
	| 'alphanumeric'
	| 'numeric'
	| 'alpha'
	| `matches:${string}`
	| `custom:${string}`
	| 'strongPassword'
	| 'creditCard'
	| 'date'
	| `minWords:${number}`
	| `maxWords:${number}`;

export interface ValidationRule {
	rule: ValidationRuleType;
	message: string;
}

export interface ValidationRules {
	[field: string]: ValidationRule[];
}

export interface FormConfig {
	validationRules: ValidationRules;
	url: string;
	idKey?: string;
	method?: 'POST' | 'PUT' | 'PATCH' | 'DELETE';
	headers?: Record<string, string>;
	onError?: (errors: Record<string, string>) => void;
	onSuccess?: (response: any) => void;
	transformData?: (data: Record<string, any>) => any;
	showToast?: boolean;
	errorTitle?: string;
	errorDescription?: string;
	errorIcon?: string;
	successTitle?: string;
	successDescription?: string;
	successIcon?: string;
}

export const useForm = (config: FormConfig) => {
	let state = $state<HTMLFormElement>();
	let errors = $state<Record<string, string>>({});
	let isSubmitting = $state(false);

	const determineMethod = (data: Record<string, any>): string => {
		if (config.method) {
			return config.method;
		}
		if (config.idKey && data[config.idKey]) {
			return 'PUT';
		}
		return 'POST';
	};

	const handleSubmit = async (e: Event) => {
		e.preventDefault();

		const form = e.target as HTMLFormElement;
		const formData = new FormData(form);
		let data = Object.fromEntries(formData.entries()) as Record<string, any>;

		errors = validateSchema(data, config.validationRules);
		if (Object.keys(errors).length > 0) {
			config.onError?.(errors);
			return;
		}

		if (config.transformData) {
			data = config.transformData(data);
		}

		const method = determineMethod(data);

		let url = config.url;
		if ((method === 'PUT' || method === 'PATCH') && config.idKey && data[config.idKey]) {
			url = `${config.url}/${data[config.idKey]}`;
		}

		isSubmitting = true;

		try {
			const token = localStorage.getItem('token');

			if (token) {
				config.headers = {
					...config.headers,
					Authorization: `Bearer ${token}`
				};
			}

			const mergedHeaders = {
				'Content-Type': 'application/json',
				...config?.headers
			};

			const response = await fetch(url, {
				method,
				headers: mergedHeaders,
				body: JSON.stringify(data)
			});

			if (!response.ok) {
				const errorData = await response.json().catch(() => ({}));
				errors = errorData.errors || { general: 'An error occurred' };
				if (config.showToast) {
					toast.show({
						title: config.errorTitle || 'Error',
						description: config.errorDescription || 'An error occurred while submitting the form.',
						status: 'error',
						duration: 3000
					});
				}
				config.onError?.(errors);
				return;
			}

			const result = await response.json();
			if (config.showToast) {
				toast.show({
					title: config.successTitle || 'Success',
					description: config.successDescription || 'Form submitted successfully.',
					status: 'success',
					duration: 3000
				});
			}
			config.onSuccess?.(result);

			if (method === 'POST') {
				form.reset();
			}
		} catch (error) {
			errors = { general: 'Network error occurred' };
			if (config.showToast) {
				toast.show({
					title: config.errorTitle || 'Error',
					description: config.errorDescription || 'An error occurred while submitting the form.',
					status: 'error',
					duration: 3000
				});
			}
			config.onError?.(errors);
		} finally {
			isSubmitting = false;
		}
	};

	const handleInput = (e: Event) => {
		const input = e.target as HTMLInputElement;
		const fieldName = input.name;
		if (errors[fieldName]) {
			delete errors[fieldName];
		}
	};

	$effect(() => {
		state?.addEventListener('submit', handleSubmit);
		state?.addEventListener('input', handleInput);

		return () => {
			state?.removeEventListener('submit', handleSubmit);
			state?.removeEventListener('input', handleInput);
		};
	});

	return {
		get state(): HTMLFormElement {
			return state!;
		},
		set state(value: HTMLFormElement) {
			state = value;
		},
		get errors() {
			return errors;
		},
		get isSubmitting() {
			return isSubmitting;
		}
	};
};
