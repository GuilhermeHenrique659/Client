import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import Button from "../components/buttons/Button";
import Input from "../components/forms/input";
import NavBar from "../components/navbar/NavBar";
import ProfileImage from "../components/profile/ProfileImage";
import useAuthenticated from "../hooks/AuthenticatedHooks";

export default function Profile() {
    const { token, user, handleLogout } = useAuthenticated();


    return (
        <div>
            <NavBar token={token} user={user} onLogout={handleLogout}></NavBar>
            <div className='bg-gray-300 flex items-center justify-around h-full mt-12'>
                <div className='bg-slate-900 w-full lg:w-2/3 h-full mt-10 rounded-t-md'>
                    <div className="flex flex-col items-center lg:flex-row text-white h-full">
                        <div className="flex-1 w-64">
                            <ProfileImage user={user}></ProfileImage>
                        </div>
                        <div className="flex-1 w-32 m-6 p-4">
                            <div>
                                <form>
                                    <Input label="Nome" type="text" value={user.name} />
                                    <Input label="E-mail" type="email" value={user.email} />
                                    <Input label="Senha" type="password" />
                                    <Input label="Foto" type="file" />

                                    <div className="m-4">
                                        <Button className="bg-indigo-800 m-2">Salvar</Button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>


    )
}