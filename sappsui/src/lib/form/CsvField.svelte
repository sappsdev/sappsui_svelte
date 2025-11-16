<script>
	// Props
	let {
		requiredColumns = [],
		onMappingComplete = () => {},
		acceptMultipleFiles = false
	} = $props();

	// Estado reactivo
	let fileInput = $state(null);
	let selectedFile = $state(null);
	let showModal = $state(false);
	let csvColumns = $state([]);
	let columnMapping = $state({});
	let parseError = $state(null);
	let csvData = $state([]);

	// Función para manejar la selección de archivo
	function handleFileSelect(event) {
		const file = event.target.files[0];
		if (!file) return;

		if (!file.name.endsWith('.csv')) {
			parseError = 'Por favor selecciona un archivo CSV válido';
			return;
		}

		selectedFile = file;
		parseError = null;
		parseCSV(file);
	}

	// Función para parsear el CSV
	function parseCSV(file) {
		const reader = new FileReader();

		reader.onload = (e) => {
			try {
				const text = e.target.result;
				const lines = text.split('\n').filter((line) => line.trim());

				if (lines.length === 0) {
					parseError = 'El archivo CSV está vacío';
					return;
				}

				// Detectar el delimitador (coma o punto y coma)
				const delimiter = text.includes(';') ? ';' : ',';

				// Obtener las columnas del CSV
				const headers = lines[0].split(delimiter).map((h) => h.trim().replace(/^"|"$/g, ''));
				csvColumns = headers;

				// Parsear todas las filas
				csvData = lines.slice(1).map((line) => {
					const values = line.split(delimiter).map((v) => v.trim().replace(/^"|"$/g, ''));
					const row = {};
					headers.forEach((header, idx) => {
						row[header] = values[idx] || '';
					});
					return row;
				});

				// Inicializar el mapeo con coincidencias automáticas
				const initialMapping = {};
				requiredColumns.forEach((reqCol) => {
					// Buscar coincidencia exacta (case-insensitive)
					const match = headers.find((h) => h.toLowerCase() === reqCol.toLowerCase());
					initialMapping[reqCol] = match || '';
				});
				columnMapping = initialMapping;

				// Mostrar modal
				showModal = true;
			} catch (error) {
				parseError = 'Error al parsear el archivo CSV: ' + error.message;
			}
		};

		reader.onerror = () => {
			parseError = 'Error al leer el archivo';
		};

		reader.readAsText(file);
	}

	// Función para manejar el cambio de mapeo
	function handleMappingChange(requiredCol, csvCol) {
		columnMapping[requiredCol] = csvCol;
	}

	// Función para confirmar el mapeo
	function confirmMapping() {
		// Validar que todas las columnas requeridas estén mapeadas
		const unmappedColumns = requiredColumns.filter((col) => !columnMapping[col]);

		if (unmappedColumns.length > 0) {
			alert(`Por favor mapea las siguientes columnas: ${unmappedColumns.join(', ')}`);
			return;
		}

		// Transformar los datos con el nuevo mapeo
		const mappedData = csvData.map((row) => {
			const newRow = {};
			Object.entries(columnMapping).forEach(([requiredCol, csvCol]) => {
				newRow[requiredCol] = row[csvCol] || '';
			});
			return newRow;
		});

		// Llamar al callback con los datos mapeados y el mapeo
		onMappingComplete({
			file: selectedFile,
			mapping: columnMapping,
			data: mappedData,
			originalData: csvData
		});

		// Cerrar modal y resetear
		closeModal();
	}

	// Función para cerrar el modal
	function closeModal() {
		showModal = false;
		selectedFile = null;
		if (fileInput) fileInput.value = '';
	}

	// Función para obtener una vista previa de los datos
	function getPreviewData(requiredCol) {
		const csvCol = columnMapping[requiredCol];
		if (!csvCol || csvData.length === 0) return 'N/A';
		return csvData[0][csvCol] || 'N/A';
	}
</script>

