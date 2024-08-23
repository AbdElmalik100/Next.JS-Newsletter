"use client";
import Image from "next/image";
import banner from "../../../public/banner.png";
import { useState } from "react";
import { isValidEmail } from "@/lib/utils";
import { useAppContext } from "@/context";

function subscribe() {
    const { supabase } = useAppContext()
    const [email, setEmail] = useState<string>("");
    const [loading, setLoading] = useState<boolean>(false)
    const [success, setSuccess] = useState<boolean | undefined>(undefined)

    const subscribeNewsLetter = async () => {
        if (!isValidEmail(email)) return alert("Please provide a valid email address")

        try {
            setLoading(true)
            
            const { data, error } = await supabase
                .from('subscribers')
                .insert({email, owner_id: 'b413136a-3d18-4a42-955a-cac113994bd3'})
                .select()

            if (data) {
                console.log(data);
                return setSuccess(true)
            }
            if (error) {
                console.log(error);
                return setSuccess(false)
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="min-h-screen bg-gray-300 py-8 text-[20px]">
            <div className="container bg-white rounded-lg grid gap-4 shadow-sm max-w-[600px] overflow-hidden">
                <Image src={banner} alt="Banner" priority={true} />
                <div className="grid px-8 gap-5 pb-6 text-center ">
                    {
                        !success
                            ?
                            <>
                                <p>Top 5 links of the week about coding</p>
                                <div className="grid">
                                    <input
                                        className="border p-2 px-4 rounded-lg"
                                        type="email"
                                        name="email"
                                        placeholder="me@mail.com"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                {
                                    success === false &&
                                    <div className="success-error-message error">
                                        <span>You are already subscribed</span>
                                    </div>
                                }
                                <div className="grid">
                                    <button className={`p-2 px-10 text-center bg-red-900 rounded-lg text-white w-fit mx-auto transition ease-in-out hover:bg-red-700 ${loading ? 'opacity-50 hover:bg-red-900' : ''}`}
                                        disabled={loading ? true : false}
                                        onClick={subscribeNewsLetter}>
                                        {loading ? 'Loading...' : 'Subscribe'}
                                    </button>
                                </div>
                            </>
                            :
                            <div className="success-error-message success">
                                <span>Subscription has been sent</span>
                            </div>
                    }
                </div>
            </div>
        </div>
    );
}

export default subscribe;
