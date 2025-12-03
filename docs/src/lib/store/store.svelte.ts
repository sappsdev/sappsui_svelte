type ToastPosition = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

let toastPositionValue = $state<ToastPosition>('bottom-left');
let toastIconValue = $state(false);
let toastSolidValue = $state(true);

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
	},
	get toastSolid() {
		return toastSolidValue;
	},
	set toastSolid(value: boolean) {
		toastSolidValue = value;
	}
};
