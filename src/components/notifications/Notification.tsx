import { useEffect, useState } from "react";
import listener from "../../listener/Listener";
import { notificationRepository } from "../../server/repository/notification/notificationRepository";
import Button from "../buttons/Button";
import Notification from "../../entities/Notification";
import { PostEntity } from "../../entities/PostEntity";
import { postRepository } from "../../server/repository/post/PostRepository";
import NotificationType from "../../entities/NotificationType";
import NotificationPost from "./NotificationPost";
import NotificationFriendshipRequest from "./NotificationFriendshipRequest";

function PostNotification(props: { post: PostEntity }) {
    console.log(props);

    return (
        <div key={props.post.id} className="p-6 overflow-y-auto text-black">
            <div className="flex items-center justify-start mb-5">
                <div
                    className="w-14 h-14 rounded-full bg-cover mr-6"
                    style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_SERVER_URL}/files/${props.post.user.avatar})` }}
                ></div>
                <h4>{props.post.user.name}</h4>
            </div>
            <div className="flex-row p-2 w-fit">
                <h2 className="text-xl m-4">{props.post.title}</h2>
                <p className="m-4">{props.post.description}</p>
            </div>
            <div className="flex flex-row p-4 m-4 items-center">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={1.5}
                    stroke="currentColor"
                    className="w-6 h-6"
                >
                    <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z"
                    />
                </svg>
                <p id={`like-count-${props.post.id}`} className="mx-4 p-1">
                    {props.post.like}
                </p>
            </div>
            <hr className="border-gray-500 w-full p-1" />
        </div>
    );
}

export default function Notifiation() {
    const [displayNotificationDropdown, setDisplayNotificationDropdown] = useState<boolean>(false);
    const [notifications, setNotifiations] = useState<Notification[]>();
    const [notification, setNotifiation] = useState<Notification>();
    const [showPostLiked, setShowPostLiked] = useState<boolean>(false);
    const [notificationCount, setNotificationCount] = useState<number>(notifications ? notifications.length : 0);
    const [notificationToDelete, setNotificationToDelete] = useState<string>();
    const [post, setPost] = useState<PostEntity>();

    useEffect(() => {
        const loadNotification = async () => {
            const { data } = await notificationRepository.listNotification();
            setNotifiations(data);
            setNotificationCount(data.length);
        };
        if (!notification) loadNotification();
        else {
            notifications.push(notification);
            setNotificationCount(notifications.length);
        }
    }, [notification]);

    useEffect(() => {
        if (notifications) setNotificationCount(notifications.length);
    }, [notifications]);

    listener.addListern<Notification>("notification", (data: Notification) => setNotifiation(data));

    const HandleShowNotifications = () => {
        if (!displayNotificationDropdown) setDisplayNotificationDropdown(true);
        else setDisplayNotificationDropdown(false);
    };

    const handleClosePostLiked = () => {
        setShowPostLiked(false);
        setPost(null);
    };

    return (
        <>
            <Button
                onClick={HandleShowNotifications}
                className="relative inline-flex justify-around m-4 mt-8 items-center text-lg font-medium text-center mx-4"
            >
                <svg className="w-8 h-8" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
                </svg>
                <span className="sr-only">Notifications</span>
                <div className="absolute inline-flex items-center justify-center w-6 h-6 text-xs font-bold text-white bg-red-500 border-2 border-white rounded-full -top-2 -right-2 dark:border-gray-900">
                    {notificationCount}
                </div>
            </Button>
            <div
                id="dropdown"
                className={`z-10 top-20 mx-6 relative h-48 overflow-hidden bg-white flex flex-col text-black justify-around max-w-7xl divide-y divide-gray-100 rounded shadow w-64 dark:bg-gray-700 ${
                    !displayNotificationDropdown ? "hidden" : false
                }`}
            >
                <ul
                    className="py-1 text-sm overflow-y-scroll overflow-x-hidden flex flex-col text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownDefaultButton"
                >
                    {notifications && notifications.length ? (
                        notifications.map((notification: Notification) => {
                            return (
                                <li key={notification.id} className="flex flex-row items-center justify-start m-1">
                                    {notification.type === NotificationType.POSTLIKE ? (
                                        <NotificationPost
                                            notification={notification}
                                            notifications={notifications}
                                            setNotifiations={setNotifiations}
                                            setShowPostLiked={setShowPostLiked}
                                            setNotificationToDelete={setNotificationToDelete}
                                            setPost={setPost}
                                        ></NotificationPost>
                                    ) : (
                                        false
                                    )}
                                    {notification.type === NotificationType.FRIENDSHIPREQUEST ? (
                                        <NotificationFriendshipRequest
                                            notification={notification}
                                            setNotifiations={setNotifiations}
                                            notifications={notifications}
                                        ></NotificationFriendshipRequest>
                                    ) : (
                                        false
                                    )}
                                </li>
                            );
                        })
                    ) : (
                        <li className="self-center items-center flex flex-col p-6 justify-center justify-around">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="w-6 h-6"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                                />
                            </svg>

                            <p className="py-4">Nao tem nada na sua caixa de mensagens</p>
                        </li>
                    )}
                    <li className="self-center">
                        <a
                            href="#"
                            onClick={HandleShowNotifications}
                            className="block px-96 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                        >
                            Fechar
                        </a>
                    </li>
                </ul>
            </div>

            <div
                id="staticModal"
                data-modal-backdrop="static"
                tabIndex={-1}
                className={`${
                    !showPostLiked ? "hidden" : ""
                } fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full`}
            >
                <div className="relative w-full h-full max-w-2xl md:h-auto">
                    <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                        <div className="flex items-start justify-between p-4 border-b rounded-t dark:border-gray-600">
                            <Button
                                onClick={handleClosePostLiked}
                                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                                data-modal-hide="staticModal"
                            >
                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                                    <path
                                        fill-rule="evenodd"
                                        d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                        clip-rule="evenodd"
                                    ></path>
                                </svg>
                            </Button>
                        </div>
                        <div className="p-6 space-y-6">
                            {post && showPostLiked ? <PostNotification post={post}></PostNotification> : false}
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
