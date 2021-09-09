export const debounce = (fn: () => void, delay: number) => {
    let timeout: any;
    return () => {
        clearTimeout(timeout);
        timeout = setTimeout(fn, delay)
    }
};
