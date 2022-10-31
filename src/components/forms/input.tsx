interface Iinput {
    label: string;
    type?: 'text' | 'email' | 'password' | 'file'
    value?: any
    className?: string
    onChange?: (value: any) => void
}

export default function Input(props: Iinput) {
    return (
        <div className={"flex flex-col p-2 m-4" + props.className}>
            <label><span>{props.label}</span></label>
            <input className="rounded-md text-stone-800 p-1"
                type={props.type ?? 'text'} value={props.value} onChange={e => props.onChange?.(e.target.value)} />
        </div>
    )
}