<script lang="ts">
	import DocCode from '$lib/components/DocCode.svelte';
	import DocHeader from '$lib/components/DocHeader.svelte';
	import DocOptions from '$lib/components/DocOptions.svelte';
	import DocPreview from '$lib/components/DocPreview.svelte';
	import DocProps from '$lib/components/DocProps.svelte';
	import { Chart, Select } from 'sappsui';
	import type { ChartData, ChartOptions, ChartType } from 'chart.js/auto';

	const chartTypeOptions = [
		{ id: 'bar', label: 'Bar' },
		{ id: 'line', label: 'Line' },
		{ id: 'doughnut', label: 'Doughnut' },
		{ id: 'pie', label: 'Pie' }
	];

	let chartType: any = $state('bar');

	const getColor = (color: string) => {
		if (typeof window !== 'undefined') {
			return getComputedStyle(document.documentElement).getPropertyValue(`--color-${color}`).trim();
		}
		return color;
	};

	const generateRandomData = (count: number, min: number = 0, max: number = 100) => {
		return Array.from({ length: count }, () => Math.floor(Math.random() * (max - min + 1)) + min);
	};

	let chartConfig = $derived.by(() => {
		const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
		const primaryColor = getColor('primary');
		const secondaryColor = getColor('secondary');
		const successColor = getColor('success');
		const infoColor = getColor('info');
		const warningColor = getColor('warning');
		const dangerColor = getColor('danger');

		const baseOptions: ChartOptions = {
			responsive: true,
			maintainAspectRatio: true,
			plugins: {
				legend: {
					position: 'top'
				}
			}
		};

		if (chartType === 'bar') {
			const data: ChartData = {
				labels: labels,
				datasets: [
					{
						label: 'Primary Dataset',
						data: generateRandomData(7, -100, 100),
						borderColor: primaryColor,
						backgroundColor: primaryColor + '80',
						borderWidth: 2,
						borderRadius: 8,
						borderSkipped: false
					},
					{
						label: 'Secondary Dataset',
						data: generateRandomData(7, -100, 100),
						borderColor: secondaryColor,
						backgroundColor: secondaryColor + '80',
						borderWidth: 2,
						borderRadius: 8,
						borderSkipped: false
					}
				]
			};

			const options: ChartOptions = {
				...baseOptions,
				plugins: {
					...baseOptions.plugins,
					title: {
						display: true,
						text: 'Bar Chart Example'
					}
				}
			};

			return { type: chartType, data, options };
		} else if (chartType === 'line') {
			const data: ChartData = {
				labels: labels,
				datasets: [
					{
						label: 'Primary Line',
						data: generateRandomData(7, 20, 90),
						borderColor: primaryColor,
						backgroundColor: 'transparent',
						borderWidth: 3,
						pointBackgroundColor: primaryColor,
						pointBorderColor: '#fff',
						pointBorderWidth: 2,
						pointRadius: 5,
						pointHoverRadius: 7,
						fill: false,
						tension: 0.4
					},
					{
						label: 'Success Line',
						data: generateRandomData(7, 20, 90),
						borderColor: successColor,
						backgroundColor: 'transparent',
						borderWidth: 3,
						pointBackgroundColor: successColor,
						pointBorderColor: '#fff',
						pointBorderWidth: 2,
						pointRadius: 5,
						pointHoverRadius: 7,
						fill: false,
						tension: 0.4
					}
				]
			};

			const options: ChartOptions = {
				...baseOptions,
				plugins: {
					...baseOptions.plugins,
					title: {
						display: true,
						text: 'Line Chart Example'
					}
				},
				interaction: {
					intersect: false,
					mode: 'index'
				},
				scales: {
					y: {
						beginAtZero: true,
						grid: {
							color: 'rgba(0, 0, 0, 0.05)'
						}
					},
					x: {
						grid: {
							display: false
						}
					}
				}
			};

			return { type: chartType, data, options };
		} else if (chartType === 'doughnut') {
			const data: ChartData = {
				labels: ['Primary', 'Secondary', 'Success', 'Info', 'Warning'],
				datasets: [
					{
						label: 'Dataset',
						data: generateRandomData(5, 10, 100),
						backgroundColor: [primaryColor, secondaryColor, successColor, infoColor, warningColor],
						borderWidth: 2
					}
				]
			};

			const options: ChartOptions = {
				...baseOptions,
				plugins: {
					...baseOptions.plugins,
					title: {
						display: true,
						text: 'Doughnut Chart Example'
					}
				}
			};

			return { type: chartType, data, options };
		} else {
			const data: ChartData = {
				labels: ['Primary', 'Secondary', 'Success', 'Danger', 'Info'],
				datasets: [
					{
						label: 'Dataset',
						data: generateRandomData(5, 10, 100),
						backgroundColor: [primaryColor, secondaryColor, successColor, dangerColor, infoColor],
						borderWidth: 2
					}
				]
			};

			const options: ChartOptions = {
				...baseOptions,
				plugins: {
					...baseOptions.plugins,
					title: {
						display: true,
						text: 'Pie Chart Example'
					}
				}
			};

			return { type: chartType, data, options };
		}
	});

	let code = $derived(() => {
		const isBarOrLine = chartType === 'bar' || chartType === 'line';
		const isPieOrDoughnut = chartType === 'pie' || chartType === 'doughnut';

		const scriptLines = [
			`<script lang="ts">`,
			`\timport { Chart } from 'sappsui';`,
			`\timport type { ChartData, ChartOptions } from 'chart.js/auto';`,
			``,
			`\tconst chartData: ChartData = {`,
			isBarOrLine
				? `\t\tlabels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],`
				: `\t\tlabels: ['Primary', 'Secondary', 'Success', 'Info', 'Warning'],`,
			`\t\tdatasets: [{`,
			`\t\t\tlabel: 'Dataset',`,
			isBarOrLine
				? `\t\t\tdata: [65, 59, 80, 81, 56, 55, 40],`
				: `\t\t\tdata: [30, 20, 25, 15, 10],`,
			isBarOrLine ? `\t\t\tborderColor: 'var(--color-primary)',` : '',
			isBarOrLine ? `\t\t\tbackgroundColor: 'var(--color-primary)',` : '',
			chartType === 'bar' ? `\t\t\tborderWidth: 2,` : '',
			chartType === 'bar' ? `\t\t\tborderRadius: 8,` : '',
			chartType === 'line' ? `\t\t\tfill: true,` : '',
			chartType === 'line' ? `\t\t\ttension: 0.4` : '',
			isPieOrDoughnut
				? `\t\t\tbackgroundColor: [
\t\t\t\t'var(--color-primary)',
\t\t\t\t'var(--color-secondary)',
\t\t\t\t'var(--color-success)',
\t\t\t\t'var(--color-info)',
\t\t\t\t'var(--color-warning)'
\t\t\t]`
				: '',
			`\t\t}]`,
			`\t};`,
			``,
			`\tconst options: ChartOptions = {`,
			`\t\tresponsive: true,`,
			`\t\tplugins: {`,
			`\t\t\tlegend: { position: 'top' },`,
			`\t\t\ttitle: {`,
			`\t\t\t\tdisplay: true,`,
			`\t\t\t\ttext: '${chartType.charAt(0).toUpperCase() + chartType.slice(1)} Chart'`,
			`\t\t\t}`,
			`\t\t}`,
			`\t};`,
			`<\/script>`,
			``,
			`<Chart type="${chartType}" data={chartData} options={options} />`
		].filter(Boolean);

		return scriptLines.join('\n');
	});

	const props = [
		{ prop: 'type', type: 'ChartType', initial: '', required: true },
		{ prop: 'data', type: 'ChartData', initial: '', required: true },
		{ prop: 'options', type: 'ChartOptions', initial: '{}' },
		{ prop: 'class', type: 'string', initial: '' }
	];
