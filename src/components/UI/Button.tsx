import { Icon } from "@iconify/react"

type Props = {
    isPrimary?: Boolean,
    icon?: string
    title?: string,
    loading?: boolean
    handleClick?: () => void
}


function Button({
    isPrimary = false,
    icon,
    title,
    loading = false,
    handleClick
}: Props) {
    return (
        <button className={`rounded-lg p-2 px-5 flex items-center gap-1 transition ease-in-out text-sm font-bold  ${isPrimary ? 'text-white shadow-lg bg-neutral-950 hover:bg-neutral-600' : 'text-black border hover:bg-neutral-50'}`}
            onClick={handleClick}>
            {
                loading ?
                    <>
                        <Icon icon='eos-icons:loading' className="text-xl" />
                        <span className="block">
                            Loading...
                        </span>
                    </>
                    :
                    <>
                        {icon && <Icon icon={icon} className="text-xl" />}
                        <span>{title}</span>
                    </>
            }
        </button>
    )
}

export default Button