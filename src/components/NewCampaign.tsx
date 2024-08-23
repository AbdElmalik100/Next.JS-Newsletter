'use client'
import { useEmails } from "@/hooks/useEmails";
import MainTemplate from "./AbstractTemplate";
import Button from "./UI/Button"
import { useEffect } from "react";
import { useAppContext } from "@/context";
import { useCampaigns } from "@/hooks/useCampaigns";
import { toast } from 'sonner'



function NewCampaign({ active, setActive, selected }: any) {
    const { setEmail, email } = useEmails()
    const { loading, setLoading, newCampaign, handleChange, setNewCampaign, saveCampaign, startNewCampaign, sendCampaign } = useCampaigns()
    const {user} = useAppContext()

    const saveDraft = async () => {
        try {
            const response = await saveCampaign({ ...newCampaign, user_id: user.id }, email);
            if (response) {
                // if (onClose) onClose();
                const { campaignSaved, emailSaved } = response;
                
                setNewCampaign(campaignSaved);
                setEmail(emailSaved);
                return toast.success(`Campaign successfully saved`)
            }

            toast.error(`Campaign could not be saved.`)
        } catch (error: any) {
            throw new Error(error);
        }
    };
    const sendNewCampaign = async () => {
        try {
            setLoading(true);
            const response = await sendCampaign(newCampaign, email);
            
            if (response) {
                if (response.status === 200) return toast.success(`Campaign successfully sent`);
            }
            return toast.error(`Campaign failed to be sent!`);
        } catch (error: any) {
            throw new Error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (!selected) startNewCampaign();        
        setLoading(false);
    }, [])
    return (
        <div className={`new-campaign fixed w-full h-full top-0 bg-white transition-all duration-500 ease-in-out ${active ? 'left-0' : 'left-[350vh]'}`}>
            <div className="head flex items-center justify-between border-b p-4 px-10">
                <h1 className="font-bold text-xl">New campaign</h1>
                <div className="flex gap-3">
                    <Button title="Close" handleClick={() => {setActive(false) , startNewCampaign()}} />
                    <Button title="Save draft" handleClick={saveDraft} />
                    <Button title="Send" isPrimary={true} handleClick={sendNewCampaign} loading={loading} />
                </div>
            </div>
            <div className="content-container flex items-start justify-start">
                <div className="side-form w-[300px] p-4 border-r h-screen">
                    <form className="flex flex-col gap-3">
                        <label>
                            <span className="block mb-1 font-bold">Name</span>
                            <input
                                className="border rounded-lg p-2 px-3 w-full"
                                type="text"
                                name="name"
                                placeholder="Campaign title..."
                                value={newCampaign.name}
                                onChange={handleChange}
                            />
                        </label>
                        <label>
                            <span className="block mb-1 font-bold">From</span>
                            <input
                                className="border rounded-lg p-2 px-3 w-full select-none"
                                type="text"
                                disabled
                                name="from"
                                placeholder={newCampaign.from}
                            />
                        </label>
                        <label>
                            <span className="block mb-1 font-bold">Subjcet</span>
                            <input
                                className="border rounded-lg p-2 px-3 w-full"
                                type="text"
                                name="subject"
                                placeholder="Campaign subject"
                                value={newCampaign.subject}
                                onChange={handleChange}
                            />
                        </label>
                    </form>
                </div>
                <div className="bg-gray-300 w-full h-screen overflow-auto p-8">
                    <MainTemplate onContent={(content: any) => setEmail((prevVal: any) => ({ ...prevVal, content }))} />
                </div>
            </div>
        </div>
    )
}

export default NewCampaign