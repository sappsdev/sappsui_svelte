<script lang="ts">
	import { Scaffold, AppBar, ToggleTheme } from 'sappsui';

	let { children } = $props();
</script>

<Scaffold
	mainClass="lg:ml-48 2xl:mr-56 vh-16 lg:p-4 mt-16"
	startClass="invisible lg:visible vh-16 mt-16"
	endClass="invisible 2xl:visible vh-16 mr-8 my-4 mt-16"
	bodyClass="boxed"
>
	{#snippet appBar()}
		<AppBar class="h-16" contentClass="boxed" isBlurred>
			{#snippet start()}
				<h4>SappsUI</h4>
			{/snippet}
			{#snippet end()}
				<ToggleTheme />
			{/snippet}
		</AppBar>
	{/snippet}
	{@render children()}
</Scaffold>
