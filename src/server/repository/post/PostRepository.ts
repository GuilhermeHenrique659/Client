import { PostEntity } from "../../../entities/PostEntity";
import { serverRepository } from "../../ServerRepository";
import AbstractRepository from "../AbstractRepository";
import RepositoryOutput from "../RepositoryBoundry";


export class PostRepository extends AbstractRepository {
    public async listPost(page: number, userId?: string): Promise<RepositoryOutput> {
        try {
            return await serverRepository.get(`/post?&page=${page}${userId ? '&userId=' + userId : ''}`);
        } catch (error) {
            this.errorHandle(error)
        }
    }

    public async savePost(post: PostEntity): Promise<RepositoryOutput> {
        try {
            return await serverRepository.post('/post', post);
        } catch (error) {
            this.errorHandle(error)
        }
    }

    public async addLike(userId: string) {
        try {
            return serverRepository.patch(`/post/addLike?&postId=${userId}`);
        } catch (error) {
            this.errorHandle(error)
        }
    }
}


export const postRepository = new PostRepository();