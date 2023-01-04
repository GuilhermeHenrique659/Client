import { PostEntity } from "../../../entities/PostEntity";
import { serverRepository } from "../../ServerRepository";
import AbstractRepository from "../AbstractRepository";
import isAuthetificated from "../IsAtuthenticaded";
import RepositoryOutput from "../RepositoryBoundry";
import IPostListPaginated from "./IPostListPaginated";


export class PostRepository extends AbstractRepository {

    @isAuthetificated()
    public async listPost(page: number, userId?: string): Promise<RepositoryOutput<IPostListPaginated>> {
        try {
            return await serverRepository.get(`/post?&page=${page}${userId ? '&userId=' + userId : ''}`);
        } catch (error) {
            this.errorHandle(error)
        }
    }

    @isAuthetificated()
    public async savePost(post: PostEntity): Promise<RepositoryOutput<PostEntity>> {
        try {
            return await serverRepository.post('/post', post);
        } catch (error) {
            this.errorHandle(error)
        }
    }

    @isAuthetificated()
    public async showPost(postId: string): Promise<RepositoryOutput<PostEntity>> {
        try {
            return await serverRepository.get('/post/' + postId);
        } catch (error) {
            this.errorHandle(error)
        }
    }

    @isAuthetificated()
    public async addLike(userId: string): Promise<RepositoryOutput<{ likeIsAdd: boolean }>> {
        try {
            return await serverRepository.patch(`/post/addLike?&postId=${userId}`);
        } catch (error) {
            this.errorHandle(error)
        }
    }
}


export const postRepository = new PostRepository();