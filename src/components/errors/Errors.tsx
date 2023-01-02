import { AppError } from "./AppError"


export function Errors(errors: AppError) {
    return (<div>
        {errors.message.map((error) => {
            return (
                <div key={error}>
                    <p className="p-2">{error}</p>
                </div>
            )
        })}
    </div>)
}