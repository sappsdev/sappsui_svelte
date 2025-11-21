<script lang="ts">
	import {
		BarChart,
		LineChart,
		AreaChart,
		PieChart,
		CandlestickChart,
		ArcChart,
		ScatterChart
	} from 'sappsui';

	// Ejemplo BarChart
	const barData = [
		{ label: 'Enero', value: 65 },
		{ label: 'Febrero', value: 78 },
		{ label: 'Marzo', value: 90 },
		{ label: 'Abril', value: 81 },
		{ label: 'Mayo', value: 95 }
	];

	// Ejemplo PieChart
	const pieData = [
		{ label: 'Producto A', value: 30 },
		{ label: 'Producto B', value: 25 },
		{ label: 'Producto C', value: 20 },
		{ label: 'Producto D', value: 15 },
		{ label: 'Producto E', value: 10 }
	];

	// Ejemplo CandlestickChart
	const candlestickData = [
		{ date: new Date(2024, 0, 1), open: 100, high: 110, low: 95, close: 105 },
		{ date: new Date(2024, 0, 2), open: 105, high: 115, low: 100, close: 112 },
		{ date: new Date(2024, 0, 3), open: 112, high: 120, low: 108, close: 110 },
		{ date: new Date(2024, 0, 4), open: 110, high: 118, low: 105, close: 115 },
		{ date: new Date(2024, 0, 5), open: 115, high: 125, low: 112, close: 122 },
		{ date: new Date(2024, 0, 6), open: 122, high: 130, low: 118, close: 128 },
		{ date: new Date(2024, 0, 7), open: 128, high: 135, low: 125, close: 130 },
		{ date: new Date(2024, 0, 8), open: 130, high: 140, low: 128, close: 138 },
		{ date: new Date(2024, 0, 9), open: 138, high: 145, low: 135, close: 142 },
		{ date: new Date(2024, 0, 10), open: 142, high: 150, low: 140, close: 148 },
		{ date: new Date(2024, 0, 11), open: 148, high: 155, low: 145, close: 150 },
		{ date: new Date(2024, 0, 12), open: 150, high: 160, low: 148, close: 158 },
		{ date: new Date(2024, 0, 13), open: 158, high: 165, low: 155, close: 162 },
		{ date: new Date(2024, 0, 14), open: 162, high: 170, low: 160, close: 168 },
		{ date: new Date(2024, 0, 15), open: 168, high: 175, low: 165, close: 172 }
	];

	const gaugeData = [
		{ label: 'Progreso', value: 75 },
		{ label: 'Restante', value: 25 }
	];

	// Semi-círculo con múltiples segmentos
	const semiCircleData = [
		{ label: 'Completado', value: 40 },
		{ label: 'En progreso', value: 30 },
		{ label: 'Pendiente', value: 30 }
	];

	// Speedometer
	const speedData = [
		{ label: 'Bajo', value: 20, color: 'var(--color-success)' },
		{ label: 'Medio', value: 30, color: 'var(--color-warning)' },
		{ label: 'Alto', value: 25, color: 'var(--color-danger)' }
	];

	// Línea simple
	const simpleData = [
		{ date: '2024-01', value: 30 },
		{ date: '2024-02', value: 45 },
		{ date: '2024-03', value: 28 },
		{ date: '2024-04', value: 60 },
		{ date: '2024-05', value: 35 }
	];

	// Múltiples series
	const multiSeriesData = [
		{ month: 'Ene', ventas: 30, gastos: 20, profit: 10 },
		{ month: 'Feb', ventas: 45, gastos: 25, profit: 20 },
		{ month: 'Mar', ventas: 28, gastos: 22, profit: 6 },
		{ month: 'Abr', ventas: 60, gastos: 30, profit: 30 },
		{ month: 'May', ventas: 35, gastos: 28, profit: 7 }
	];

	const series = [
		{ key: 'ventas', label: 'Ventas', color: 'var(--color-primary)' },
		{ key: 'gastos', label: 'Gastos', color: 'var(--color-danger)' },
		{ key: 'profit', label: 'Ganancia', color: 'var(--color-success)' }
	];

	// Scatter simple
	const scatterData = [
		{ height: 165, weight: 65, age: 25 },
		{ height: 170, weight: 70, age: 30 },
		{ height: 175, weight: 75, age: 35 },
		{ height: 180, weight: 80, age: 40 },
		{ height: 160, weight: 60, age: 22 },
		{ height: 168, weight: 68, age: 28 },
		{ height: 172, weight: 72, age: 32 },
		{ height: 178, weight: 78, age: 38 }
	];

	// Múltiples series
	const maleData = [
		{ height: 175, weight: 75, age: 25 },
		{ height: 180, weight: 80, age: 30 },
		{ height: 178, weight: 78, age: 28 },
		{ height: 182, weight: 82, age: 35 }
	];

	const femaleData = [
		{ height: 165, weight: 65, age: 25 },
		{ height: 160, weight: 60, age: 22 },
		{ height: 168, weight: 68, age: 28 },
		{ height: 162, weight: 62, age: 24 }
	];

	const multiSeries = [
		{ key: 'male', label: 'Hombres', color: 'var(--color-primary)', data: maleData },
		{ key: 'female', label: 'Mujeres', color: 'var(--color-danger)', data: femaleData }
	];

	// Datos con tamaño variable
	const bubbleData = [
		{ x: 10, y: 20, size: 5 },
		{ x: 20, y: 30, size: 10 },
		{ x: 30, y: 25, size: 8 },
		{ x: 40, y: 35, size: 12 },
		{ x: 50, y: 40, size: 15 }
	];
