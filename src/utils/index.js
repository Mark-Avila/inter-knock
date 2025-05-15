export function debounce(func, wait) {
    let timeout;
    return function (...args) {
        const context = this;
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(context, args), wait);
    };
}

export const checkIsValid = (value, field) => {
    if (!value || value.length === 0) {
        console.log(field + " is empty");
        return false;
    }
    if (value.length < 2) {
        console.log(field + " is short");
        return false;
    }
    return true;
};

export function truncateString(str, maxLength) {
    if (str.length <= maxLength) {
        return str;
    }
    return str.slice(0, maxLength) + '...';
}