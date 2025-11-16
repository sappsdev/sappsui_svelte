import { circleFlags } from './circle-flags.js';
import { fluentIcons } from './fluent.js';
import { svgSpinners } from './svg-spinners.js';

export const icons = {
	...fluentIcons,
	...circleFlags,
	...svgSpinners
};
export type IconName = keyof typeof icons;
