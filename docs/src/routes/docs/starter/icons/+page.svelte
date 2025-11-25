<script lang="ts">
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import { IconButton, Section, Tabs, useClipboard } from 'sappsui';
	import {
		circleFlagsIcons,
		fluentFilledIcons,
		fluentRegularIcons,
		logosIcons,
		solarBoldIcons,
		solarBoldDuotoneIcons,
		solarBrokenIcons,
		solarLineDuotoneIcons,
		solarLinearIcons,
		solarOutlineIcons,
		svgSpinnersIcons
	} from 'sappsicons';

	const tabs = [
		{ id: 'solar-bold', label: 'Solar Bold', content: solarBold },
		{ id: 'solar-bold-duotone', label: 'Solar Bold Duotone', content: solarBoldDuotone },
		{ id: 'solar-broken', label: 'Solar Broken', content: solarBroken },
		{ id: 'solar-line-duotone', label: 'Solar Line Duotone', content: solarLineDuotone },
		{ id: 'solar-linear', label: 'Solar Linear', content: solarLinear },
		{ id: 'solar-outline', label: 'Solar Outline', content: solarOutline },
		{ id: 'fluent-regular', label: 'Fluent Regular', content: fluentRegular },
		{ id: 'fluent-filled', label: 'Fluent Filled', content: fluentFilled },
		{ id: 'logos', label: 'Logos', content: logos },
		{ id: 'spinner', label: 'Spinner Icons', content: svgSpinners },
		{ id: 'flags', label: 'Flags Icons', content: flags }
	];

	const clipboard = useClipboard();
	const handleCopy = (icon: string) => {
		clipboard.copy(icon);
	};
</script>

{#snippet solarBold()}
	<div class="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12">
		{#each Object.keys(solarBoldIcons) as icon (icon)}
			<IconButton icon={icon as any} variant="ghost" size="lg" onclick={() => handleCopy(icon)} />
		{/each}
	</div>
{/snippet}

{#snippet solarBoldDuotone()}
	<div class="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12">
		{#each Object.keys(solarBoldDuotoneIcons) as icon (icon)}
			<IconButton icon={icon as any} variant="ghost" size="lg" onclick={() => handleCopy(icon)} />
		{/each}
	</div>
{/snippet}

{#snippet solarBroken()}
	<div class="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12">
		{#each Object.keys(solarBrokenIcons) as icon (icon)}
			<IconButton icon={icon as any} variant="ghost" size="lg" onclick={() => handleCopy(icon)} />
		{/each}
	</div>
{/snippet}

{#snippet solarLineDuotone()}
	<div class="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12">
		{#each Object.keys(solarLineDuotoneIcons) as icon (icon)}
			<IconButton icon={icon as any} variant="ghost" size="lg" onclick={() => handleCopy(icon)} />
		{/each}
	</div>
{/snippet}

{#snippet solarLinear()}
	<div class="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12">
		{#each Object.keys(solarLinearIcons) as icon (icon)}
			<IconButton icon={icon as any} variant="ghost" size="lg" onclick={() => handleCopy(icon)} />
		{/each}
	</div>
{/snippet}

{#snippet solarOutline()}
	<div class="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12">
		{#each Object.keys(solarOutlineIcons) as icon (icon)}
			<IconButton icon={icon as any} variant="ghost" size="lg" onclick={() => handleCopy(icon)} />
		{/each}
	</div>
{/snippet}

{#snippet fluentFilled()}
	<div class="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12">
		{#each Object.keys(fluentFilledIcons) as icon (icon)}
			<IconButton icon={icon as any} variant="ghost" size="lg" onclick={() => handleCopy(icon)} />
		{/each}
	</div>
{/snippet}

{#snippet fluentRegular()}
	<div class="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12">
		{#each Object.keys(fluentRegularIcons) as icon (icon)}
			<IconButton icon={icon as any} variant="ghost" size="lg" onclick={() => handleCopy(icon)} />
		{/each}
	</div>
{/snippet}

{#snippet logos()}
	<div class="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12">
		{#each Object.keys(logosIcons) as icon (icon)}
			<IconButton icon={icon as any} variant="ghost" size="lg" onclick={() => handleCopy(icon)} />
		{/each}
	</div>
{/snippet}

{#snippet svgSpinners()}
	<div class="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12">
		{#each Object.keys(svgSpinnersIcons) as icon (icon)}
			<IconButton icon={icon as any} variant="ghost" size="lg" onclick={() => handleCopy(icon)} />
		{/each}
	</div>
{/snippet}

{#snippet flags()}
	<div class="grid grid-cols-6 md:grid-cols-8 lg:grid-cols-12">
		{#each Object.keys(circleFlagsIcons) as icon (icon)}
			<IconButton icon={icon as any} variant="ghost" size="lg" onclick={() => handleCopy(icon)} />
		{/each}
	</div>
{/snippet}

<DocHeader title="Icons">
	Icons are visual symbols that represent ideas, actions, or objects.
</DocHeader>
<Section>
	<Tabs {tabs} />
</Section>
