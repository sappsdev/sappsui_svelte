<script lang="ts" module>
	import {
		circleFlagsIcons,
		fluentFilledIcons,
		fluentRegularIcons,
		logosIcons,
		solarBoldIcons,
		solarBoldDuotoneIcons,
		solarBrokenIcons,
		solarLineDuotoneIcons,
		solarLinearIcons,
		solarOutlineIcons,
		svgSpinnersIcons
	} from 'sappsicons';

	export const icons = {
		...circleFlagsIcons,
		...fluentFilledIcons,
		...fluentRegularIcons,
		...logosIcons,
		...solarBoldIcons,
		...solarBoldDuotoneIcons,
		...solarBrokenIcons,
		...solarLineDuotoneIcons,
		...solarLinearIcons,
		...solarOutlineIcons,
		...svgSpinnersIcons
	};

	export type IconName = keyof typeof icons;
</script>

<script lang="ts">
	type Props = {
		name: IconName;
		class?: string;
	};
	const { name, class: className }: Props = $props();
</script>

<svg viewBox={icons[name].viewBox} class={className} xmlns="http://www.w3.org/2000/svg">
	{@html icons[name].body}
</svg>
