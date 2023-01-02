import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import { User } from "../entities/User";
import { userRepository } from "../server/repository/user/UserRepository";
import { AppError } from "../components/errors/AppError";

interface IUserProfileProps {
    user: User,
    setUser: Dispatch<SetStateAction<User>>
    setDisableForm: Dispatch<SetStateAction<boolean>>
}

export default function useProfile(props: IUserProfileProps) {
    const [name, setName] = useState<string>(props?.user?.name);
    const [email, setEmail] = useState<string>(props?.user?.email);
    const [password, setPassword] = useState<string>();
    const [passwordToConfirm, setPasswordToConfirm] = useState<string>();
    const [avatar, setAvatar] = useState<string>(props?.user?.avatar);
    const [loading, setLoading] = useState<boolean>(false);
    const [errors, setErrors] = useState<AppError>();

    const handleSubmitProfileForm = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const res = await userRepository.updateUser({
                name, email, password, passwordToConfirm
            });
            const userLocalStorage = {
                token: JSON.parse(localStorage.getItem('user')).token,
                userExits: res.data
            }
            localStorage.removeItem('user')
            localStorage.setItem('user', JSON.stringify(userLocalStorage));
            props.setUser(res.data);
            props.setDisableForm(true)
            setLoading(false)
        } catch (error) {

        } finally {
            setLoading(false);
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