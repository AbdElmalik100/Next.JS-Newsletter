import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"

export const useNavigation = () => {
    const [open, setOpen] = useState<boolean>(false)
    const [active, setActive] = useState<string>('')


    const router = useRouter()
    const params = useParams()
    const pathname = usePathname()
    const searchParams = useSearchParams()



    return {
        open,
        setOpen,
        active,
        setActive,
        router,
        params,
        searchParams,
        pathname,
    }
}