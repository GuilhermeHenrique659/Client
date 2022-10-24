import axios, { AxiosResponse } from "axios";
import { serverRepository } from "../ServerRepository";
import { IUserLoginDTO } from "./IUserLoginDTO";
import { IUserSaveDTO } from "./IUserSaveDTO";


class UserRepository {
    public async register(user: IUserSaveDTO): Promise<AxiosResponse<any, any>> {
        return serverRepository.post('/user', user);
    }

    public async login(user: IUserLoginDTO): Promise<AxiosResponse<any, any>> {
        return serverRepository.post('/user/session', user);
    }
}

export const userRepository = new UserRepository();