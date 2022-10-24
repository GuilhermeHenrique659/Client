import axios from "axios";
import { useRouter } from "next/router";
import { Dispatch, SetStateAction, useState } from "react";
import { userRepository } from "../../server/user/UserRepository";
import Button from "../buttons/Button";
import { Errors } from "../errors/Errors";
import Input from "./input";

interface IloginProps {
    inputs: {
        name: string;
        setName: Dispatch<SetStateAction<string>>;
        email: string;
        setEmail: Dispatch<SetStateAction<string>>;
        password: string;
        setPassword: Dispatch<SetStateAction<string>>;
    }
    showForm: () => void;
}

export default function LoginForm(props: IloginProps) {
    const [errors, setErrors] = useState<string[]>();

    const router = useRouter();

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const res = await userRepository.login({
                email: props.inputs.email,
                password: props.inputs.password,
            });

            localStorage.setItem('user', JSON.stringify(res.data));
            router.push('/')
        } catch (error) {
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

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Input label="E-mail" type="email" onChange={props.inputs.setEmail} value={props.inputs.email} />
                <Input label="Senha" type="password" onChange={props.inputs.setPassword} />
                {errors ? Errors(errors) : false}
                <div className="m-4">
                    <Button className="bg-indigo-800 m-2">Entrar</Button>
                    <Button className="bg-indigo-800 m-2" onClick={props.showForm}>Cadastrar</Button>
                </div>
            </form>
        </div>
    )
}