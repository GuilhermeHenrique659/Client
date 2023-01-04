import Link from "next/link";
import { useEffect, useState } from "react";
import { User } from "../../entities/User";
import Button from "../buttons/Button";
import SideBar from "./SideBar";
import Notification from "../../entities/Notification";
import { notificationRepository } from "../../server/repository/notification/notificationRepository";
import listener from "../../listener/Listener";

interface INavBar {
    token?: string
    user?: User;
    onLogout?: () => void;
}


function Notifiation() {
    const [displayNotificationDropdown, setDisplayNotificationDropdown] = useState<boolean>(false);
    const [notifications, setNotifiations] = useState<Notification[]>();
    const [notification, setNotifiation] = useState<Notification>();

    useEffect(() => {
        const loadNotification = async () => {
            const notifications = await notificationRepository.listNotification();
            setNotifiations(notifications.data);
        }
        if (!notification) loadNotification();
        else {
            notifications.push(notification);
            const list = notifications;
            setNotifiations(list)
        }
    }, [notification])

    listener.addListern<Notification>('notification', (data: Notification) => {
        setNotifiation(data)
    });

    const HandleShowNotifications = () => {
        if (!displayNotificationDropdown)
            setDisplayNotificationDropdown(true)
        else
            setDisplayNotificationDropdown(false)
    }

    const handleDeleteNotification = async (notificationId: string) => {
        const res = await notificationRepository.deleteNotification(notificationId);
        if (res) {
            const notificationIndex = notifications.findIndex((notification) => notification.id === notificationId);
            setNotifiations(notifications.filter((notification) => notification.id !== notificationId));
        }
    }

    return (
        <>
            <Button onClick={HandleShowNotifications} className="relative inline-flex justify-around m-4 mt-8 items-center text-lg font-medium text-center mx-4">
                <svg className="w-8 h-8" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path></svg>
                <span className="sr-only">Notifications</span>
                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
                    {notifications ? notifications.length : false}
                </div>
            </Button>
            <div id="dropdown" className={`z-10 bg-white flex flex-col text-black justify-around max-w-7xl divide-y divide-gray-100 rounded shadow w-64 dark:bg-gray-700 ${!displayNotificationDropdown ? 'hidden' : false}`}>
                <ul className="py-1 text-sm flex flex-col text-gray-700 dark:text-gray-200" aria-labelledby="dropdownDefaultButton">
                    {notifications ? notifications.map((notification) => {
                        return (
                            <li key={notification.id} className='flex flex-row items-center justify-center m-1'>
                                <a href="" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">{notification.message}</a>
                                <Button onClick={() => handleDeleteNotification(notification.id)} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">
                                    <span>
                                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </span>
                                </Button>
                            </li>
                        )
                    }) : false}
                    <li>
                        <a href="#" onClick={HandleShowNotifications} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Fechar</a>
                    </li>
                </ul>
            </div>
        </>
    )
}

function NavBarUserAuthenticated(props: INavBar) {
    const [displaySideBar, setDisplaySideBar] = useState<boolean>(false);


    const HandleShowSideBar = () => {
        if (!displaySideBar)
            setDisplaySideBar(true)
        else
            setDisplaySideBar(false)
    }



    return (
        <nav className='bg-indigo-900 w-full h-12 flex justify-between items-center text-purple-100'>
            <SideBar display={displaySideBar} setDisplay={HandleShowSideBar} />
            <Button onClick={HandleShowSideBar} className={`${displaySideBar ? 'hidden' : false}`}>
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                </svg>
            </Button>
            <div className="flex justify-between items-center p-2 mr-2">
                <Notifiation></Notifiation>
                <div className='border-black-100 w-11 h-11 rounded-full bg-cover mr-4' style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_SERVER_URL}/files/${props.user.avatar})` }}>
                </div>
                <Link href={'/profile'}><h2 className="mx-2 cursor-pointer">{props.user.name}</h2></Link>
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
    return (
        <div className='fixed top-0 left-0 right-0 w-full'>
            {props.token ? NavBarUserAuthenticated(props) : navBarUserNotAuthenticated()}
        </div>
    )
}