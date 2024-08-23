import { Emails, EmailsStatusArray } from "@/types"
import { useState } from "react"

export const useEmails = () => {
    const [loading, setLoading] = useState<boolean>(false)
    const [email, setEmail] = useState<Emails>({
        title: "A new email",
        content: "",
        status: EmailsStatusArray[0],
    })


    return {
        email,
        setEmail,
        loading,
        setLoading
    }
}