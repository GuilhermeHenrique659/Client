

export class User {
    public readonly id?: string;

    public name?: string;

    public email?: string;

    public password?: string;

    public avatar?: string;

    public passwordToConfirm?: string;

    constructor(props: User) {
        Object.assign(this, props);
    }
}