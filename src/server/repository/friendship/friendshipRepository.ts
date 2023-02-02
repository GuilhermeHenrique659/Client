import { Friendship } from "../../../entities/Friendship";
import { serverRepository } from "../../ServerRepository";
import AbstractRepository from "../AbstractRepository";
import isAuthetificated from "../IsAtuthenticaded";
import RepositoryOutput from "../RepositoryBoundry";
import type { IFriendshipRequestDTO } from "./IFriendshipRequestDTO";



export class FriendshipRepository extends AbstractRepository {

    @isAuthetificated()
    public async acceptOrDenyRequest(data: IFriendshipRequestDTO): Promise<void> {
        try {
            await serverRepository.patch('/friendship/acceptOrDenyRequest', data);
        } catch (error) {
            this.errorHandle(error);
        }
    }

    @isAuthetificated()
    public async listFriendship(): Promise<RepositoryOutput<Friendship[]>> {
        try {
            return await serverRepository.get('/friendship');
        } catch (error) {
            this.errorHandle(error);
        }
    }
}

export const friendshipRepository = new FriendshipRepository();