<script lang="ts">
	import { Provider } from 'sappsui';
	import '@fontsource-variable/inter';
	import '../app.css';
	let { children } = $props();
</script>

<Provider>{@render children()}</Provider>
