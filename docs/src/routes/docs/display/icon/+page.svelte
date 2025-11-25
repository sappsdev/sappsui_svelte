<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { Icon, TextField } from 'sappsui';

	// States
	let iconName = $state('fluent:heart-24-regular');
	let customClass = $state('');

	let hasProps = $derived(customClass !== '');

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Icon } from 'sappsui';`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<Icon`,
			hasProps && `\tname="${iconName}"`,
			customClass && `\tclass="${customClass}"`,
			hasProps && `/>`,
			!hasProps && `<Icon name="${iconName}" />`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'name', type: 'IconName', initial: '', required: true },
		{ prop: 'class', type: 'string', initial: '' }
	];
</script>

{#snippet preview()}
	<Icon name={iconName} class={customClass || 'h-8 w-auto'} />
{/snippet}

{#snippet builder()}
	<DocOptions title="Props">
		<TextField
			label="Icon Name"
			name="icon-name"
			size="sm"
			placeholder="home"
			bind:value={iconName}
		/>
		<TextField
			label="Custom Class"
			name="custom-class"
			size="sm"
			placeholder="size-12 text-blue-500"
			bind:value={customClass}
		/>
	</DocOptions>

	<div class="mt-4 p-4 bg-muted/50 rounded-lg text-sm">
		<p class="font-medium mb-2">Available Icons:</p>
		<p class="text-muted-foreground">
			View the complete list of available icons at
			<a href="/docs/starter/icons" class="text-primary hover:underline"> /docs/starter/icons </a>
		</p>
	</div>
{/snippet}

<DocHeader title="Icon">
	Icons are visual symbols used to represent actions, objects, or concepts throughout the interface.
</DocHeader>

<DocPreview {preview} {builder} />

<DocCode code={code()} />

<DocProps {props} />

<div class="mt-8 p-4 border border-border rounded-lg">
	<h3 class="text-lg font-semibold mb-2">Icon Library</h3>
	<p class="text-muted-foreground mb-3">
		The Icon component uses a curated set of icons. To browse all available icons and their names,
		visit the icons reference page.
	</p>
	<a
		href="/docs/starter/icons"
		class="inline-flex items-center gap-2 text-primary hover:underline font-medium"
	>
		<Icon name="arrow-right" class="size-4" />
		Browse all icons
	</a>
</div>
