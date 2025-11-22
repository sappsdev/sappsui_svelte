type ToastPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

let toastPositionValue = $state<ToastPosition>('bottom-left');
let toastIconValue = $state(false);

export const storeApp = {
	get toastPosition() {
		return toastPositionValue;
	},
	set toastPosition(value: ToastPosition) {
		toastPositionValue = value;
	},
	get toastIcon() {
		return toastIconValue;
	},
	set toastIcon(value: boolean) {
		toastIconValue = value;
	}
};
