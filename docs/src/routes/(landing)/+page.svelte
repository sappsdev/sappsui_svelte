<script lang="ts">
	import { Card, Button, Section, Divider } from 'sappsui';

	let mobileMenuOpen = $state(false);

	const features = [
		{
			icon: 'fluent:code-24-regular',
			title: 'Developer Friendly',
			description: 'Built with TypeScript and Svelte 5 runes for the best DX'
		},
		{
			icon: 'fluent:paint-brush-24-regular',
			title: 'Highly Customizable',
			description: 'Theme system with CSS variables and Tailwind integration'
		},
		{
			icon: 'fluent:flash-24-regular',
			title: 'Performance First',
			description: 'Lightweight components with minimal runtime overhead'
		}
	];

	const components = [
		{ name: 'Card', count: '12+ variants' },
		{ name: 'Button', count: '20+ styles' },
		{ name: 'Tabs', count: '5 positions' },
		{ name: 'SideNav', count: 'Nested menus' },
		{ name: 'Forms', count: 'Full suite' },
		{ name: 'Typography', count: 'Prose ready' }
	];

	const stats = [
		{ value: '50+', label: 'Components' },
		{ value: '100%', label: 'TypeScript' },
		{ value: '<5KB', label: 'Per Component' }
	];
</script>

