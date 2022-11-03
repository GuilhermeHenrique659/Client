interface IButtonProps {
    className?: string;
    children: any;
    onClick?: () => void;
    disable?: boolean
}

export default function Button(props: IButtonProps) {
    return (
        <button onClick={props.onClick} disabled={props.disable} className={
            `w-24 h-11 rounded-md ${props.className}`}>
            {props.children}
        </button>
    )
}