export const debounce = (fn: (...args: any[]) => void, delay: number) => {
	let timeout: any;
	return (...args: any[]) => {
		clearTimeout(timeout);
		timeout = setTimeout(fn.bind(this, ...args), delay);
	};
};
