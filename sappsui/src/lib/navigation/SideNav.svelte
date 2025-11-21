<script lang="ts">
	import { page } from '$app/state';
	import type { IconName } from '$lib/assets/icons/index.js';
	import { Icon } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';
	import type { Snippet } from 'svelte';
	import { slide } from 'svelte/transition';

	type SubmenuItem = {
		label: string;
		href?: string;
		onclick?: (item: SubmenuItem) => void;
		icon?: IconName;
		description?: string;
		status?: string | Snippet;
	};

	type Item = {
		type?: 'item' | 'divider' | 'header' | 'submenu';
		label?: string;
		description?: string;
		icon?: IconName;
		href?: string;
		onclick?: (item: Item) => void;
		status?: string | Snippet;
		subitems?: SubmenuItem[];
		open?: boolean;
	};

	type Props = {
		items: Item[];
		color?: 'primary' | 'secondary';
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
		secondary: 'sidenav-secondary'
	};

	function toggleSubmenu(index: number) {
		openSubmenus[index] = !openSubmenus[index];
	}
</script>

{#snippet sidenavItem(item: Item)}
	{#if item.icon}
		<div class="sidenav-start">
			<Icon name={item.icon} class="sidenav-icon" />
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
							<Icon name={item.icon} class="sidenav-icon" />
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
								<Icon name={item.icon} class="sidenav-icon" />
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
								name="fluent:arrow-sort-down-24-regular"
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
												class:is-active={page.url.pathname.includes(subitem.href)}
											>
												{@render sidenavItem(subitem as Item)}
											</a>
										{:else}
											<button
												class={cn('sidenav-item', colors[color])}
												type="button"
												onclick={() => subitem.onclick?.(subitem)}
											>
												{@render sidenavItem(subitem as Item)}
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
