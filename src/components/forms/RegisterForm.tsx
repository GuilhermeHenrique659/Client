import axios from "axios";
import { Dispatch, SetStateAction, useState } from "react";
import { userRepository } from "../../server/repository/user/UserRepository";
import Button from "../buttons/Button";
import { Errors } from "../errors/Errors";
import Input from "./input";
import { AppError } from "../errors/AppError";

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

export default function RegisterForm(props: IloginProps) {
    const [errors, setErrors] = useState<AppError>();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await userRepository.register({
                name: props.inputs.name,
                email: props.inputs.email,
                password: props.inputs.password,
            });
            props.showForm()

        } catch (error) {
            setErrors(error);
        }
    }

    return (
        <div>
            <form onSubmit={handleSubmit}>
                <Input label="E-mail" type="email" onChange={props.inputs.setEmail} />
                <Input label="Nome" type="text" onChange={props.inputs.setName} />
                <Input label="Senha" type="password" onChange={props.inputs.setPassword} />
                {errors ? Errors(errors) : false}
                <div className="m-4">
                    <Button className="bg-indigo-800 m-2">Cadastrar</Button>
                </div>
            </form>
        </div>
    )
}