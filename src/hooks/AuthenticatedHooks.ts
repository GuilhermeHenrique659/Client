import { useEffect, useState } from "react";



export default function useAuthenticated() {
    const [token, setToken] = useState<string | null>()
    const [user, setUser] = useState<Record<string, string> | null>();

    useEffect(() => {
        try {
            setToken(JSON.parse(localStorage.getItem('user')).token);
            setUser(JSON.parse(localStorage.getItem('user')).userExits);
        } catch (e) {
            setToken(null);
            setUser(null);
        }
    }, [])

    const handleLogout = () => {
        localStorage.removeItem('user');
        setToken(null);
        setUser(null);
    }

    return {
        token,
        user,
        handleLogout,
        setUser,
    }
}