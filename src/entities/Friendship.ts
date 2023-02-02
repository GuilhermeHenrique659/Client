import { User } from "./User";

export class Friendship {
    public readonly id: string;

    public user_id: string;

    public user: User;

    public friend_id: string;

    public friend: User;

    public requestIsAccept: boolean;

    constructor(props: Friendship) {
        Object.assign(this, props);
    }
}