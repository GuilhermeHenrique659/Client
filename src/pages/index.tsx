import { useState } from "react"
import Button from "../components/buttons/Button";
import CreatePostForm from "../components/forms/CreatePostForm";
import NavBar from "../components/navbar/NavBar";
import Post from "../components/post/Post";
import useAuthenticated from "../hooks/AuthenticatedHooks";


export default function Home() {
    const { token, user, handleLogout } = useAuthenticated();

    const [showPostForm, setShowPostForm] = useState<boolean>(false);


    const handleShowPostForm = () => {
        setShowPostForm(true)
    }

    const handleClosePostForm = () => {
        setShowPostForm(false)
    }

    return (
        <div>
            <NavBar token={token} user={user} onLogout={handleLogout}></NavBar>
            <div className='bg-gray-300 flex items-center justify-around h-full mt-12'>
                <div className='bg-slate-900 w-full lg:w-2/3 h-full mt-10 rounded-t-md'>
                    {showPostForm ? <div className="text-white flex flex-col justify-around m-6">
                        <CreatePostForm token={token} closeForm={handleClosePostForm}></CreatePostForm>
                    </div> : <div className='p-10'><Button className='bg-indigo-600 text-white w-fit h-12 p-4 flex items-center justify-around' onClick={handleShowPostForm}>Enviar postagem</Button></div>}
                    <div className="">
                        <Post></Post>
                    </div>
                </div>
            </div>
        </div>
    )
}