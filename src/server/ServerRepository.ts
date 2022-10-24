import axios, { Axios } from "axios";

export class ServerRepository {
    constructor(private readonly _serverUrl: string,
        private readonly _axios: Axios,
        private _jwtoken?: string) { }

    public setJWT(token: string) {
        this._jwtoken = token;
    }


    public async get(path: string) {
        if (this._jwtoken) {
            console.log(this._jwtoken);

            return this._axios.get(this._serverUrl + path, {
                headers: {
                    Authorization: 'Bearer ' + this._jwtoken
                }
            });
        } else {
            return this._axios.get(this._serverUrl + path);
        }
    }

    public async post(path, data: any) {

        if (this._jwtoken) {
            return this._axios.post(this._serverUrl + path, data, {
                headers: {
                    Authorization: this._jwtoken,
                }
            });
        } else {
            return this._axios.post(this._serverUrl + path, data);
        }
    }
}

export const serverRepository = new ServerRepository(process.env.NEXT_PUBLIC_SERVER_URL, axios);