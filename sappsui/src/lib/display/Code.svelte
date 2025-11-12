<script lang="ts">
	import { codeToHtml } from 'shiki';
	import Icon from '@iconify/svelte';
	import { useClipboard } from '$lib/hooks/use-clipboard.svelte.js';
	import { IconButton } from '$lib/index.js';

	type Props = {
		code: string;
		lang?: string;
		theme?: string;
	};

	let { code, lang = 'html', theme = 'catppuccin-frappe' }: Props = $props();

	let html: string = $state('');
	let open = $state(false);

	const generateCode = async (value: string) => {
		html = await codeToHtml(value, {
			lang,
			theme
		});
		open = true;
	};

	$effect(() => {
		generateCode(code);
	});

	const clipboard = useClipboard();

	const handleCopy = () => {
		clipboard.copy(code);
	};
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div class="code">
	{#if open}
		<div class="code-info">
			<div class="chip chip-solid chip-small chip-primary">{lang}</div>
			<IconButton
				onclick={handleCopy}
				icon={clipboard.copied ? 'fluent:checkmark-24-regular' : 'fluent:copy-24-regular'}
				size="tiny"
			/>
		</div>

		<div class="code-content">
			{@html html}
		</div>
	{/if}
</div>
