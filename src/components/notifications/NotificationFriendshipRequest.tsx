import { Dispatch, SetStateAction } from "react";
import Button from "../buttons/Button";
import Notification from "../../entities/Notification";
import { IFriendshipRequestDTO } from "../../server/repository/friendship/IFriendshipRequestDTO";
import { friendshipRepository } from "../../server/repository/friendship/friendshipRepository";

interface INotificationFriendshipRequestProps {
    notification: Notification;
    notifications: Notification[]
    setNotifiations: Dispatch<SetStateAction<Notification[]>>;
}

export default function NotificationFriendshipRequest(props: INotificationFriendshipRequestProps) {

    const deleteNotificationOfList = () => {
        props.setNotifiations(props.notifications.filter((notification) => notification.id !== props.notification.id))
    }

    const handleAcceptOrDenyFriendRequest = (accept: boolean) => {
        const request: IFriendshipRequestDTO = {
            friendshipId: props.notification.link,
            notificationId: props.notification.id,
            requestIsAccept: accept,
        };
        friendshipRepository.acceptOrDenyRequest(request);
        deleteNotificationOfList();
    }


    return (
        <>
            <Button className="hover:bg-gray-100 w-8/12 dark:hover:bg-gray-600 dark:hover:text-white">{props.notification.message}</Button>
            <Button onClick={() => handleAcceptOrDenyFriendRequest(true)} className=" hover:bg-gray-100 w-2/12 dark:hover:bg-gray-600 dark:hover:text-white">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>

            </Button>
            <Button onClick={() => handleAcceptOrDenyFriendRequest(false)} className=" hover:bg-gray-100 w-2/12 dark:hover:bg-gray-600 dark:hover:text-white">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </span>
            </Button>

        </>
    )
}