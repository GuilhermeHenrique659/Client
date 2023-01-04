import { serverRepository } from "../server/ServerRepository";
import { postRepository } from "../server/repository/post/PostRepository";

async function addLike(postId: string) {
    try {
        const response = await postRepository.addLike(postId);
        if (response.data.likeIsAdd = true) {
            return true;
        }

    } catch (error) {
        console.log(error);

    }
}

export default function useLike() {

    const handleAddLike = async (postId: string) => {
        if (await addLike(postId)) {
            const like = document.getElementById(`like-count-${postId}`);
            like.textContent = String(parseInt(like.textContent) + 1);
        } else {
            const like = document.getElementById(`like-count-${postId}`);
            like.style.color = 'red'
            await new Promise(resolve => setTimeout(resolve, 4000));
            like.style.color = 'white'
        }
    }

    return handleAddLike;
}