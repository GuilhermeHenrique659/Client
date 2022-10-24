

export function Errors(errors: string[]) {
    return (<div>
        {errors.map((error) => {
            return (
                <div key={error}>
                    <p className="p-2">{error}</p>
                </div>
            )
        })}
    </div>)
}