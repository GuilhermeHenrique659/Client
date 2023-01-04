import { Socket } from "dgram";
import LocalStorageHelper from "../helpers/LocalStorageHelper";
import { io } from "socket.io-client";


export class Listener {
    private socket

    constructor() {
        const token = LocalStorageHelper.getItemObject('user');
        if (token)
            this.socket = io(process.env.NEXT_PUBLIC_SERVER_WS, {
                reconnection: true,
                reconnectionDelay: 1000,
                reconnectionDelayMax: 5000,
                reconnectionAttempts: Infinity,
                extraHeaders: {
                    token: `Bearer ${token.token}`
                }
            });
    }

    public recconect() {
        this.socket.on("reconnect", (attempt) => {
            console.log(attempt);
        });
    }

    public addListern<T>(listenerName: string, functionEvent: Function) {
        this.socket.on(listenerName, function (params: T) {
            functionEvent(params);
        })
    }
}

const listener = new Listener();
export default listener;