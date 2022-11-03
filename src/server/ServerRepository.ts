import axios, { Axios } from "axios";

export class ServerRepository {
    constructor(private readonly _serverUrl: string,
        private readonly _axios: Axios,
        private _jwtoken?: string) { }

    public setJWT(token: string) {
        this._jwtoken = 'Bearer ' + token;
    }


    public async get(path: string) {
        if (this._jwtoken) {
            return this._axios.get(this._serverUrl + path, {
                headers: {
                    Authorization: this._jwtoken
                }
            });
        } else {
            return this._axios.get(this._serverUrl + path);
        }
    }

    public async post(path, data: any, header?: Record<string, string>) {
        if (this._jwtoken) {
            return this._axios.post(this._serverUrl + path, data, {
                headers: header ? { Authorization: this._jwtoken, ...header } : {
                    Authorization: this._jwtoken
                }
            });
        } else {
            return this._axios.post(this._serverUrl + path, data);
        }
    }

    public async put(path, data: any, header?: Record<string, string>) {
        if (this._jwtoken) {
            return this._axios.put(this._serverUrl + path, data, {
                headers: header ? { Authorization: this._jwtoken, ...header } : {
                    Authorization: this._jwtoken
                }
            });
        } else {
            return this._axios.put(this._serverUrl + path, data);
        }
    }

    public async patch(path, data: any, header?: Record<string, string>) {
        console.log((this._serverUrl + path, data, {
            headers: header ? { Authorization: this._jwtoken, ...header } : {
                Authorization: this._jwtoken
            }
        }));

        if (this._jwtoken) {
            return this._axios.patch(this._serverUrl + path, data, {
                headers: header ? { Authorization: this._jwtoken, ...header } : {
                    Authorization: this._jwtoken
                }
            });
        } else {
            return this._axios.patch(this._serverUrl + path, data);
        }
    }


}

export const serverRepository = new ServerRepository(process.env.NEXT_PUBLIC_SERVER_URL, axios);