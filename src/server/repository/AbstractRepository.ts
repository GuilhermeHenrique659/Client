import axios, { AxiosError } from "axios";
import { AppError } from "../../components/errors/AppError";

export default abstract class AbstractRepository {
    public errorHandle(error: AxiosError<any, any>) {
        if (axios.isAxiosError(error)) {
            if (error.response.data.message) {
                const errorMessage = error.response.data.message;
                if (Array.isArray(errorMessage)) {
                    throw new AppError(errorMessage);
                } else {
                    throw new AppError([errorMessage]);
                }
            }
        } else {
            throw new AppError(['Some is Wrong!'])
        }
    }
}