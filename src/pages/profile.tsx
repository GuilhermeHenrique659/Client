import Button from "../components/buttons/Button";
import Input from "../components/forms/input";
import ProfileForm from "../components/forms/ProfileForm";
import NavBar from "../components/navbar/NavBar";
import Post from "../components/post/Post";
import ProfileImage from "../components/profile/ProfileImage";
import useAuthenticated from "../hooks/AuthenticatedHooks";

export default function Profile() {
    const { token, user, handleLogout, setUser } = useAuthenticated();


    const handleAvatarUpdate = () => {
        setUser(JSON.parse(localStorage.getItem('user')).userExits);
    }

    return (
        <div>
            <NavBar token={token} user={user} onLogout={handleLogout}></NavBar>
            <div className='bg-gray-300 flex flex-col items-center justify-around h-full mt-12'>
                <div className='bg-slate-900 w-full lg:w-2/3 h-full mt-10 rounded-md'>
                    <div className="flex flex-col items-center lg:flex-row text-white h-full">
                        <div className="flex-1 w-64">
                            <ProfileImage user={user} handleUpdateAvatar={handleAvatarUpdate}></ProfileImage>
                        </div>
                        <div className="flex-1 m-6 p-4">
                            <ProfileForm user={user} setUser={setUser} />
                        </div>
                    </div>

                </div>
                <div className='bg-slate-900 w-full lg:w-2/3 h-full mt-10 rounded-md'>
                    <Post></Post>
                </div>
            </div>
        </div>


    )
}