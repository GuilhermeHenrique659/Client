interface IButtonProps {
    className?: string;
    children: any;
    onClick?: () => void;
}

export default function Button(props: IButtonProps) {
    return (
        <button onClick={props.onClick} className={
            `w-24 h-11 rounded-md ${props.className}`}>
            {props.children}
        </button>
    )
}