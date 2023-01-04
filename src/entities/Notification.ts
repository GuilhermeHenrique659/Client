export default class Notification {
    public id: string;

    public message: string;

    public link: string;

    public user_id: string

    constructor(props: Omit<Notification, keyof Notification>) {
        Object.assign(this, props);
    }
}