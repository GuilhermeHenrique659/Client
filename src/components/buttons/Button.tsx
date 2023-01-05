type IButtonProps = {
    className?: string;
    children: any;
} & React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>

export default function Button(props: IButtonProps) {
    return (
        <button onClick={props.onClick} disabled={props.disabled} className={
            `w-24 h-11 rounded-md ${props.className}`}>
            {props.children}
        </button>
    )
}