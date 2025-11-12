<script lang="ts">
	import { slide } from 'svelte/transition';

	import { toast } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';
	import { popover } from '$lib/utils/popover.js';

	type Props = {
		class?: string;
		position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
		variant?: 'solid' | 'soft';
	};

	const { class: className, position = 'bottom-left', variant = 'solid' }: Props = $props();

	const variants = {
		solid: 'toast-solid',
		soft: 'toast-soft'
	};

	const positions = {
		'top-left': 'toast-top-left',
		'top-right': 'toast-top-right',
		'bottom-left': 'toast-bottom-left',
		'bottom-right': 'toast-bottom-right'
	};

	const status = {
		info: 'toast-info',
		success: 'toast-success',
		warning: 'toast-warning',
		error: 'toast-error'
	};
</script>

{#if toast.messages.length > 0}
	<div use:popover transition:slide class={cn('toast-container', positions[position], className)}>
		{#each toast.messages as message, index (message.id)}
			<div
				transition:slide
				class={cn('toast', status[message.status], variants[variant])}
				style="--toast-index: {index}"
			>
				{#if message.icon}
					<div class="toast-icon">
						<span class="size-8"></span>
					</div>
				{/if}
				<div class="toast-content">
					{#if message.title}
						<div class="toast-title">{message.title}</div>
					{/if}
					<div class="toast-description">{message.description}</div>
				</div>
				<button class="toast-btn-close" onclick={() => toast.close(message.id)} aria-label="Close">
					×
				</button>
			</div>
		{/each}
	</div>
{/if}
