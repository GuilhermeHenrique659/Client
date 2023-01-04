import { AppError } from "../../components/errors/AppError";
import { serverRepository } from "../ServerRepository";

export default function isAuthetificated() {
    return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
        try {
            const token = JSON.parse(localStorage.getItem('user')).token;
            serverRepository.setJWT(token);
        } catch (err) {
            console.log('token not found');
        }
        return descriptor;
    };
}

