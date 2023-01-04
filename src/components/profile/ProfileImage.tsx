import { Dispatch, SetStateAction, useState } from "react"
import { User } from "../../entities/User";
import { userRepository } from "../../server/repository/user/UserRepository";
import LocalStorageHelper from "../../helpers/LocalStorageHelper";

interface IProps {
    user: User;
    profileIsTheUser: boolean;
    setUser: Dispatch<SetStateAction<User>>
}

export default function ProfileImage(props: IProps) {
    const [blur, setBlur] = useState<string>();
    const [loading, setLoading] = useState<boolean>(false);

    const handleFile = async (e) => {
        e.preventDefault()
        const file = e.target.files;
        setLoading(true)
        try {
            const data = new FormData();
            data.append('file', file[0])
            const res = await userRepository.updateAvatar(data);
            const user = {
                token: LocalStorageHelper.getItemObject('user').token,
                userExits: res.data
            }
            LocalStorageHelper.localStorageUpdate('user', user)
            props.setUser(res.data)
            setLoading(false);
        } catch (err) {
            console.log(err);
            setLoading(false)
        }
    }

    if (props.user) {
        return (
            <div className="flex flex-col items-center">
                <label htmlFor="dropzone-file" className="cursor-pointer" onMouseOver={() => { setBlur(' blur') }} onMouseOut={() => setBlur('')}>
                    <div className={"border-black-100 w-64 h-64 m-10 rounded-full bg-cover" + blur}
                        style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_SERVER_URL}/files/${props.user.avatar})` }}>
                    </div>

                    <input id="dropzone-file" type="file" name="file" className="hidden" disabled={loading || props.profileIsTheUser} onChange={handleFile} />
                </label>
                <h2 className='m-4 text-lg'>{props.user.name}</h2>
            </div>
        )
    } else {
        return (
            <div>
                <h2>User not Found</h2>
            </div>
        )
    }
}