import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import CreateFormPost from "../components/forms/CreateFormPost";
import NavBar from "../components/navbar/NavBar";
import Post from "../components/post/Post";


export default function Home() {
    const [token, setToken] = useState<string | null>()
    const [user, setUser] = useState<Record<string, string> | null>();

    useEffect(() => {
        try {
            setToken(JSON.parse(localStorage.getItem('user')).token);
            setUser(JSON.parse(localStorage.getItem('user')).userExits);
        } catch (e) {
            setToken(null);
            setUser(null)
        }
    }, [])

    const handleLogout = () => {
        setToken(null);
        setUser(null);
    }

    return (
        <div>
            <NavBar token={token} user={user} onLogout={handleLogout}></NavBar>
            <div className='bg-gray-300 flex items-center justify-around h-full'>
                <div className='bg-slate-900 md:h-full xl:w-2/3 h-full mt-10 rounded-t-md'>
                    <div className="text-white flex-row items-center justify-around">
                        <CreateFormPost></CreateFormPost>
                    </div>
                    <div className="">
                        <Post></Post>
                    </div>
                </div>
            </div>
        </div>
    )
}