import { Dispatch, SetStateAction } from "react";
import Notification from "../../entities/Notification";
import { notificationRepository } from "../../server/repository/notification/notificationRepository";
import { postRepository } from "../../server/repository/post/PostRepository";
import Button from "../buttons/Button";
import { PostEntity } from "../../entities/PostEntity";

interface INotificationPostProps {
    notification: Notification;
    notifications: Notification[];
    setPost: Dispatch<SetStateAction<PostEntity>>;
    setShowPostLiked: Dispatch<SetStateAction<boolean>>;
    setNotificationToDelete: Dispatch<SetStateAction<string>>;
    setNotifiations: Dispatch<SetStateAction<Notification[]>>;
}

export default function NotificationPost(props: INotificationPostProps) {
    const handleShowPostLiked = () => {
        const postId = props.notification.link
        const notificationId = props.notification.id
        const getPost = async () => {
            const post = await postRepository.showPost(postId);
            props.setPost(post.data);
        }
        getPost().then(() => {
            props.setShowPostLiked(true);
            props.setNotificationToDelete(notificationId)
        })
    }

    const handleDeleteNotification = async () => {
        const notificationId = props.notification.id
        const res = await notificationRepository.deleteNotification(notificationId);
        if (res) {
            props.setNotifiations(props.notifications.filter((notification) => notification.id !== notificationId));
        }
    }


    return (
        <>
            <Button onClick={handleShowPostLiked} className="hover:bg-gray-100 w-10/12 dark:hover:bg-gray-600 dark:hover:text-white">{props.notification.message}</Button>
            <Button onClick={handleDeleteNotification} className=" hover:bg-gray-100 w-2/12 dark:hover:bg-gray-600 dark:hover:text-white">
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </span>
            </Button>
        </>
    )
}