import { useState } from "react";
import Button from "../components/buttons/Button";
import CreatePostForm from "../components/forms/CreatePostForm";
import NavBar from "../components/navbar/NavBar";
import Post from "../components/post/Post";
import useAuthenticated from "../hooks/AuthenticatedHooks";
import listener from "../listener/Listener";

interface IPostListProps {
    token: string;
    showPostForm: boolean;
    handleClosePostForm: () => void;
    handleShowPostForm: () => void;
}

function PostList(props: IPostListProps) {
    return (
        <div className="bg-slate-900 w-full lg:w-2/3 h-full mt-10 rounded-t-md">
            {props.showPostForm ? (
                <div className="text-white flex flex-col justify-around m-6">
                    <CreatePostForm token={props.token} closeForm={props.handleClosePostForm}></CreatePostForm>
                </div>
            ) : (
                <div className="p-10">
                    <Button
                        className="bg-indigo-600 text-white w-fit h-12 p-4 flex items-center justify-around"
                        onClick={props.handleShowPostForm}
                    >
                        Enviar postagem
                    </Button>
                </div>
            )}
            <div className="">
                <Post></Post>
            </div>
        </div>
    );
}

export default function Home() {
    const { token, user, handleLogout } = useAuthenticated();

    const [showPostForm, setShowPostForm] = useState<boolean>(false);

    const handleShowPostForm = () => {
        setShowPostForm(true);
    };

    const handleClosePostForm = () => {
        setShowPostForm(false);
    };

    if (token) {
        try {
            listener.recconect();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <NavBar token={token} user={user} onLogout={handleLogout}></NavBar>
            <div className="bg-gray-300 flex items-center justify-around h-full mt-12">
                {token ? (
                    <PostList
                        token={token}
                        showPostForm={showPostForm}
                        handleClosePostForm={handleClosePostForm}
                        handleShowPostForm={handleShowPostForm}
                    ></PostList>
                ) : (
                    <div>
                        <p>Logue para fazer postagem</p>
                    </div>
                )}
            </div>
        </div>
    );
}
