
interface IProps {
    user: Record<string, string>
}

export default function ProfileImage(props: IProps) {
    console.log(props);

    if (props.user) {
        return (
            <div className="flex flex-col items-center">
                <div className="border-black-100 w-64 h-64 m-10  rounded-full bg-cover"
                    style={{ backgroundImage: `url(http://localhost:3333/files/${props.user.avatar})` }}>
                </div>
                <h2 className='m-4 text-lg'>{props.user.name}</h2>
            </div>
        )
    } else {
        return (
            <div>
                <h2>User not Found</h2>
            </div>
        )
    }
}