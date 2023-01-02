import axios, { Axios } from "axios";
import IServerResponse from "./IServerResponse";

export class ServerRepository {
    constructor(private readonly _serverUrl: string,
        private readonly _axios: Axios,
        private _jwtoken?: string) { }

    public setJWT(token: string) {
        this._jwtoken = 'Bearer ' + token;
    }

    public async get(path: string): Promise<IServerResponse> {
        if (this._jwtoken) {
            return this._axios.get(this._serverUrl + path, {
                headers: {
                    Authorization: this._jwtoken
                }
            });
        } else {
            const response = await this._axios.get(this._serverUrl + path);
            return response.data;
        }
    }

    public async post(path, data: any, header?: Record<string, string>): Promise<IServerResponse> {
        if (this._jwtoken) {
            return this._axios.post(this._serverUrl + path, data, {
                headers: header ? { Authorization: this._jwtoken, ...header } : {
                    Authorization: this._jwtoken
                }
            });
        } else {
            const response = await this._axios.post(this._serverUrl + path, data);
            return response.data;
        }
    }

    public async put(path, data: any, header?: Record<string, string>): Promise<IServerResponse> {
        if (this._jwtoken) {
            return this._axios.put(this._serverUrl + path, data, {
                headers: header ? { Authorization: this._jwtoken, ...header } : {
                    Authorization: this._jwtoken
                }
            });
        } else {
            const response = await this._axios.put(this._serverUrl + path, data);
            return response.data;
        }
    }

    public async patch(path, data?: any, header?: Record<string, string>): Promise<IServerResponse> {
        if (this._jwtoken) {
            return this._axios.patch(this._serverUrl + path, data, {
                headers: header ? { Authorization: this._jwtoken, ...header } : {
                    Authorization: this._jwtoken
                }
            });
        } else {
            const response = await this._axios.patch(this._serverUrl + path, data);
            return response.data;
        }
    }
}

export const serverRepository = new ServerRepository(process.env.NEXT_PUBLIC_SERVER_URL, axios);