import { PostEntity } from "../../../entities/PostEntity";

export default interface IPostListPaginated {
    total: number;
    current_page: number;
    per_page: number;
    posts: PostEntity[]
}