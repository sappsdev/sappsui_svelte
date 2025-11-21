<script lang="ts">
	import { ArcChart } from 'sappsui';
</script>

<div class="space-y-8 p-6">
	<!-- Gauge básico con track (estilo del ejemplo funcional) -->
	<section>
		<h2 class="text-2xl font-bold mb-4">Gauge Básico con Track</h2>
		<ArcChart
			data={[{ key: 'Example', value: 70 }]}
			key="key"
			value="value"
			maxValue={100}
			innerRadius={-20}
			trackOuterRadius={-5}
			trackInnerRadius={-10}
			cornerRadius={10}
			showLegend={false}
			class="w-full h-[200px]"
		/>
	</section>

	<!-- Gauge semi-círculo -->
	<section>
		<h2 class="text-2xl font-bold mb-4">Semi-Círculo con Track</h2>
		<ArcChart
			data={[{ key: 'progress', value: 65 }]}
			key="key"
			value="value"
			maxValue={100}
			range={[0, 180]}
			innerRadius={-25}
			trackOuterRadius={-10}
			trackInnerRadius={-20}
			cornerRadius={8}
			showLegend={false}
			class="w-full h-[200px]"
		/>
	</section>

	<!-- Gauge estilo velocímetro -->
	<section>
		<h2 class="text-2xl font-bold mb-4">Velocímetro</h2>
		<ArcChart
			data={[{ key: 'speed', value: 120 }]}
			key="key"
			value="value"
			maxValue={200}
			range={[-90, 90]}
			innerRadius={-20}
			trackOuterRadius={-5}
			trackInnerRadius={-15}
			cornerRadius={15}
			showLegend={false}
			class="w-full h-[200px]"
		/>
	</section>

	<!-- Gauge 3/4 círculo -->
	<section>
		<h2 class="text-2xl font-bold mb-4">Gauge 3/4 Círculo</h2>
		<ArcChart
			data={[{ key: 'completion', value: 75 }]}
			key="key"
			value="value"
			maxValue={100}
			range={[0, 270]}
			innerRadius={-20}
			trackOuterRadius={-5}
			trackInnerRadius={-15}
			cornerRadius={10}
			showLegend={false}
			class="w-full h-[250px]"
		/>
	</section>

	<!-- Círculo completo (donut gauge) -->
	<section>
		<h2 class="text-2xl font-bold mb-4">Donut Gauge (360°)</h2>
		<ArcChart
			data={[{ key: 'storage', value: 320 }]}
			key="key"
			value="value"
			maxValue={500}
			range={[0, 360]}
			innerRadius={-20}
			trackOuterRadius={-5}
			trackInnerRadius={-15}
			cornerRadius={10}
			showLegend={false}
			class="w-full h-[250px]"
		/>
	</section>

	<!-- Activity Rings (múltiples series) -->
	<section>
		<h2 class="text-2xl font-bold mb-4">Activity Rings</h2>
		<ArcChart
			key="key"
			value="value"
			series={[
				{
					key: 'move',
					data: [{ key: 'move', value: 400 }],
					maxValue: 1000,
					color: '#ef4444'
				},
				{
					key: 'exercise',
					data: [{ key: 'exercise', value: 20 }],
					maxValue: 30,
					color: '#a3e635'
				},
				{
					key: 'stand',
					data: [{ key: 'stand', value: 10 }],
					maxValue: 12,
					color: '#22d3ee'
				}
			]}
			range={[0, 360]}
			cornerRadius={10}
			padAngle={0.02}
			showLegend={true}
			legendPlacement="bottom"
			class="w-full h-80"
		/>
	</section>

	<!-- Gauge con color personalizado -->
	<section>
		<h2 class="text-2xl font-bold mb-4">Gauge con Color Personalizado</h2>
		<ArcChart
			data={[{ key: 'health', value: 85, color: '#10b981' }]}
			key="key"
			value="value"
			maxValue={100}
			range={[0, 180]}
			innerRadius={-15}
			trackOuterRadius={-5}
			trackInnerRadius={-12}
			cornerRadius={8}
			showLegend={false}
			class="w-full h-[180px]"
		/>
	</section>
</div>

<style>
	.space-y-8 > section {
		padding: 1.5rem;
		background: white;
		border-radius: 0.5rem;
		box-shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1);
	}
</style>
