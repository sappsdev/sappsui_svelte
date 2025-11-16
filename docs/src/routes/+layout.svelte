<script lang="ts">
	import { Provider } from 'sappsui';
	import '../app.css';
	let { children } = $props();
</script>

<Provider>{@render children()}</Provider>