</script>

<div class="space-y-8 p-8">
	<section>
		<h2 class="text-2xl font-bold mb-4">Candlestick Chart</h2>
		<CandlestickChart data={candlestickData} class="w-full h-80" />
	</section>

	<section>
		<h2 class="text-2xl font-bold mb-4">Donut Chart</h2>
		<PieChart
			data={pieData}
			innerRadius={50}
			outerRadius={-20}
			showLegend={true}
			legendPlacement="right"
			class="w-full h-64"
		/>
	</section>

	<section>
		<h2 class="text-2xl font-bold mb-4">Bar Chart Vertical</h2>
		<BarChart data={barData} color="var(--color-primary)" radius={4} class="w-full h-64" />
	</section>

	<section>
		<h2 class="text-2xl font-bold mb-4">Bar Chart Horizontal</h2>
		<BarChart data={barData} horizontal={true} color="var(--color-success)" class="w-full h-64" />
	</section>

	<section>
		<h2 class="text-2xl font-bold mb-4">Bar Chart con Leyenda</h2>
		<BarChart data={barData} showLegend={true} legendPlacement="top-right" class="w-full h-72" />
	</section>

	<section>
		<h2 class="text-2xl font-bold mb-4">Gauge Chart</h2>
		<ArcChart
			data={gaugeData}
			range={[0, 180]}
			innerRadius={60}
			outerRadius={-20}
			showLegend={true}
			legendPlacement="bottom"
			class="w-full h-64"
		/>
	</section>

	<!-- Arc completo tipo velocímetro -->
	<section>
		<h2 class="text-2xl font-bold mb-4">Speedometer</h2>
		<ArcChart
			data={speedData}
			range={[-90, 90]}
			innerRadius={70}
			outerRadius={-15}
			cornerRadius={12}
			padAngle={0.05}
			placement="center"
			showLegend={true}
			legendPlacement="bottom"
			class="w-full h-64"
		/>
	</section>

	<!-- Arc parcial izquierda -->
	<section>
		<h2 class="text-2xl font-bold mb-4">Progress Arc</h2>
		<ArcChart
			data={semiCircleData}
			range={[0, 270]}
			innerRadius={50}
			outerRadius={-25}
			placement="left"
			showLegend={true}
			legendPlacement="right"
			legendOrientation="vertical"
			class="w-full h-64"
		/>
	</section>

	<!-- Gauge con valor máximo -->
	<section>
		<h2 class="text-2xl font-bold mb-4">Gauge with Max Value</h2>
		<ArcChart
			data={[{ label: 'Current', value: 65 }]}
			maxValue={100}
			outerRadius={-25}
			innerRadius={-20}
			cornerRadius={10}
			class="w-full h-64"
		/>
	</section>

	<!-- Línea simple -->
	<section>
		<h2 class="text-2xl font-bold mb-4">Line Chart Simple</h2>
		<LineChart data={simpleData} x="date" y="value" class="w-full h-64" />
	</section>

	<!-- Múltiples series -->
	<section>
		<h2 class="text-2xl font-bold mb-4">Multi-Series Line Chart</h2>
		<LineChart
			data={multiSeriesData}
			x="month"
			{series}
			showLegend={true}
			legendPlacement="top-right"
			showPoints={true}
			class="w-full h-64"
		/>
	</section>

	<section>
		<h2 class="text-2xl font-bold mb-4">Area Chart Simple</h2>
		<AreaChart data={simpleData} x="date" y="value" class="w-full h-64" />
	</section>

	<!-- Área con puntos -->
	<section>
		<h2 class="text-2xl font-bold mb-4">Area Chart con Puntos</h2>
		<AreaChart
			data={simpleData}
			x="date"
			y="value"
			showPoints={true}
			curve="linear"
			class="w-full h-64"
		/>
	</section>

	<!-- Múltiples áreas superpuestas -->
	<section>
		<h2 class="text-2xl font-bold mb-4">Multi-Series Area Chart</h2>
		<AreaChart
			data={multiSeriesData}
			x="month"
			{series}
			seriesLayout="overlap"
			showLegend={true}
			legendPlacement="top-right"
			fillOpacity={0.4}
			class="w-full h-64"
		/>
	</section>

	<!-- Áreas apiladas (stacked) -->
	<section>
		<h2 class="text-2xl font-bold mb-4">Stacked Area Chart</h2>
		<AreaChart
			data={multiSeriesData}
			x="month"
			{series}
			seriesLayout="stack"
			showLegend={true}
			legendPlacement="top-right"
			class="w-full h-64"
		/>
	</section>

	<!-- Áreas apiladas al 100% -->
	<section>
		<h2 class="text-2xl font-bold mb-4">Stacked Area Chart (100%)</h2>
		<AreaChart
			data={multiSeriesData}
			x="month"
			{series}
			seriesLayout="stackExpand"
			showLegend={true}
			legendPlacement="top-right"
			class="w-full h-64"
		/>
	</section>

	<!-- Área con curva suave -->
	<section>
		<h2 class="text-2xl font-bold mb-4">Smooth Area</h2>
		<AreaChart
			data={simpleData}
			x="date"
			y="value"
			curve="catmullRom"
			fillOpacity={0.5}
			strokeWidth={3}
			class="w-full h-64"
		/>
	</section>

	<!-- Área radial -->
	<section>
		<h2 class="text-2xl font-bold mb-4">Radial Area Chart</h2>
		<AreaChart
			data={simpleData}
			x="date"
			y="value"
			radial={true}
			showPoints={true}
			class="w-full h-64"
		/>
	</section>

	<!-- Área escalonada -->
	<section>
		<h2 class="text-2xl font-bold mb-4">Step Area Chart</h2>
		<AreaChart
			data={simpleData}
			x="date"
			y="value"
			curve="step"
			showPoints={true}
			class="w-full h-64"
		/>
	</section>

	<!-- Scatter simple -->
	<section>
		<h2 class="text-2xl font-bold mb-4">Scatter Chart Simple</h2>
		<ScatterChart data={scatterData} x="height" y="weight" class="w-full h-64" />
	</section>

	<!-- Scatter con múltiples series -->
	<section>
		<h2 class="text-2xl font-bold mb-4">Multi-Series Scatter Chart</h2>
		<ScatterChart
			x="height"
			y="weight"
			series={multiSeries}
			showLegend={true}
			legendPlacement="top-right"
			class="w-full h-64"
		/>
	</section>

	<!-- Bubble chart (con tamaño variable) -->
	<section>
		<h2 class="text-2xl font-bold mb-4">Bubble Chart</h2>
		<ScatterChart data={bubbleData} x="x" y="y" r="size" pointSize={8} class="w-full h-64" />
	</section>

	<!-- Scatter con puntos grandes -->
	<section>
		<h2 class="text-2xl font-bold mb-4">Large Points Scatter</h2>
		<ScatterChart
			data={scatterData}
			x="height"
			y="weight"
			pointSize={8}
			strokeWidth={2}
			class="w-full h-64"
		/>
	</section>

	<!-- Scatter sin grid -->
	<section>
		<h2 class="text-2xl font-bold mb-4">Minimal Scatter Chart</h2>
		<ScatterChart
			data={scatterData}
			x="height"
			y="weight"
			showGrid={false}
			pointSize={6}
			class="w-full h-64"
		/>
	</section>

	<!-- Scatter con etiquetas -->
	<section>
		<h2 class="text-2xl font-bold mb-4">Scatter Chart con Labels</h2>
		<ScatterChart data={scatterData} x="height" y="weight" showLabels={true} class="w-full h-64" />
	</section>
</div>
