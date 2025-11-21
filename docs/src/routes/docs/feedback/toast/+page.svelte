<script lang="ts">
	import DocCode from '$lib/components/doc/DocCode.svelte';
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import DocOptions from '$lib/components/doc/DocOptions.svelte';
	import DocPreview from '$lib/components/doc/DocPreview.svelte';
	import DocProps from '$lib/components/doc/DocProps.svelte';
	import { storeApp } from '$lib/store/store.svelte';
	import { Button, Checkbox, Select, toast } from 'sappsui';

	const statusOptions = [
		{ id: 'success', label: 'Success' },
		{ id: 'danger', label: 'Danger' },
		{ id: 'info', label: 'Info' },
		{ id: 'warning', label: 'Warning' }
	];

	const positionOptions = [
		{ id: 'top-left', label: 'Top Left' },
		{ id: 'top-right', label: 'Top Right' },
		{ id: 'bottom-left', label: 'Bottom Left' },
		{ id: 'bottom-right', label: 'Bottom Right' }
	];

	const durationOptions = [
		{ id: '0', label: 'Manual (0ms)' },
		{ id: '2000', label: '2 seconds' },
		{ id: '3000', label: '3 seconds' },
		{ id: '5000', label: '5 seconds' }
	];

	// Selects
	let status: any = $state('info');
	let position: any = $state('bottom-right');
	let duration: any = $state('3000');

	// Props
	let title = $state('Toast Title');
	let description = $state('This is a toast notification message.');
	let icon = $state('');

	// States
	let solid = $state(false);

	const handleClick = () => {
		toast.show({
			title: title || undefined,
			description,
			status,
			duration: parseInt(duration),
			position: position || undefined,
			icon: icon || undefined,
			solid
		});
	};

	let hasProps = $derived(
		[status !== 'info', position !== 'bottom-right', duration !== '0', title, icon, solid].some(
			Boolean
		)
	);

	let code = $derived(() => {
		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Button, toast } from 'sappsui';`,
			`\n\tconst handleClick = () => {`,
			`\t\ttoast.show({`,
			title && `\t\t\ttitle: '${title}',`,
			`\t\t\tdescription: '${description}',`,
			status !== 'info' && `\t\t\tstatus: '${status}',`,
			duration !== '0' && `\t\t\tduration: ${duration},`,
			position !== 'bottom-right' && `\t\t\tposition: '${position}',`,
			icon && `\t\t\ticon: '${icon}',`,
			solid && `\t\t\tsolid: true`,
			`\t\t});`,
			`\t};`,
			`<\/script>`
		].filter(Boolean);

		const componentLines = [`\n<Button label="Show Toast" onclick={handleClick} />`];

		return [...scriptLines, ...componentLines].join('\n');
	});

	const props = [
		{ prop: 'description', type: 'string', initial: '', required: true },
		{ prop: 'title', type: 'string', initial: '' },
		{ prop: 'status', type: 'success | danger | info | warning', initial: 'info' },
		{ prop: 'duration', type: 'number', initial: '0' },
		{
			prop: 'position',
			type: 'top-left | top-right | bottom-left | bottom-right',
			initial: 'bottom-right'
		},
		{ prop: 'icon', type: 'IconName', initial: '' },
		{ prop: 'solid', type: 'boolean', initial: 'false' },
		{ prop: 'id', type: 'string', initial: 'auto-generated' }
	];
</script>

{#snippet preview()}
	<Button label="Show Toast" onclick={handleClick} />
{/snippet}

{#snippet builder()}
	<Select label="Status" name="status" size="sm" options={statusOptions} bind:value={status} />
	<Select
		label="Position"
		name="position"
		size="sm"
		options={positionOptions}
		bind:value={storeApp.toastPosition}
	/>
	<Select
		label="Duration"
		name="duration"
		size="sm"
		options={durationOptions}
		bind:value={duration}
	/>

	<DocOptions title="Props">
		<Checkbox
			onchange={(v) => (v ? (title = 'Toast Title') : (title = ''))}
			checked={!!title}
			name="title"
			label="Title"
		/>
		<Checkbox
			onchange={(v) => (v ? (icon = 'fluent:checkmark-circle-24-regular') : (icon = ''))}
			name="icon"
			label="Icon"
			bind:checked={storeApp.toastIcon}
		/>
		<Checkbox bind:checked={solid} name="solid" label="Solid" />
	</DocOptions>
{/snippet}

<DocHeader title="Toast">
	Toast is a lightweight notification component that provides brief messages about app processes at
	the bottom of the screen. They automatically disappear after a short duration, ensuring they do
	not interrupt the user experience.
</DocHeader>

<DocPreview {preview} {builder} />

<DocCode code={code()} />

<DocProps {props} />
