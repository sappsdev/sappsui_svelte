<script lang="ts">
	import { CsvField } from 'sappsui';
	function handleMapping(result) {
		console.log('Mapeo:', result.mapping);
		console.log('Datos transformados:', result.data);

		// Opción 1: Enviar solo el mapeo al servidor
		// await fetch('/api/upload', {
		//   body: JSON.stringify({
		//     mapping: result.mapping
		//   })
		// });

		// Opción 2: Enviar datos ya transformados
		// await fetch('/api/upload', {
		//   body: JSON.stringify({
		//     data: result.data
		//   })
		// });
	}
</script>

<CsvField
	requiredColumns={['name', 'address', 'email', 'phone']}
	onMappingComplete={handleMapping}
/>
