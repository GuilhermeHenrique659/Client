import { PostEntity } from "../../entities/PostEntity";
import { serverRepository } from "../ServerRepository";


export class PostRepository {
    public async listPost(page: number, userId?: string) {
        const response = await serverRepository.get(`/post?&page=${page}${userId ? '&userId=' + userId : ''}`);
        return response.data;
    }

    public async savePost(post: PostEntity) {
        return serverRepository.post('/post', post);
    }

    public async addLike(userId: string) {
        return serverRepository.patch(`/post/addLike?&postId=${userId}`);
    }
}


export const postRepository = new PostRepository();