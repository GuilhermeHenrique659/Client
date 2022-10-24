import Link from "next/link";
import Button from "../buttons/Button";

interface INavBar {
    token?: string
    user?: Record<string, string>;
    onLogout?: () => void;
}

function NavBarUserAuthenticated(props: INavBar) {
    return (
        <nav className='bg-indigo-900 w-full h-12 flex justify-between items-center text-purple-100'>
            <button className='p-4'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </button>
            <div className="flex justify-between items-center p-4">
                <div className='border-black-100 w-11 h-11 rounded-full bg-cover mr-4' style={{ backgroundImage: `url(http://localhost:3333/files/${props.user.avatar})` }}>
                </div>
                <h2 className="mx-2">{props.user.name}</h2>
                <Button className="w-4" onClick={props.onLogout}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9" />
                    </svg>
                </Button>
            </div>
        </nav>
    )
}

function navBarUserNotAuthenticated() {
    return (
        <nav className='bg-indigo-900 w-full h-12 flex justify-between items-center text-purple-100 fixed'>
            <div className="p-4">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75L22.5 12l-5.25 5.25m-10.5 0L1.5 12l5.25-5.25m7.5-3l-4.5 16.5" />
                </svg>
            </div>
            <div className="flex justify-between items-center p-4">
                <Link href={'/login'}>Entrar</Link>
            </div>
        </nav>
    );
}

export default function NavBar(props: INavBar) {
    console.log(props);

    return (
        <>
            {props.token ? NavBarUserAuthenticated(props) : navBarUserNotAuthenticated()}
        </>
    )
}