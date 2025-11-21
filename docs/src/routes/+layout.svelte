<script lang="ts">
	import { Provider } from 'sappsui';
	import '../app.css';
	import { storeApp } from '$lib/store/store.svelte';
	let { children } = $props();
</script>

<Provider toastPosition={storeApp.toastPosition} toastIcon={storeApp.toastIcon}>
	{@render children()}
</Provider>
