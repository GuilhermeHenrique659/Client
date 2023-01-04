export default class LocalStorageHelper {
    static getItemObject(key: string) {
        try {
            return JSON.parse(localStorage.getItem(key));
        } catch (err) {
            return undefined
        }
    }

    static localStorageUpdate(key: string, data: any) {
        localStorage.removeItem(key)
        localStorage.setItem(key, JSON.stringify(data));
    }
}