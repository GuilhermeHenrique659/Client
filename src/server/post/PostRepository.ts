import { serverRepository } from "../ServerRepository";


export class PostRepository {
    public async listPost(page: number) {
        const response = await serverRepository.get(`/post?page=${page}`);
        return response.data;
    }
}


export const postRepository = new PostRepository();