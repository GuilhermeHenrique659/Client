import { Dispatch, SetStateAction, useState } from "react"
import { userRepository } from "../../server/user/UserRepository";
import Input from "../forms/input"

interface IProps {
    user: Record<string, string>
    handleUpdateAvatar: () => void;
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
            console.log(res);
            const user = {
                token: JSON.parse(localStorage.getItem('user')).token,
                userExits: res.data
            }
            localStorage.removeItem('user')
            localStorage.setItem('user', JSON.stringify(user));
            console.log(props.handleUpdateAvatar());
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
                        style={{ backgroundImage: `url(http://localhost:3333/files/${props.user.avatar})` }}>
                    </div>

                    <input id="dropzone-file" type="file" name="file" className="hidden" disabled={loading} onChange={handleFile} />
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