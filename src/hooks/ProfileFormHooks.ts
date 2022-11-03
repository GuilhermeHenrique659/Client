import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import { User } from "../entities/User";
import { userRepository } from "../server/user/UserRepository";

interface IUserProfileProps {
    user: User,
    setUser: Dispatch<SetStateAction<User>>
}

export default function useProfile(props: IUserProfileProps) {
    const [name, setName] = useState<string>(props?.user?.name);
    const [email, setEmail] = useState<string>(props?.user?.email);
    const [password, setPassword] = useState<string>('');
    const [passwordToConfirm, setPasswordToConfirm] = useState<string>('');
    const [avatar, setAvatar] = useState<string>(props?.user?.avatar);
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<string[]>();

    const handleSubmitProfileForm = async (e) => {
        e.preventDefault();
        const user = new User({
            name,
            email,
            password,
            passwordToConfirm
        });
        setLoading(true);
        try {
            const res = await userRepository.updateUser(user);
            const userLocalStorage = {
                token: JSON.parse(localStorage.getItem('user')).token,
                userExits: res.data
            }
            localStorage.removeItem('user')
            localStorage.setItem('user', JSON.stringify(userLocalStorage));
            props.setUser(user);
            setLoading(false)
        } catch (error) {
            console.log(error);

            if (axios.isAxiosError(error)) {

                if (error.response.data.message.details) {
                    setErrors(error.response.data.message.details.map((details) => {
                        return details.message;
                    }));
                }
                setErrors([error.response.data.message])
            }
        }

    }

    return {
        name, setName,
        email, setEmail,
        password, setPassword,
        passwordToConfirm, setPasswordToConfirm,
        handleSubmitProfileForm,
        errors,
        loading
    };
}