<script lang="ts" generics="T">
	import { Icon } from '$lib/index.js';
	import { cn } from '$lib/utils/class-names.js';

	type Props = {
		items: T[];
		class?: string;
		labelKey: keyof T;
		descriptionKey?: keyof T;
		iconKey?: keyof T;
		srcKey?: keyof T;
		typeKey?: keyof T;
		statusKey?: keyof T;
	};

	const {
		items = [],
		class: className,
		labelKey,
		descriptionKey,
		iconKey,
		srcKey,
		typeKey,
		statusKey
	}: Props = $props();
</script>

{#snippet listboxItem(item: T)}
	{#if (srcKey && item[srcKey]) || (iconKey && item[iconKey])}
		<div class="listbox-avatar">
			{#if srcKey && item[srcKey]}
				<img src={item[srcKey] as string} alt={item[labelKey] as string} />
			{:else if iconKey && item[iconKey]}
				<Icon icon={item[iconKey] as string} class="listbox-icon" />
			{/if}
		</div>
	{/if}
	<div class="listbox-content">
		<div class="listbox-label">{item[labelKey]}</div>
		{#if descriptionKey && item[descriptionKey]}
			<div class="listbox-description">{item[descriptionKey]}</div>
		{/if}
	</div>
	{#if statusKey && item[statusKey]}
		<div class="listbox-status">{item[statusKey]}</div>
	{/if}
{/snippet}

<ul class={cn('listbox', className)}>
	{#each items as item}
		<li>
			{#if typeKey && item[typeKey] === 'divider'}
				<div class="listbox-divider"></div>
			{:else if typeKey && item[typeKey] === 'header'}
				<div class="listbox-header">{item[labelKey]}</div>
			{:else if item['href' as keyof T]}
				<a
					href={item['href' as keyof T] as string}
					class="listbox-item"
					target={item['external' as keyof T] ? '_blank' : '_self'}
				>
					{@render listboxItem(item)}
				</a>
			{:else}
				<button
					class="listbox-item"
					type="button"
					onclick={() => item['onclick' as keyof T] as (item: T) => void}
				>
					{@render listboxItem(item)}
				</button>
			{/if}
		</li>
	{/each}
</ul>
