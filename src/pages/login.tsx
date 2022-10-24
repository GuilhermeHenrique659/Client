import LoginForm from "../components/forms/loginForm";
import city from '../../public/img/city.jpg'
import RegisterForm from "../components/forms/RegisterForm";
import { useFormInputs, useFormVisible } from "../hooks/LoginHooks";

export default function Login() {
    const { showForm, setShowForm } = useFormVisible()
    const inputs = useFormInputs()

    const HandleRegisterButton = () => {
        setShowForm({ show: 'register' })
    }

    const HandleShowLoginButton = () => {
        setShowForm({ show: 'login' })
    }

    return (
        <div className="flex items-center justify-center  h-screen w-screen bg-gradient-to-r from-indigo-900 to-neutral-800">
            <div className="  text-white w-96 h-fit flex justify-center items-center rounded-md bg-slate-700">
                <div className="flex flex-col items-center">

                    {showForm.show === 'login' ? <><h1 className="m-4">Entrar</h1>
                        <div className="p-4"><LoginForm
                            showForm={HandleRegisterButton}
                            inputs={inputs}
                        /></div>
                    </> :
                        <><div className="flex justify-between">
                            <button className="mr-2" onClick={HandleShowLoginButton}><svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                            </svg>
                            </button>
                            <h1 className="m-4">Cadastrar</h1>

                        </div>

                            <div className="p-4"><RegisterForm
                                showForm={HandleShowLoginButton}
                                inputs={inputs}
                            /></div>
                        </>
                    }
                </div>
            </div>
        </div>
    )
}