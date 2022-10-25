import { useState } from "react";

export default function useSendPost(){
    const [title, setTitle] = useState<string>();
    const [description, setDescription] = useState<string>();

    return {
        title,
        setTitle,
        description,
        setDescription
    };
}