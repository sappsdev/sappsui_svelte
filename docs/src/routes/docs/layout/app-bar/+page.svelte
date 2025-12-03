<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { AppBar, Checkbox } from 'sappsui';

	// States
	let showStart = $state(true);
	let showCenter = $state(true);
	let showEnd = $state(true);
	let isBlurred = $state(false);
	let isBordered = $state(true);
	let hideOnScroll = $state(false);

	let hasProps = $derived(
		[showStart, showCenter, showEnd, isBlurred, isBordered, hideOnScroll].some(Boolean)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { AppBar } from 'sappsui';`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [
			hasProps && `<AppBar`,
			`\tclass="relative"`,
			isBlurred && `\tisBlurred`,
			isBordered && `\tisBordered`,
			hideOnScroll && `\thideOnScroll`,
			hasProps && `>`,
			!hasProps && `<AppBar class="relative">`,
			showStart && `\t{#snippet start()}`,
			showStart && `\t\t<button class="px-4 py-2 bg-primary text-primary-foreground rounded-md">`,
			showStart && `\t\t\tMenu`,
			showStart && `\t\t</button>`,
			showStart && `\t{/snippet}\n`,
			showCenter && `\t{#snippet center()}`,
			showCenter && `\t\t<h1 class="text-xl font-semibold">Mi Aplicación</h1>`,
			showCenter && `\t{/snippet}\n`,
			showEnd && `\t{#snippet end()}`,
			showEnd && `\t\t<button class="px-4 py-2 border border-border rounded-md hover:bg-accent">`,
			showEnd && `\t\t\tPerfil`,
			showEnd && `\t\t</button>`,
			showEnd && `\t{/snippet}`,
			!showStart && !showCenter && !showEnd && `\t<p class="p-4">AppBar content</p>`,
			`</AppBar>`
		].filter(Boolean);

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'start', type: 'Snippet', initial: '' },
		{ prop: 'center', type: 'Snippet', initial: '' },
		{ prop: 'end', type: 'Snippet', initial: '' },
		{ prop: 'class', type: 'string', initial: '' },
		{ prop: 'contentClass', type: 'string', initial: '' },
		{ prop: 'startClass', type: 'string', initial: '' },
		{ prop: 'centerClass', type: 'string', initial: '' },
		{ prop: 'endClass', type: 'string', initial: '' },
		{ prop: 'isBlurred', type: 'boolean', initial: 'false' },
		{ prop: 'isBordered', type: 'boolean', initial: 'false' },
		{ prop: 'hideOnScroll', type: 'boolean', initial: 'false' }
	];
</script>

{#snippet start()}
	<button class="px-4 py-2 bg-primary text-primary-foreground rounded-md"> Menu </button>
{/snippet}

{#snippet center()}
	<h1 class="text-xl font-semibold">Mi Aplicación</h1>
{/snippet}

{#snippet end()}
	<button class="px-4 py-2 border border-border rounded-md hover:bg-accent"> Perfil </button>
{/snippet}

{#snippet preview()}
	<div
		class="w-full min-h-[200px] border border-border rounded-lg overflow-hidden bg-background relative"
	>
		<AppBar
			class="relative"
			start={showStart ? start : undefined}
			center={showCenter ? center : undefined}
			end={showEnd ? end : undefined}
			{isBlurred}
			{isBordered}
			{hideOnScroll}
		/>
		<div class="p-6 pt-20">
			<p class="text-sm text-muted-foreground">Contenido de la página debajo del AppBar</p>
		</div>
	</div>
{/snippet}

{#snippet builder()}
	<DocOptions title="Secciones">
		<Checkbox bind:checked={showStart} label="Inicio (Start)" />
		<Checkbox bind:checked={showCenter} label="Centro (Center)" />
		<Checkbox bind:checked={showEnd} label="Fin (End)" />
	</DocOptions>

	<DocOptions title="Propiedades">
		<Checkbox bind:checked={isBlurred} label="Difuminado (Blurred)" />
		<Checkbox bind:checked={isBordered} label="Con borde (Bordered)" />
		<Checkbox bind:checked={hideOnScroll} label="Ocultar al hacer scroll" />
	</DocOptions>
{/snippet}

<DocHeader title="AppBar">
	Los AppBars muestran información y acciones en la parte superior de una pantalla. Son ideales para
	navegación, títulos y acciones contextuales.
</DocHeader>

<DocPreview {builder}>
	{@render preview()}
</DocPreview>

<DocCode code={code()} />

<DocProps {props} />
