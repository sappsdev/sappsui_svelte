export interface ToastMessage {
	id: string;
	icon?: string;
	title?: string;
	description: string;
	duration?: number;
	status: 'success' | 'error' | 'info' | 'warning';
}

let toastMessages = $state<ToastMessage[]>([]);

const toastShow = (message: Omit<ToastMessage, 'id'> & { id?: string }) => {
	const id = message.id || crypto.randomUUID();

	const newMessage = {
		id,
		title: message.title,
		description: message.description,
		status: message.status || 'info',
		duration: message.duration || 3000,
		icon: message.icon
	};

	toastMessages = [...toastMessages, newMessage];

	if (newMessage.duration && newMessage.duration > 0) {
		setTimeout(() => {
			toastClose(id);
		}, newMessage.duration);
	}

	return id;
};

const toastClose = (id: string) => {
	toastMessages = toastMessages.filter((m) => m.id !== id);
};

const toastCloseAll = () => {
	toastMessages = [];
};

export const toast = {
	get messages() {
		return toastMessages;
	},
	show: toastShow,
	close: toastClose,
	closeAll: toastCloseAll
};
