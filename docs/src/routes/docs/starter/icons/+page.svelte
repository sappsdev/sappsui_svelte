<script lang="ts">
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import { IconButton, Section, Tabs, useClipboard } from 'sappsui';
	import { fluentFilledIcons } from './fluent-filled';
	import { fluentRegularIcons } from './fluent-regular';
	import { svgSpinnerIcons } from './svg-spinners';
	import { flagsIcons } from './flags';

	const tabs = [
		{ id: 'fluent-regular', label: 'Fluent Regular', content: fluentRegular },
		{ id: 'fluent-filled', label: 'Fluent Filled', content: fluentFilled },
		{ id: 'spinner', label: 'Spinner Icons', content: svgSpinners },
		{ id: 'flags', label: 'Flags Icons', content: flags }
	];

	const clipboard = useClipboard();

	const handleCopy = (icon: string) => {
		clipboard.copy(icon);
	};
</script>

{#snippet fluentFilled()}
	<div class="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12">
		{#each fluentFilledIcons as icon (icon)}
			<IconButton {icon} variant="ghost" size="lg" onclick={() => handleCopy(icon)} />
		{/each}
	</div>
{/snippet}
{#snippet fluentRegular()}
	<div class="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12">
		{#each fluentRegularIcons as icon (icon)}
			<IconButton {icon} variant="ghost" size="lg" onclick={() => handleCopy(icon)} />
		{/each}
	</div>
{/snippet}
{#snippet svgSpinners()}
	<div class="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12">
		{#each svgSpinnerIcons as icon (icon)}
			<IconButton {icon} variant="ghost" size="lg" onclick={() => handleCopy(icon)} />
		{/each}
	</div>
{/snippet}
{#snippet flags()}
	<div class="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12">
		{#each flagsIcons as icon (icon)}
			<IconButton {icon} variant="ghost" size="lg" onclick={() => handleCopy(icon)} />
		{/each}
	</div>
{/snippet}

<DocHeader title="Icons">
	Icons are visual symbols that represent ideas, actions, or objects.
</DocHeader>

<Section>
	<Tabs {tabs} />
</Section>
