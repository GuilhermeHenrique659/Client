export class Files {
    public id: string;

    public filename: string;

    public postId: string;

    constructor(props: Omit<Files, keyof Files>) {
        Object.assign(this, props);
    }
}
