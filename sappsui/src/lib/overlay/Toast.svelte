<script lang="ts">
	import { slide } from 'svelte/transition';

	import { Icon, IconButton, toast } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';
	import { popover } from '$lib/utils/popover.js';
	import type { IconName } from '$lib/assets/icons/index.js';

	type Props = {
		class?: string;
		position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
		showIcon?: boolean;
		solid?: boolean;
	};

	const { class: className, position = 'bottom-left', solid, showIcon }: Props = $props();

	const positionClasses = {
		'top-left': 'is-top-left',
		'top-right': 'is-top-right',
		'bottom-left': 'is-bottom-left',
		'bottom-right': 'is-bottom-right'
	};

	const status = {
		info: 'is-info',
		success: 'is-success',
		warning: 'is-warning',
		danger: 'is-danger'
	};

	const icons = {
		info: 'fluent:error-circle-24-regular',
		success: 'fluent:checkmark-circle-24-regular',
		warning: 'fluent:warning-24-regular',
		danger: 'fluent:block-24-regular'
	};
</script>

{#if toast.messages.length > 0}
	<div
		use:popover
		transition:slide
		class={cn('toast-container', positionClasses[position], className)}
	>
		{#each toast.messages as message, index (message.id)}
			<div
				transition:slide
				class={cn('toast', status[message.status], (message.solid || solid) && 'is-solid')}
				style="--toast-index: {index}"
			>
				{#if showIcon}
					<Icon
						name={message.icon ? message.icon : (icons[message.status] as IconName)}
						class="toast-icon"
					/>
				{/if}
				<div class="toast-content">
					{#if message.title}
						<div class="toast-title">{message.title}</div>
					{/if}
					<div class="toast-description">{message.description}</div>
				</div>
				<div class="btn-close">
					<button onclick={() => toast.close(message.id)}>
						<Icon name="fluent:dismiss-24-regular" class="btn-close-icon" />
					</button>
				</div>
			</div>
		{/each}
	</div>
{/if}
