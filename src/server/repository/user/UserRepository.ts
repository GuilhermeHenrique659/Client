import { serverRepository } from "../../ServerRepository";
import { IUserLoginDTO } from "./IUserLoginDTO";
import { IUserSaveDTO } from "./IUserSaveDTO";
import RepositoryOutput from "../RepositoryBoundry";
import AbstractRepository from "../AbstractRepository";
import { User } from "../../../entities/User";
import isAuthetificated from "../IsAtuthenticaded";

type UserLogin = {
    token: string,
    userExits: User
};



class UserRepository extends AbstractRepository {

    public async register(user: IUserSaveDTO): Promise<RepositoryOutput> {
        try {
            return await serverRepository.post('/user', user);
        } catch (error) {
            this.errorHandle(error);
        }
    }

    @isAuthetificated()
    public async updateAvatar(file: any): Promise<RepositoryOutput> {
        try {
            return await serverRepository.patch('/user/avatar', file, {
                'Content-Type': 'multipart/form-data',
            })
        } catch (error) {
            this.errorHandle(error);
        }
    }

    @isAuthetificated()
    public async updateUser(user: Record<string, string>): Promise<RepositoryOutput> {
        try {
            return await serverRepository.put('/user', user);
        } catch (error) {
            this.errorHandle(error);
        }
    }

    public async showUser(userId: string): Promise<RepositoryOutput<User>> {
        try {
            return await serverRepository.get('/user/' + userId);
        } catch (error) {
            this.errorHandle(error)
        }
    }

    public async login(user: IUserLoginDTO): Promise<RepositoryOutput<UserLogin>> {
        try {
            return await serverRepository.post('/user/session', user);
        } catch (error) {
            this.errorHandle(error);
        }
    }
}

export const userRepository = new UserRepository();