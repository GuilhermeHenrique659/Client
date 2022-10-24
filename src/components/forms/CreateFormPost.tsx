import Input from "./input";


export default function CreateFormPost() {
    return (
        <form>
            <Input type="text" label="Titulo"></Input>
            <textarea name="description" className='w-5/6' rows={10}></textarea>
        </form>
    )
}