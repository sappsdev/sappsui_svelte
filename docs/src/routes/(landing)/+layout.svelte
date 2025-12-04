<script lang="ts">
	import { Scaffold, AppBar, ToggleTheme } from 'sappsui';

	let { children } = $props();
</script>

<Scaffold
	mainClass="vh-16 mt-16"
	bodyClass=""
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
