import { useEffect, useState } from "react";
import { PostEntity } from "../../entities/PostEntity";
import { postRepository } from "../../server/repository/post/PostRepository";
import { serverRepository } from "../../server/ServerRepository";
import Button from "../buttons/Button";

interface IGetPostList {
    total: number;
    current_page: number;
    per_page: number;
    posts: PostEntity[]
}

async function getPostList(page: number, userId?: string): Promise<IGetPostList> {
    try {
        const token = JSON.parse(localStorage.getItem('user')).token;
        if (token) {
            serverRepository.setJWT(token);
            const response = await postRepository.listPost(page, userId);
            return {
                total: response.total,
                current_page: response.current_page,
                per_page: response.per_page,
                posts: response.data
            }
        }
    } catch (error) {
        console.log(error);

    }

}


async function addLike(postId: string) {
    try {
        const token = JSON.parse(localStorage.getItem('user')).token;
        if (token) {
            serverRepository.setJWT(token);
            const response = await postRepository.addLike(postId);
            if (response.data.likeIsAdd = true) {
                return true;
            }
        }
    } catch (error) {
        console.log(error);

    }
}

export default function Post(props: { userId?: string }) {
    const [posts, setPosts] = useState<PostEntity[]>([]);
    const [total, setTotal] = useState<number>();
    const [page, setPage] = useState<number>();
    const [loading, setLoading] = useState(false)

    const handleViewMore = () => {
        if (posts.length <= total) {

            const loadPage = async () => {
                const res = await getPostList(page + 1, props.userId);

                if (res) {
                    const previous = posts;

                    if (previous)
                        setPosts([...previous, ...res.posts])

                    setPage(res.current_page);
                }
            }
            loadPage();
        }
    }

    useEffect(() => {
        window.addEventListener('postUpdated', () => {
            loadPost()
        })
        const loadPost = async () => {
            if (JSON.parse(localStorage.getItem('user')).token) {
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
            }
        }
        loadPost();
    }, []);

    const handleAddLike = async (postId: string) => {
        if (await addLike(postId)) {
            posts.map((post) => {
                if (post.id === postId) {
                    const like = document.getElementById(postId);
                    like.textContent = String(parseInt(like.textContent) + 1);
                }
            })
        } else {
            const like = document.getElementById(postId);
            like.style.color = 'red'
            await new Promise(resolve => setTimeout(resolve, 4000));
            like.style.color = 'white'
        }
    }

    if (posts) {
        return (
            <div className="text-white">
                {posts.map((post) => {
                    return (
                        <div key={post.id} className='p-6 overflow-y-auto'>
                            <div className="flex items-center justify-start mb-5">
                                <div className="w-14 h-14 rounded-full bg-cover mr-6" style={{ backgroundImage: `url(${process.env.NEXT_PUBLIC_SERVER_URL}/files/${post.user.avatar})` }}></div>
                                <h4>{post.user.name}</h4>
                            </div>
                            <div className='flex-row p-2 w-fit'>
                                <h2 className='text-xl m-4'>{post.title}</h2>
                                <p className="m-4">{post.description}</p>
                            </div>
                            <div className='flex flex-row p-4 m-4 items-center'>
                                <Button onClick={() => handleAddLike(post.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.5c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V3a.75.75 0 01.75-.75A2.25 2.25 0 0116.5 4.5c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.904M14.25 9h2.25M5.904 18.75c.083.205.173.405.27.602.197.4-.078.898-.523.898h-.908c-.889 0-1.713-.518-1.972-1.368a12 12 0 01-.521-3.507c0-1.553.295-3.036.831-4.398C3.387 10.203 4.167 9.75 5 9.75h1.053c.472 0 .745.556.5.96a8.958 8.958 0 00-1.302 4.665c0 1.194.232 2.333.654 3.375z" />
                                    </svg>
                                </Button>
                                <p id={post.id} className='mx-4 p-1'>{post.like}</p>
                            </div>
                            <hr className='border-gray-500 w-full p-1' />
                        </div>
                    )
                })}
                {posts.length !== total ? <div className="flex justify-around shadow-xl p-4">
                    <Button className="border-gray-300 bg-indigo-900" onClick={handleViewMore}>
                        Exibir Mais
                    </Button>
                </div> : false}
            </div>
        )
    }
}