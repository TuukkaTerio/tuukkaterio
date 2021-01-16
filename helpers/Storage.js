export const write = (key, value) => {
    if(typeof window !== 'undefined') {
        window.sessionStorage.setItem(key, value);
    }
}

export const read = (key) => {
    if(typeof window !== 'undefined') {
        return window.sessionStorage.getItem(key);
    }
    return '';
}