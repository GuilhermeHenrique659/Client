import { useRouter } from "next/router";
import ProfileForm from "../components/forms/ProfileForm";
import NavBar from "../components/navbar/NavBar";
import Post from "../components/post/Post";
import ProfileImage from "../components/profile/ProfileImage";
import useAuthenticated from "../hooks/AuthenticatedHooks";
import { useEffect, useState } from "react";
import { User } from "../entities/User";
import { userRepository } from "../server/repository/user/UserRepository";

export default function Profile() {
    const { token, user, handleLogout, setUser } = useAuthenticated();
    const [profileIsTheUser, setProfileIsTheUser] = useState<boolean>();
    const [userProfile, setUserProfile] = useState<User>();
    const router = useRouter()
    const { userId } = router.query

    useEffect(() => {
        if (userId !== user?.id) {
            setProfileIsTheUser(false);

            const getUserProfile = async () => {
                console.log(userId);

                const user = await userRepository.showUser(userId as string);
                setUserProfile(user.data);
            }
            getUserProfile();
        } else {
            setProfileIsTheUser(true)
        }
    }, [user, token, userId])

    return (
        <div>
            <NavBar token={token} user={user} onLogout={handleLogout}></NavBar>
            <div className='bg-gray-300 flex flex-col items-center justify-around h-full mt-12'>
                <div className='bg-slate-900 w-full lg:w-2/3 h-full mt-10 rounded-md'>
                    <div className="flex flex-col items-center lg:flex-row text-white h-full">
                        <div className="flex-1 w-64">
                            <ProfileImage user={profileIsTheUser ? user : userProfile} setUser={setUser} profileIsTheUser={profileIsTheUser}></ProfileImage>
                        </div>
                        <div className="flex-1 m-6 p-4">

                            {profileIsTheUser ? <ProfileForm user={user} setUser={setUser} /> : false}
                        </div>
                    </div>

                </div>
                <div className='bg-slate-900 w-full lg:w-2/3 h-full mt-10 rounded-md'>
                    {userId ? <Post userId={userId as string}></Post> : false}
                </div>
            </div>
        </div>


    )
}