<!-- Navigation -->
<nav class="sticky top-0 z-50 backdrop-blur-lg bg-surface/80 border-b border-outline">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
		<div class="flex justify-between items-center h-16">
			<div class="flex items-center gap-2">
				<div
					class="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center"
				>
					<iconify-icon icon="fluent:sparkle-24-filled" class="text-white text-lg"></iconify-icon>
				</div>
				<span
					class="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
				>
					SappsUI
				</span>
			</div>

			<!-- Desktop Navigation -->
			<div class="hidden md:flex items-center gap-8">
				<a href="/" class="text-on-muted hover:text-on-surface transition-colors">Home</a>
				<a href="/docs" class="text-on-muted hover:text-on-surface transition-colors">Docs</a>
				<a
					href="/docs/components-list"
					class="text-on-muted hover:text-on-surface transition-colors">Components</a
				>
				<a
					href="https://github.com"
					target="_blank"
					class="text-on-muted hover:text-on-surface transition-colors"
				>
					<iconify-icon icon="fluent:code-24-regular" class="text-xl"></iconify-icon>
				</a>
				<Button label="Get Started" color="primary" size="small" href="/docs/quick-start" />
			</div>

			<!-- Mobile Menu Button -->
			<button class="md:hidden p-2" onclick={() => (mobileMenuOpen = !mobileMenuOpen)}>
				<iconify-icon
					icon={mobileMenuOpen ? 'fluent:dismiss-24-regular' : 'fluent:list-24-regular'}
					class="text-2xl"
				></iconify-icon>
			</button>
		</div>

		<!-- Mobile Menu -->
		{#if mobileMenuOpen}
			<div class="md:hidden py-4 space-y-4">
				<a href="/" class="block text-on-muted hover:text-on-surface transition-colors">Home</a>
				<a href="/docs" class="block text-on-muted hover:text-on-surface transition-colors">Docs</a>
				<a
					href="/docs/components-list"
					class="block text-on-muted hover:text-on-surface transition-colors">Components</a
				>
				<Button label="Get Started" color="primary" size="small" wide href="/docs/quick-start" />
			</div>
		{/if}
	</div>
</nav>

<!-- Hero Section -->
<Section>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
		<div class="text-center space-y-8">
			<!-- Badge -->
			<div
				class="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium"
			>
				<iconify-icon icon="fluent:star-24-filled" class="text-lg"></iconify-icon>
				<span>SappsUI v1.0 Now Available</span>
			</div>

			<!-- Title -->
			<h1 class="text-5xl lg:text-7xl font-extrabold tracking-tight">
				The headless<br />
				<span
					class="bg-gradient-to-r from-primary via-secondary to-primary bg-clip-text text-transparent"
				>
					components for Svelte
				</span>
			</h1>

			<!-- Description -->
			<p class="text-xl text-on-muted max-w-2xl mx-auto leading-relaxed">
				Flexible, unstyled, and accessible primitives that provide the foundation for building your
				own high-quality component library.
			</p>

			<!-- CTA Buttons -->
			<div class="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
				<Button
					label="Start Building"
					color="primary"
					size="large"
					startIcon="fluent:rocket-24-regular"
					href="/docs/quick-start"
				/>
				<Button
					label="View Components"
					variant="outline"
					size="large"
					endIcon="fluent:arrow-right-24-regular"
					href="/docs/components-list"
				/>
			</div>

			<!-- Stats -->
			<div class="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12">
				{#each stats as stat}
					<div class="text-center">
						<div class="text-3xl font-bold text-primary">{stat.value}</div>
						<div class="text-sm text-on-muted mt-1">{stat.label}</div>
					</div>
				{/each}
			</div>
		</div>
	</div>
</Section>

<!-- Features Section -->
<Section>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
		<div class="text-center mb-16">
			<span
				class="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4"
			>
				explore
			</span>
			<h2 class="text-4xl font-bold mb-4">
				The foundation for<br />your next web project
			</h2>
		</div>

		<div class="grid md:grid-cols-3 gap-8">
			{#each features as feature}
				<Card variant="outline" hover class="p-8">
					<div class="column gap-4">
						<div class="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
							<iconify-icon icon={feature.icon} class="text-2xl text-primary"></iconify-icon>
						</div>
						<h3 class="text-xl font-semibold">{feature.title}</h3>
						<p class="text-on-muted leading-relaxed">{feature.description}</p>
					</div>
				</Card>
			{/each}
		</div>
	</div>
</Section>

<!-- Components Showcase -->
<Section>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
		<Card variant="soft" color="primary" class="p-12">
			<div class="column lg:row gap-12 items-center">
				<div class="flex-1 space-y-6">
					<h2 class="text-4xl font-bold">50+ Components Ready to Use</h2>
					<p class="text-lg text-on-muted leading-relaxed">
						From basic buttons to complex navigation systems, every component is built with
						accessibility and customization in mind.
					</p>
					<div class="grid grid-cols-2 gap-4">
						{#each components as component}
							<div class="flex items-center gap-3 p-4 rounded-lg bg-surface/50">
								<iconify-icon icon="fluent:checkmark-circle-24-filled" class="text-xl text-success"
								></iconify-icon>
								<div>
									<div class="font-semibold">{component.name}</div>
									<div class="text-sm text-on-muted">{component.count}</div>
								</div>
							</div>
						{/each}
					</div>
					<Button
						label="Explore All Components"
						color="primary"
						endIcon="fluent:arrow-right-24-regular"
						href="/docs/components-list"
					/>
				</div>
				<div class="flex-1">
					<Card variant="outline" shadow class="overflow-hidden">
						<div class="p-6 bg-gradient-to-br from-primary/5 to-secondary/5">
							<div class="space-y-4">
								<div class="flex items-center justify-between">
									<h4 class="font-semibold">Component Preview</h4>
									<iconify-icon icon="fluent:code-24-regular" class="text-xl text-primary"
									></iconify-icon>
								</div>
								<Divider />
								<div class="space-y-3">
									<Button label="Primary Button" color="primary" wide />
									<Button label="Secondary Button" color="secondary" variant="outline" wide />
									<Button label="Ghost Button" variant="ghost" wide />
								</div>
							</div>
						</div>
					</Card>
				</div>
			</div>
		</Card>
	</div>
</Section>

<!-- Code Example -->
<Section>
	<div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
		<div class="text-center mb-12">
			<h2 class="text-4xl font-bold mb-4">Clean, Simple API</h2>
			<p class="text-lg text-on-muted">Write less code, build more features</p>
		</div>

		<Card variant="outline" shadow class="overflow-hidden">
			<div class="bg-muted p-6 font-mono text-sm">
				<pre class="text-on-surface"><code
						>&lt;script lang="ts"&gt;
  import &#123; Card, Button, Tabs &#125; from 'sappsui';

  const tabs = [
    &#123; id: '1', label: 'Overview', content: 'Overview content' &#125;,
    &#123; id: '2', label: 'Details', content: 'Details content' &#125;
  ];
&lt;/script&gt;

&lt;Card variant="outline" shadow&gt;
  &lt;h3&gt;Dashboard&lt;/h3&gt;
  &lt;Tabs &#123;tabs&#125; variant="underlined" /&gt;
  &lt;Button label="Save Changes" color="primary" /&gt;
&lt;/Card&gt;</code
					></pre>
			</div>
		</Card>
	</div>
</Section>

<!-- CTA Section -->
<Section>
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
		<Card variant="solid" color="primary" class="p-12 text-center">
			<div class="column gap-6 items-center max-w-2xl mx-auto">
				<h2 class="text-4xl font-bold text-white">Ready to start building?</h2>
				<p class="text-lg text-white/80">
					Get up and running in minutes with our comprehensive documentation and examples.
				</p>
				<div class="flex flex-col sm:flex-row gap-4">
					<Button
						label="Get Started"
						variant="solid"
						color="secondary"
						size="large"
						startIcon="fluent:rocket-24-regular"
						href="/docs/quick-start"
					/>
					<Button
						label="View on GitHub"
						variant="outline"
						size="large"
						startIcon="fluent:code-24-regular"
						class="!border-white !text-white hover:!bg-white/10"
					/>
				</div>
			</div>
		</Card>
	</div>
</Section>

<!-- Footer -->
<footer class="border-t border-outline">
	<div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
		<div class="grid md:grid-cols-4 gap-8">
			<div class="space-y-4">
				<div class="flex items-center gap-2">
					<div
						class="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center"
					>
						<iconify-icon icon="fluent:sparkle-24-filled" class="text-white text-lg"></iconify-icon>
					</div>
					<span class="text-xl font-bold">SappsUI</span>
				</div>
				<p class="text-sm text-on-muted">
					Modern Svelte components for building beautiful interfaces.
				</p>
			</div>

			<div>
				<h4 class="font-semibold mb-4">Documentation</h4>
				<div class="space-y-2 text-sm">
					<a href="/docs/introduction" class="block text-on-muted hover:text-on-surface"
						>Introduction</a
					>
					<a href="/docs/quick-start" class="block text-on-muted hover:text-on-surface"
						>Quick Start</a
					>
					<a href="/docs/components-list" class="block text-on-muted hover:text-on-surface"
						>Components</a
					>
				</div>
			</div>

			<div>
				<h4 class="font-semibold mb-4">Resources</h4>
				<div class="space-y-2 text-sm">
					<a href="/docs/design-principles" class="block text-on-muted hover:text-on-surface"
						>Design Principles</a
					>
					<a href="/docs/changelog" class="block text-on-muted hover:text-on-surface">Changelog</a>
					<a href="https://github.com" class="block text-on-muted hover:text-on-surface">GitHub</a>
				</div>
			</div>

			<div>
				<h4 class="font-semibold mb-4">Community</h4>
				<div class="space-y-2 text-sm">
					<a href="#" class="block text-on-muted hover:text-on-surface">Discord</a>
					<a href="#" class="block text-on-muted hover:text-on-surface">Twitter</a>
					<a href="#" class="block text-on-muted hover:text-on-surface">Blog</a>
				</div>
			</div>
		</div>

		<Divider class="my-8" />

		<div class="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-on-muted">
			<p>© 2024 SappsUI. All rights reserved.</p>
			<div class="flex gap-6">
				<a href="#" class="hover:text-on-surface">Privacy</a>
				<a href="#" class="hover:text-on-surface">Terms</a>
				<a href="#" class="hover:text-on-surface">License</a>
			</div>
		</div>
	</div>
</footer>

<style>
	:global(body) {
		margin: 0;
		overflow-x: hidden;
	}
</style>
