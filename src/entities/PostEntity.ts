import { Files } from "./Files";
import { User } from "./User";

export class PostEntity {
    public readonly id?: string;

    public title: string;

    public description: string;

    public files?: Files[];

    public like?: number;

    public user?: User;

    constructor(props: Omit<PostEntity, keyof PostEntity>) {
        Object.assign(this, props);
    }

    public addLike() {
        this.like += 1;
    }
}
