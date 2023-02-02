import { useEffect, useState } from "react";
import { PostEntity } from "../../entities/PostEntity";
import { postRepository } from "../../server/repository/post/PostRepository";
import { serverRepository } from "../../server/ServerRepository";
import Button from "../buttons/Button";
import useLike from "../../hooks/LikeHooks";
import { useRouter } from "next/router";
import { Files } from "../../entities/Files";

interface IGetPostList {
    total: number;
    current_page: number;
    per_page: number;
    posts: PostEntity[];
}

function postImages(images: Files[]) {
    if (images.length > 1)
        return (
            <>
                <section className="overflow-hidden text-gray-700">
                    <div className="container px-5 py-2 mx-auto lg:pt-24 lg:px-32">
                        <div className="flex flex-wrap -m-1 md:-m-2">
                            <div className="flex flex-wrap w-1/2">
                                <div className="w-1/2 p-1 md:p-2">
                                    <img alt="gallery" className="block object-cover object-center w-full h-full rounded-lg" src="" />
                                </div>
                                <div className="w-1/2 p-1 md:p-2">
                                    <img
                                        alt="gallery"
                                        className="block object-cover object-center w-full h-full rounded-lg"
                                        src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(72).webp"
                                    />
                                </div>
                                <div className="w-full p-1 md:p-2">
                                    <img
                                        alt="gallery"
                                        className="block object-cover object-center w-full h-full rounded-lg"
                                        src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(73).webp"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap w-1/2">
                                <div className="w-full p-1 md:p-2">
                                    <img
                                        alt="gallery"
                                        className="block object-cover object-center w-full h-full rounded-lg"
                                        src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(74).webp"
                                    />
                                </div>
                                <div className="w-1/2 p-1 md:p-2">
                                    <img
                                        alt="gallery"
                                        className="block object-cover object-center w-full h-full rounded-lg"
                                        src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(75).webp"
                                    />
                                </div>
                                <div className="w-1/2 p-1 md:p-2">
                                    <img
                                        alt="gallery"
                                        className="block object-cover object-center w-full h-full rounded-lg"
                                        src="https://mdbcdn.b-cdn.net/img/Photos/Horizontal/Nature/4-col/img%20(77).webp"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </>
        );
}

async function getPostList(page: number, userId?: string): Promise<IGetPostList> {
    try {
        const { data } = await postRepository.listPost(page, userId);
        return {
            total: data.total,
            current_page: data.current_page,
            per_page: data.per_page,
            posts: data.posts,
        };
    } catch (error) {
        console.log(error);
    }
}

export default function Post(props: { userId?: string }) {
    const [posts, setPosts] = useState<PostEntity[]>([]);
    const [total, setTotal] = useState<number>();
    const [page, setPage] = useState<number>();
    const [loading, setLoading] = useState(false);
    const handleAddLike = useLike();
    const router = useRouter();

    const handleViewMore = () => {
        if (posts.length <= total) {
            const loadPage = async () => {
                const res = await getPostList(page + 1, props.userId);

                if (res) {
                    const previous = posts;

                    if (previous) setPosts([...previous, ...res.posts]);

                    setPage(res.current_page);
                }
            };
            loadPage();
        }
    };

    useEffect(() => {
        window.addEventListener("postUpdated", () => {
            loadPost();
        });
        const loadPost = async () => {
            setLoading(true);
            const res = await getPostList(1, props.userId);

            if (res) {
                setTotal(res.total);
                setPage(res.current_page);
                setPosts(res.posts);
                setLoading(false);
            } else {
                setPosts([]);
            }
        };
        loadPost();
    }, []);

    if (posts) {
        return (
            <div className="text-white">
                {posts.map((post) => {
                    return (
                        <div key={post.id} className="p-6 overflow-y-auto">
                            <div className="flex items-center justify-start mb-5">
                                <Button onClick={() => router.push("/profile?&userId=" + post.user.id)}>
                                    <div
                                        className="w-14 h-14 rounded-full bg-cover mr-6"
                                        style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_SERVER_URL}/files/${post.user.avatar})` }}
                                    ></div>
                                </Button>
                                <h4>{post.user.name}</h4>
                            </div>
                            <div className="flex-row p-2 w-fit">
                                <h2 className="text-xl m-4">{post.title}</h2>
                                <p className="m-4">{post.description}</p>
                                {post.files.length ? (
                                    <img
                                        className="h-96 items-center"
                                        src={`${process.env.NEXT_PUBLIC_SERVER_URL}/files/${post.files[0].filename}`}
                                        alt=""
                                    />
                                ) : (
                                    false
                                )}
                            </div>
                            <div className="flex flex-row p-4 m-4 items-center">
                                <Button onClick={() => handleAddLike(post.id)}>
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
                                </Button>
                                <p id={`like-count-${post.id}`} className="mx-4 p-1">
                                    {post.like}
                                </p>
                            </div>
                            <hr className="border-gray-500 w-full p-1" />
                        </div>
                    );
                })}
                {posts.length !== total ? (
                    <div className="flex justify-around shadow-xl p-4">
                        <Button className="border-gray-300 bg-indigo-900" onClick={handleViewMore}>
                            Exibir Mais
                        </Button>
                    </div>
                ) : (
                    false
                )}
            </div>
        );
    }
}
