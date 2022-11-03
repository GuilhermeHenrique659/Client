import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { User } from "../../entities/User";
import useProfile from "../../hooks/ProfileFormHooks";
import Button from "../buttons/Button";
import { Errors } from "../errors/Errors";
import Input from "./input";

interface IProfileFormProps {
    user: User
    setUser: Dispatch<SetStateAction<User>>
}

export default function ProfileForm(props: IProfileFormProps) {
    const [disableForm, setDisableForm] = useState<boolean>(true);
    const { name, setName,
        email, setEmail, password,
        setPassword, passwordToConfirm,
        setPasswordToConfirm, handleSubmitProfileForm,
        loading, errors
    } = useProfile({
        user: props.user,
        setUser: props.setUser
    });

    useEffect(() => {
        if (props.user) {
            setEmail(props.user.email)
            setName(props.user.name)
        }
    }, [props.user])

    return (
        <div>
            {disableForm ? <Button className='m-4' onClick={() => setDisableForm(false)}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                </svg>
            </Button> : ''}
            <form className='m-2' onSubmit={handleSubmitProfileForm}>
                <Input readonly={disableForm} label="Nome" type="text" value={name} onChange={setName} />
                <hr className='border-gray-500 w-full p-1 m-2' />
                <Input readonly={disableForm} label="E-mail" type="email" value={email} onChange={setEmail} />
                <hr className='border-gray-500 w-full p-1 m-2' />
                {!disableForm ? <>
                    <Input readonly={disableForm} label="Nova senha" type="password" value={password} onChange={setPassword} />
                    <hr className='border-gray-500 w-full p-1 m-2' />

                    <Input readonly={disableForm} label="Confirme sua antiga senha" type="password" value={passwordToConfirm} onChange={setPasswordToConfirm} />
                    <hr className='border-gray-500 w-full p-1 m-2' />
                </> : ' '}

                {!disableForm ? <div className="m-4">
                    {errors ? Errors(errors) : false}
                    <Button className="bg-indigo-800 m-2" disable={loading} >Salvar</Button>
                </div> : ''}
            </form>
        </div>
    )
}