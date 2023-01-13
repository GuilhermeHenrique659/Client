import Link from "next/link";
import Button from "../buttons/Button"
import { useEffect, useState } from "react";
import { friendshipRepository } from "../../server/repository/friendship/friendshipRepository";
import { useRouter } from "next/router";

interface ISideBarProps {
    display: boolean
    setDisplay: () => void;
}

export default function SideBar(props: ISideBarProps) {
    const [friendList, setFriendList] = useState<Record<string, unknown>[]>();
    const [collapseFriendList, setCollapseFriendList] = useState<boolean>(false)
    const router = useRouter();

    const handleCollapseFriendList = () => {
        if (collapseFriendList) setCollapseFriendList(false)
        else setCollapseFriendList(true)
    }

    useEffect(() => {
        try {
            const list = async () => {
                const { data } = await friendshipRepository.listFriendship();
                setFriendList(data)
            }
            list();

        } catch (error) {
            console.log(error);
        }
    }, [])

    return (
        <div className={`w-80 backdrop-blur-3xl	 z-10 ${!props.display ? 'hidden' : 'flex flex-col text-black justify-around items-start content-center p-16 mt-72 pt-20'}`} style={{
            "height": "200vh",
        }}>
            <div className='mt-96 pt-20'>
                <div>
                    <h1 className="mr-14 text-lg"><Link href={'/'}>Inicio</Link></h1>
                </div>
                <ul className="mt-10 mr-0">
                    <li className="h-20 max-h-24">

                        <Button onClick={handleCollapseFriendList} className="flex w-60">
                            <div>
                                <p className="w-48">Lista de amigos</p>
                            </div>
                            <div className="">
                                {!collapseFriendList ? <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                </svg> : <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
                                </svg>
                                }
                            </div>

                        </Button>
                        <div className={`${!collapseFriendList ? 'hidden' : false} max-h-60 w-60 overflow-scroll mt-8`}>
                            <ul>
                                {friendList ? friendList.map((friend) => {
                                    return (
                                        <div key={friend.id as string}>
                                            <li>
                                                <div className="flex items-center justify-start mb-5">
                                                    <Button onClick={() => router.push('/profile?&userId=' + friend.user.id)}>
                                                        <div className="w-14 h-14 rounded-full bg-cover mr-6" style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_SERVER_URL}/files/${friend.user.avatar})` }}></div>
                                                    </Button>
                                                    <h4>{friend.user.name}</h4>
                                                </div>
                                            </li>
                                        </div>
                                    )
                                }) : false}
                            </ul>
                        </div>
                    </li>
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