<div class="csv-field-container">
	<label class="file-input-wrapper">
		<input
			type="file"
			accept=".csv"
			bind:this={fileInput}
			onchange={handleFileSelect}
			class="file-input"
		/>
		<button type="button" class="upload-button" onclick={() => fileInput?.click()}>
			<svg
				xmlns="http://www.w3.org/2000/svg"
				width="20"
				height="20"
				viewBox="0 0 24 24"
				fill="none"
				stroke="currentColor"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			>
				<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
				<polyline points="17 8 12 3 7 8"></polyline>
				<line x1="12" y1="3" x2="12" y2="15"></line>
			</svg>
			{selectedFile ? selectedFile.name : 'Seleccionar archivo CSV'}
		</button>
	</label>

	{#if parseError}
		<div class="error-message">
			{parseError}
		</div>
	{/if}
</div>

{#if showModal}
	<div class="modal-overlay" onclick={closeModal}>
		<div class="modal-content" onclick={(e) => e.stopPropagation()}>
			<div class="modal-header">
				<h2>Mapear Columnas del CSV</h2>
				<button class="close-button" onclick={closeModal}>×</button>
			</div>

			<div class="modal-body">
				<p class="instructions">
					Asocia cada columna requerida con la columna correspondiente del archivo CSV:
				</p>

				<div class="mapping-list">
					{#each requiredColumns as requiredCol}
						<div class="mapping-item">
							<label class="required-label">
								{requiredCol}
								<span class="required-mark">*</span>
							</label>

							<select
								class="column-select"
								value={columnMapping[requiredCol]}
								onchange={(e) => handleMappingChange(requiredCol, e.target.value)}
							>
								<option value="">-- Seleccionar columna --</option>
								{#each csvColumns as csvCol}
									<option value={csvCol}>{csvCol}</option>
								{/each}
							</select>

							{#if columnMapping[requiredCol]}
								<div class="preview">
									Vista previa: <strong>{getPreviewData(requiredCol)}</strong>
								</div>
							{/if}
						</div>
					{/each}
				</div>
			</div>

			<div class="modal-footer">
				<button class="cancel-button" onclick={closeModal}> Cancelar </button>
				<button class="confirm-button" onclick={confirmMapping}> Confirmar mapeo </button>
			</div>
		</div>
	</div>
{/if}

<style>
	.csv-field-container {
		width: 100%;
	}

	.file-input-wrapper {
		display: inline-block;
	}

	.file-input {
		display: none;
	}

	.upload-button {
		display: inline-flex;
		align-items: center;
		gap: 8px;
		padding: 10px 20px;
		background: #4f46e5;
		color: white;
		border: none;
		border-radius: 6px;
		font-size: 14px;
		cursor: pointer;
		transition: background 0.2s;
	}

	.upload-button:hover {
		background: #4338ca;
	}

	.error-message {
		margin-top: 10px;
		padding: 10px;
		background: #fee2e2;
		color: #dc2626;
		border-radius: 6px;
		font-size: 14px;
	}

	.modal-overlay {
		position: fixed;
		inset: 0;
		background: rgba(0, 0, 0, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;
		z-index: 1000;
		padding: 20px;
	}

	.modal-content {
		background: white;
		border-radius: 12px;
		width: 100%;
		max-width: 600px;
		max-height: 90vh;
		overflow: hidden;
		display: flex;
		flex-direction: column;
		box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1);
	}

	.modal-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
		padding: 20px;
		border-bottom: 1px solid #e5e7eb;
	}

	.modal-header h2 {
		margin: 0;
		font-size: 20px;
		font-weight: 600;
		color: #111827;
	}

	.close-button {
		background: none;
		border: none;
		font-size: 32px;
		color: #6b7280;
		cursor: pointer;
		line-height: 1;
		padding: 0;
		width: 32px;
		height: 32px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.close-button:hover {
		color: #111827;
	}

	.modal-body {
		padding: 20px;
		overflow-y: auto;
		flex: 1;
	}

	.instructions {
		margin: 0 0 20px 0;
		color: #6b7280;
		font-size: 14px;
	}

	.mapping-list {
		display: flex;
		flex-direction: column;
		gap: 20px;
	}

	.mapping-item {
		display: flex;
		flex-direction: column;
		gap: 8px;
	}

	.required-label {
		font-weight: 500;
		color: #374151;
		font-size: 14px;
	}

	.required-mark {
		color: #dc2626;
		margin-left: 2px;
	}

	.column-select {
		padding: 10px;
		border: 1px solid #d1d5db;
		border-radius: 6px;
		font-size: 14px;
		background: white;
		cursor: pointer;
	}

	.column-select:focus {
		outline: none;
		border-color: #4f46e5;
		box-shadow: 0 0 0 3px rgba(79, 70, 229, 0.1);
	}

	.preview {
		padding: 8px 12px;
		background: #f3f4f6;
		border-radius: 6px;
		font-size: 13px;
		color: #6b7280;
	}

	.preview strong {
		color: #111827;
	}

	.modal-footer {
		display: flex;
		justify-content: flex-end;
		gap: 12px;
		padding: 20px;
		border-top: 1px solid #e5e7eb;
	}

	.cancel-button,
	.confirm-button {
		padding: 10px 20px;
		border-radius: 6px;
		font-size: 14px;
		font-weight: 500;
		cursor: pointer;
		transition: all 0.2s;
	}

	.cancel-button {
		background: white;
		color: #374151;
		border: 1px solid #d1d5db;
	}

	.cancel-button:hover {
		background: #f9fafb;
	}

	.confirm-button {
		background: #4f46e5;
		color: white;
		border: none;
	}

	.confirm-button:hover {
		background: #4338ca;
	}
</style>
