import { useState } from "react";

export function useFormInputs() {
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("")


    return {
        name, setName,
        email, setEmail,
        password, setPassword,
    }
}

export function useFormVisible() {
    interface IShowForm {
        show: 'login' | 'register'
    }

    const [showForm, setShowForm] = useState<IShowForm>({ show: 'login' });


    return {
        showForm, setShowForm
    }
}