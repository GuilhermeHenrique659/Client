import { useState } from "react";
import { User } from "../entities/User";


export default function useProfile(user: User) {
    const [name, setName] = useState<string>(user?.name);
    const [email, setEmail] = useState<string>(user?.email);
    const [password, setPassword] = useState<string>('');
    const [passwordToConfirm, setPasswordToConfirm] = useState<string>('');
    const [avatar, setAvatar] = useState<string>(user.avatar);

    const handleSubmitProfileForm = async () => {

    }

    return {
        name, setName,
        email, setEmail,
        password, setPassword,
        passwordToConfirm, setPasswordToConfirm
    };
}