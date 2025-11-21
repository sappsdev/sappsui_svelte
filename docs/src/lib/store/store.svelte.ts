let toastPositionValue = $state('bottom-left');
let toastIconValue = $state(false);

export const storeApp = {
	get toastPosition() {
		return toastPositionValue;
	},
	set toastPosition(value: string) {
		toastPositionValue = value;
	},
	get toastIcon() {
		return toastIconValue;
	},
	set toastIcon(value: boolean) {
		toastIconValue = value;
	}
};
