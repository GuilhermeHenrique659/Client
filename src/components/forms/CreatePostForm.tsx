import { useState } from "react";
import { PostEntity } from "../../entities/PostEntity";
import useSendPost from "../../hooks/PostHooks";
import { postRepository } from "../../server/repository/post/PostRepository";
import Button from "../buttons/Button";
import { Errors } from "../errors/Errors";
import Input from "./input";
import { AppError } from "../errors/AppError";

interface ICreatePost {
    token: string
    closeForm: () => void;
}

export default function CreatePostForm(props: ICreatePost) {
    const { title, setTitle, description, setDescription } = useSendPost()
    const [error, setError] = useState<AppError>();

    const handleSubmitPost = async (e) => {
        e.preventDefault()
        const post = new PostEntity({
            title,
            description,
        })
        try {
            await postRepository.savePost(post);
            const postUpdated = new Event('postUpdated');
            window.dispatchEvent(postUpdated);
            props.closeForm()
        } catch (error) {
            setError(error)
        }
    }

    return (
        <form onSubmit={handleSubmitPost}>
            <Input type="text" className='w-full p-4' label="Titulo" onChange={setTitle}></Input>
            <div className='w-5/6 p-4'>
                <label className='mb-4'>Descrição</label>
                <textarea name="description" className='text-black w-full mt-4 rounded-md' onChange={e => setDescription(e.target.value)} rows={10}></textarea>
            </div>
            {error ? Errors(error) : false}
            <div className='flex justify-between '>
                <Button className='flex items-center justify-around'>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" className="w-6 h-6">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                    </svg>
                </Button>
                <Button className='flex items-center justify-around' onClick={props.closeForm}>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>

                </Button>
            </div>
        </form>
    )
}