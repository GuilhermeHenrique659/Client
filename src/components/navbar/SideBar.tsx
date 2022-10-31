import Link from "next/link";
import Button from "../buttons/Button"

interface ISideBarProps {
    display: boolean
    setDisplay: () => void;
}

export default function SideBar(props: ISideBarProps) {
    return (
        <div className={`w-80 backdrop-blur-3xl	 z-10 ${!props.display ? 'hidden' : 'flex flex-col text-black justify-around items-center content-center p-16 mt-72 pt-20'}`} style={{
            "height": "200vh",
        }}>
            <div className='mt-96 pt-20'>
                <div>
                    <h1 className="mr-14 text-lg"><Link href={'/'}>Inicio</Link></h1>
                </div>
                <ul className="m-4 mt-10">
                    <li>*</li>
                </ul>
            </div>
            <Button onClick={props.setDisplay} className='p-10'>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M11.25 9l-3 3m0 0l3 3m-3-3h7.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>

            </Button>
        </div >
    )
}