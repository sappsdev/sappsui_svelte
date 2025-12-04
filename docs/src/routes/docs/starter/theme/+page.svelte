<script lang="ts">
	import DocHeader from '$lib/components/doc/DocHeader.svelte';
	import Color from '$lib/components/utils/Color.svelte';
	import { storeApp } from '$lib/store/store.svelte';
	import { Button, Card, Modal, Section, Alert, Code } from 'sappsui';

	type ThemeColorKey = keyof typeof storeApp.themeColors;

	const themeColorPairs = [
		{
			key: 'primary',
			label: 'Primary',
			description: 'Main brand color for primary actions and emphasis'
		},
		{
			key: 'secondary',
			label: 'Secondary',
			description: 'Secondary brand color for supporting elements'
		},
		{
			key: 'muted',
			label: 'Muted',
			description: 'Subtle background color for less prominent elements'
		},
		{
			key: 'success',
			label: 'Success',
			description: 'Indicates successful operations and positive states'
		},
		{ key: 'info', label: 'Info', description: 'Informational messages and neutral notifications' },
		{ key: 'warning', label: 'Warning', description: 'Warning messages and cautionary states' },
		{ key: 'danger', label: 'Danger', description: 'Error states and destructive actions' },
		{
			key: 'surface',
			label: 'Surface',
			description: 'Background color for cards and elevated surfaces'
		}
	];

	let openColorPicker = $state(false);
	let selectedColorKey = $state<ThemeColorKey>('primary');
	let selectedColorType = $state<'main' | 'on'>('main');

	function openPicker(colorKey: ThemeColorKey, type: 'main' | 'on') {
		selectedColorKey = colorKey;
		selectedColorType = type;
		openColorPicker = true;
	}

	function handleColorSelect(colorName: string, shade: number, colorValue: string) {
		const key =
			selectedColorType === 'main'
				? selectedColorKey
				: (`on${selectedColorKey.charAt(0).toUpperCase()}${selectedColorKey.slice(1)}` as ThemeColorKey);
		storeApp.setThemeColor(key, colorValue);
		openColorPicker = false;
	}

	function resetColors() {
		storeApp.setThemeColor('primary', 'oklch(54.6% 0.245 262.881)');
		storeApp.setThemeColor('onPrimary', 'oklch(93.2% 0.032 255.585)');
		storeApp.setThemeColor('secondary', 'oklch(60% 0.118 184.704)');
		storeApp.setThemeColor('onSecondary', 'oklch(95.3% 0.051 180.801)');
		storeApp.setThemeColor('muted', 'oklch(87.2% 0.01 258.338)');
		storeApp.setThemeColor('onMuted', 'oklch(37.2% 0.044 257.287)');
		storeApp.setThemeColor('success', 'oklch(62.7% 0.194 149.214)');
		storeApp.setThemeColor('onSuccess', 'oklch(96.2% 0.044 156.743)');
		storeApp.setThemeColor('info', 'oklch(58.8% 0.158 241.966)');
		storeApp.setThemeColor('onInfo', 'oklch(95.1% 0.026 236.824)');
		storeApp.setThemeColor('warning', 'oklch(68.1% 0.162 75.834)');
		storeApp.setThemeColor('onWarning', 'oklch(97.3% 0.071 103.193)');
		storeApp.setThemeColor('danger', 'oklch(57.7% 0.245 27.325)');
		storeApp.setThemeColor('onDanger', 'oklch(93.6% 0.032 17.717)');
		storeApp.setThemeColor('surface', 'oklch(96.7% 0.003 264.542)');
		storeApp.setThemeColor('onSurface', 'oklch(27.9% 0.041 260.031)');
	}
</script>

<DocHeader title="Theme Colors">
	Customize your application's color palette using the interactive theme color system. Click on any
	color to change it and see the changes applied throughout the documentation in real-time.
</DocHeader>