</script>

{#snippet preview()}
	<div class="w-full">
		<Chart type={chartConfig.type} data={chartConfig.data} options={chartConfig.options} />
	</div>
{/snippet}

{#snippet builder()}
	<Select
		label="Chart Type"
		name="chart_type"
		size="sm"
		options={chartTypeOptions}
		bind:value={chartType}
	/>

	<DocOptions title="Info">
		<p class="text-sm text-muted-foreground">
			Change the chart type to see different visualizations. The data and colors update
			automatically using the design system tokens.
		</p>
	</DocOptions>
{/snippet}

<DocHeader title="Chart">
	Chart is a wrapper component for Chart.js that allows you to create various types of charts (bar,
	line, pie, doughnut, etc.) with seamless integration to your design system. It uses CSS custom
	properties for colors, ensuring consistency across your application.
</DocHeader>

<DocPreview {preview} {builder} />

<DocCode code={code()} />

<DocProps {props} />

<div class="prose prose-sm max-w-none mt-8">
	<h3>Color Tokens</h3>
	<p>
		The Chart component integrates with your design system color tokens. Use these CSS variables for
		consistent styling:
	</p>
	<ul>
		<li><code>--color-primary</code></li>
		<li><code>--color-secondary</code></li>
		<li><code>--color-muted</code></li>
		<li><code>--color-success</code></li>
		<li><code>--color-info</code></li>
		<li><code>--color-warning</code></li>
		<li><code>--color-danger</code></li>
	</ul>

	<h3>Chart Types</h3>
	<p>
		The component supports all Chart.js chart types including: <code>bar</code>, <code>line</code>,
		<code>pie</code>, <code>doughnut</code>, <code>radar</code>, <code>polarArea</code>,
		<code>bubble</code>, and <code>scatter</code>.
	</p>

	<h3>Resources</h3>
	<p>
		For more information about available options and configurations, visit the
		<a href="https://www.chartjs.org/docs/latest/" target="_blank" rel="noopener" class="link">
			Chart.js documentation
		</a>.
	</p>
</div>
