<script lang="ts">
	import {
		StarsMinimalisticLinearIcon,
		Rocket24RegularIcon,
		SparkleAction24RegularIcon,
		Code24RegularIcon
	} from '$lib/icons';
	import { Chip, Section, Card, Button, Icon } from 'sappsui';
</script>

<!-- Hero Section -->
<Section bodyClass="items-center gap-6 text-center px-4 mt-6 md:mt-10 xl:mt-16">
	<Chip startIcon={StarsMinimalisticLinearIcon} size="md" isSolid>Modern UI Component Library</Chip>

	<h1 class="hero-title max-w-4xl">
		Build beautiful web apps <span class="gradient-text">faster</span> with SappsUI
	</h1>

	<p class="hero-subtitle max-w-2xl">
		A comprehensive Svelte component library that handles the complexity, so you can focus on
		building great products. Optimized for AI code generation and mobile-first design.
	</p>

	<div class="row gap-4 flex-wrap justify-center">
		<Button variant="secondary" size="lg" href="/docs">Get Started</Button>
		<Button variant="outlined" size="lg" href="/components">View Components</Button>
	</div>

	<p class="text-sm opacity-70">No credit card required · Open source</p>
</Section>

<!-- Features Section -->
<Section isBoxed bodyClass="gap-12 py-20">
	<div class="center gap-4 text-center mb-8">
		<h2 class="text-3xl md:text-4xl font-bold">Why developers love SappsUI</h2>
		<p class="text-lg opacity-80 max-w-2xl">
			Everything you need to ship beautiful, responsive web applications in record time
		</p>
	</div>

	<div class="grid-1 md:grid-3 gap-6">
		<Card variant="outlined" hasShadow bodyClass="center gap-4 text-center p-6">
			<div class="icon-wrapper">
				<Icon icon={Rocket24RegularIcon} class="w-12 h-12" />
			</div>
			<h3 class="text-xl font-semibold">Lightning Fast</h3>
			<p class="opacity-80">
				Optimized components that don't sacrifice performance. Built with Svelte for maximum speed.
			</p>
		</Card>

		<Card variant="outlined" hasShadow bodyClass="center gap-4 text-center p-6">
			<div class="icon-wrapper">
				<Icon icon={Code24RegularIcon} class="w-12 h-12" />
			</div>
			<h3 class="text-xl font-semibold">Developer First</h3>
			<p class="opacity-80">
				Intuitive API, excellent TypeScript support, and semantic component names you'll remember.
			</p>
		</Card>

		<Card variant="outlined" hasShadow bodyClass="center gap-4 text-center p-6">
			<div class="icon-wrapper">
				<Icon icon={SparkleAction24RegularIcon} class="w-12 h-12" />
			</div>
			<h3 class="text-xl font-semibold">AI-Optimized</h3>
			<p class="opacity-80">
				Documentation structured for AI code generation. Build faster with Claude, GPT, and more.
			</p>
		</Card>
	</div>
</Section>

<!-- Code Example Section -->
<Section variant="ghost" isBoxed bodyClass="gap-8 py-20">
	<div class="center gap-4 text-center">
		<h2 class="text-3xl md:text-4xl font-bold">Simple, intuitive syntax</h2>
		<p class="text-lg opacity-80 max-w-2xl">
			Write less code, ship more features. SappsUI makes building UIs a breeze.
		</p>
	</div>

	<Card variant="outlined" hasShadow bodyClass="column gap-4">
		<pre class="language-svelte"><code
				>{`<Section variant="primary" bodyClass="center gap-6">
  <Card variant="outlined" hasShadow>
    <h3>Beautiful Card</h3>
    <p>With just a few lines of code</p>
    <Button variant="primary">Get Started</Button>
  </Card>
</Section>`}</code
			></pre>
	</Card>
</Section>

<!-- Stats Section -->
<Section variant="secondary" isSolid bodyClass="py-16">
	<div class="grid-1 md:grid-3 gap-8 text-center">
		<div class="column gap-2">
			<p class="text-5xl font-bold">50+</p>
			<p class="text-lg opacity-90">Components</p>
		</div>
		<div class="column gap-2">
			<p class="text-5xl font-bold">100%</p>
			<p class="text-lg opacity-90">TypeScript</p>
		</div>
		<div class="column gap-2">
			<p class="text-5xl font-bold">A11y</p>
			<p class="text-lg opacity-90">Accessible</p>
		</div>
	</div>
</Section>

<!-- CTA Section -->
<Section variant="primary" isSolid bodyClass="center gap-6 py-20 text-center">
	<h2 class="text-3xl md:text-5xl font-bold max-w-3xl">Ready to build something amazing?</h2>
	<p class="text-lg md:text-xl opacity-90 max-w-2xl">
		Join developers who are shipping faster with SappsUI
	</p>
	<Button variant="secondary" size="lg" href="/get-started">Start Building Now</Button>
</Section>

<style>
	.gradient-text {
		background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
		-webkit-background-clip: text;
		-webkit-text-fill-color: transparent;
		background-clip: text;
	}

	.icon-wrapper {
		width: 64px;
		height: 64px;
		display: flex;
		align-items: center;
		justify-content: center;
		background: rgba(102, 126, 234, 0.1);
		border-radius: 12px;
	}

	pre {
		background: rgba(0, 0, 0, 0.05);
		padding: 1.5rem;
		border-radius: 8px;
		overflow-x: auto;
		text-align: left;
	}

	code {
		font-family: 'Fira Code', 'Consolas', monospace;
		font-size: 0.9rem;
		line-height: 1.6;
	}
</style>
