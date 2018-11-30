export class LocalStorageService {
    constructor(key) {
        this.key = key;
    }
    get() {
        const value = localStorage.getItem(this.key);
        if (value === 'null' || value === null || value === undefined)
            return null;
        return value;
    }
    set(value) {
        localStorage.setItem(this.key, value);
    }
    clear() {
        localStorage.removeItem(this.key);
    }
}