import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { PostEntity } from "../../entities/PostEntity";
import { postRepository } from "../../server/post/PostRepository";
import { serverRepository } from "../../server/ServerRepository";
import Button from "../buttons/Button";

interface IGetPostList {
    total: number;
    current_page: number;
    per_page: number
    posts: PostEntity[]
}

async function getPostList(page: number): Promise<IGetPostList> {
    try {
        const token = JSON.parse(localStorage.getItem('user')).token;
        if (token) {
            serverRepository.setJWT(token);
            const response = await postRepository.listPost(page);
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

export default function Post() {
    const [posts, setPosts] = useState<PostEntity[]>([]);
    const [total, setTotal] = useState<number>();
    const [page, setPage] = useState<number>();
    const [loading, setLoading] = useState(false)

    const handleViewMore = () => {
        if (posts.length <= total) {

            const loadPage = async () => {
                const res = await getPostList(page + 1);

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
        const loadPost = async () => {
            if (JSON.parse(localStorage.getItem('user')).token) {
                setLoading(true);
                const res = await getPostList(1);

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

    console.log(posts.length);
    console.log(total);



    if (posts) {
        return (
            <div className="text-white">
                {posts.map((post) => {
                    return (
                        <div key={post.id} className='p-6 overflow-y-auto'>
                            <div className="flex items-center justify-start mb-5">
                                <div className="w-14 h-14 rounded-full bg-cover mr-6" style={{ backgroundImage: `url(http://localhost:3333/files/${post.user.avatar})` }}></div>
                                <h4>{post.user.name}</h4>
                            </div>
                            <div className='flex-row p-2 w-fit'>
                                <h2 className='text-xl m-4'>{post.title}</h2>
                                <p className="m-4">{post.description}</p>
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