<Section>
	<Alert status="info" class="mb-6">
		<strong>Interactive Theme Customization:</strong> Click on any color below to open the color picker.
		Your changes will be applied immediately throughout the entire application. Use the "Reset Colors"
		button to restore default values.
	</Alert>

	<div class="flex justify-end mb-4">
		<Button variant="outlined" size="sm" onclick={resetColors}>Reset Colors</Button>
	</div>

	<div class="grid gap-6">
		{#each themeColorPairs as colorPair}
			{@const mainKey = colorPair.key as ThemeColorKey}
			{@const onKey =
				`on${colorPair.key.charAt(0).toUpperCase()}${colorPair.key.slice(1)}` as ThemeColorKey}
			<Card>
				<div class="p-6">
					<h3 class="text-lg font-semibold mb-2">{colorPair.label}</h3>
					<p class="text-sm text-muted mb-4">{colorPair.description}</p>

					<div class="grid grid-cols-1 md:grid-cols-2 gap-4">
						<!-- Main Color -->
						<div>
							<div class="flex items-center justify-between mb-2">
								<span class="text-sm font-medium">{colorPair.label}</span>
								<button
									onclick={() => openPicker(mainKey, 'main')}
									class="px-3 py-1 text-xs rounded-md bg-muted hover:bg-muted/80 transition-colors"
								>
									Change
								</button>
							</div>
							<button
								onclick={() => openPicker(mainKey, 'main')}
								class="w-full h-24 rounded-lg shadow-md transition-transform hover:scale-105 flex items-center justify-center font-medium"
								style="background-color: {storeApp.themeColors[mainKey]}; color: {storeApp
									.themeColors[onKey]};"
							>
								Click to customize
							</button>
							<div class="mt-2">
								<Code code={storeApp.themeColors[mainKey]} lang="css" />
							</div>
						</div>

						<!-- On Color -->
						<div>
							<div class="flex items-center justify-between mb-2">
								<span class="text-sm font-medium">On {colorPair.label}</span>
								<button
									onclick={() => openPicker(mainKey, 'on')}
									class="px-3 py-1 text-xs rounded-md bg-muted hover:bg-muted/80 transition-colors"
								>
									Change
								</button>
							</div>
							<button
								onclick={() => openPicker(mainKey, 'on')}
								class="w-full h-24 rounded-lg shadow-md transition-transform hover:scale-105 flex items-center justify-center font-medium"
								style="background-color: {storeApp.themeColors[onKey]}; color: {storeApp
									.themeColors[mainKey]};"
							>
								Click to customize
							</button>
							<div class="mt-2">
								<Code code={storeApp.themeColors[onKey]} lang="css" />
							</div>
						</div>
					</div>

					<!-- Example Usage -->
					<div
						class="mt-4 p-4 rounded-lg"
						style="background-color: {storeApp.themeColors[mainKey]}; color: {storeApp.themeColors[
							onKey
						]};"
					>
						<p class="text-sm font-medium">
							Example: {colorPair.label} with On-{colorPair.label} text
						</p>
					</div>
				</div>
			</Card>
		{/each}
	</div>
</Section>

<Section>
	<Card>
		<div class="p-6">
			<h3 class="text-lg font-semibold mb-4">How to Use Theme Colors</h3>

			<div class="space-y-4">
				<div>
					<h4 class="font-medium mb-2">In CSS/Tailwind Classes</h4>
					<Code
						code={'<div class="bg-primary text-on-primary">Primary Button</div>'}
						lang="html"
						showCopy
					/>
				</div>

				<div>
					<h4 class="font-medium mb-2">In CSS Custom Properties</h4>
					<Code
						code={'.my-element {\n  background-color: var(--primary);\n  color: var(--on-primary);\n}'}
						lang="css"
						showCopy
					/>
				</div>

				<div>
					<h4 class="font-medium mb-2">Available Theme Colors</h4>
					<ul class="list-disc list-inside space-y-1 text-sm">
						<li><code>primary</code> / <code>on-primary</code> - Main brand color</li>
						<li><code>secondary</code> / <code>on-secondary</code> - Secondary brand color</li>
						<li><code>muted</code> / <code>on-muted</code> - Subtle backgrounds</li>
						<li><code>success</code> / <code>on-success</code> - Success states</li>
						<li><code>info</code> / <code>on-info</code> - Informational states</li>
						<li><code>warning</code> / <code>on-warning</code> - Warning states</li>
						<li><code>danger</code> / <code>on-danger</code> - Error/danger states</li>
						<li><code>surface</code> / <code>on-surface</code> - Card backgrounds</li>
					</ul>
				</div>
			</div>
		</div>
	</Card>
</Section>

<Modal bind:open={openColorPicker}>
	<Color onColorSelect={handleColorSelect} />
</Modal>
