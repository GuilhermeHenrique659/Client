import { PostEntity } from "../../entities/PostEntity";
import { serverRepository } from "../ServerRepository";


export class PostRepository {
    public async listPost(page: number) {
        const response = await serverRepository.get(`/post?page=${page}`);
        return response.data;
    }

    public async savePost(post: PostEntity){
        return await serverRepository.post('/post', post);
    }
}


export const postRepository = new PostRepository();