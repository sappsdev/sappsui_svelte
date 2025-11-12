<script lang="ts" generics="T, C">
	import { page } from '$app/state';
	import { Icon } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';
	import type { Snippet } from 'svelte';
	import { slide } from 'svelte/transition';

	interface SubItem<C> {
		label: string;
		icon?: string;
		description?: string;
		href: string;
		button?: boolean;
		external?: boolean;
		status?: string | Snippet;
		onclick?: (item: SubItem<C>) => void;
	}

	interface Item<T> {
		type?: 'item' | 'divider' | 'header' | 'submenu';
		label?: string;
		description?: string;
		icon?: string;
		href?: string;
		external?: boolean;
		onclick?: (item: Item<T>) => void;
		status?: string | Snippet;
		subitems?: SubItem<C>[];
		open?: boolean;
	}

	type Props = {
		items: Item<T>[];
		color?: 'primary' | 'secondary' | 'accent';
		class?: string;
		itemClass?: string;
	};

	const { items = [], class: className, itemClass, color = 'primary' }: Props = $props();

	let openSubmenus = $state<Record<number, boolean>>(
		items.reduce(
			(acc, item, index) => {
				if (item.type === 'submenu' && item.open) {
					acc[index] = true;
				}
				return acc;
			},
			{} as Record<number, boolean>
		)
	);

	const colors = {
		primary: 'sidenav-primary',
		secondary: 'sidenav-secondary',
		accent: 'sidenav-accent'
	};

	function toggleSubmenu(index: number) {
		openSubmenus[index] = !openSubmenus[index];
	}
</script>

{#snippet sidenavItem(item: Item<T>)}
	{#if item.icon}
		<div class="sidenav-start">
			<Icon icon={item.icon} class="sidenav-icon" />
		</div>
	{/if}
	<div class="sidenav-center">
		<div class="sidenav-label">{item.label}</div>
		{#if item.description}
			<div class="sidenav-description">{item.description}</div>
		{/if}
	</div>
	{#if item.status}
		<div class="sidenav-end">{item.status}</div>
	{/if}
{/snippet}

<ul class={cn('sidenav', className)}>
	{#each items as item, index}
		<li>
			{#if item.type === 'divider'}
				<div class="sidenav-divider"></div>
			{:else if item.type === 'header'}
				<div class="sidenav-header">
					{#if item.icon}
						<div class="sidenav-start">
							<Icon icon={item.icon} class="sidenav-icon" />
						</div>
					{/if}
					<div class="sidenav-center">
						<div class="sidenav-label">
							{item.label}
						</div>
						{#if item.description}
							<div class="sidenav-description">{item.description}</div>
						{/if}
					</div>
				</div>
			{:else if item.type === 'submenu'}
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_static_element_interactions -->
				<div class="sidenav-submenus" onclick={() => toggleSubmenu(index)}>
					<div class="sidenav-submenu">
						{#if item.icon}
							<div class="sidenav-start">
								<Icon icon={item.icon} class="sidenav-icon" />
							</div>
						{/if}
						<div class="sidenav-center">
							<div class="sidenav-label">
								{item.label}
							</div>
							{#if item.description}
								<div class="sidenav-description">{item.description}</div>
							{/if}
						</div>
						<div class="sidenav-btn">
							<Icon
								icon="fluent:arrow-sort-down-24-regular"
								class={cn('sidenav-arrow', openSubmenus[index] && 'is-active')}
							/>
						</div>
					</div>
					{#if openSubmenus[index] && item.subitems}
						<ul transition:slide class="sidenav-subitems">
							{#each item.subitems as subitem}
								<div class="sidenav-subitem">
									<li>
										{#if subitem.href}
											<a
												href={item.href}
												class={cn('sidenav-item', colors[color], itemClass)}
												target={item.external ? '_blank' : '_self'}
												class:is-active={page.url.pathname.includes(subitem.href)}
											>
												{@render sidenavItem(subitem as Item<T>)}
											</a>
										{:else}
											<button
												class={cn('sidenav-item', colors[color])}
												type="button"
												onclick={() => subitem.onclick?.(subitem)}
											>
												{@render sidenavItem(subitem as Item<T>)}
											</button>
										{/if}
									</li>
								</div>
							{/each}
						</ul>
					{/if}
				</div>
			{:else if item.href}
				<a
					href={item.href}
					class={cn('sidenav-item', colors[color], itemClass)}
					target={item.external ? '_blank' : '_self'}
					class:is-active={page.url.pathname.includes(item.href)}
				>
					{@render sidenavItem(item)}
				</a>
			{:else}
				<button
					class={cn('sidenav-item', colors[color], itemClass)}
					type="button"
					onclick={() => item.onclick?.(item)}
				>
					{@render sidenavItem(item)}
				</button>
			{/if}
		</li>
	{/each}
</ul>
