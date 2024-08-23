import { supabase } from "@/lib/supabase"
import { Campaign, Emails } from "@/types"
import { useState } from "react"



export const useCampaigns = () => {
    const model = {
        name: 'A new campaign',
        from: 'Acme <onboarding@resend.dev>',
        subject: undefined,
        list_id: undefined,
        status: 'Draft',
        user_id: undefined,
        email_id: undefined,
    }
    const [loading, setLoading] = useState<boolean>(false)
    const [newCampaign, setNewCampaign] = useState<Campaign>(model);
    const [campaigns, setCampaigns] = useState<Campaign[]>()

    const startNewCampaign = () => setNewCampaign(model)

    const handleChange = (e: any) => {
        const { name, value } = e.target;
        setNewCampaign((prev: any) => ({
            ...prev,
            [name]: value,
        }));
    };

    const saveEmail = async (email: Emails) => {
        if (!email) return 'Missing email content!'

        try {
            setLoading(true)

            if (email.id) {
                const { data: existingEmail, error } = await supabase
                    .from("emails")
                    .upsert({ id: email.id, ...email })
                    .select()
                    .single()

                return existingEmail;
            }

            const { data: newEmail, error } = await supabase
                .from("emails")
                .insert(email)
                .select()
                .single()

            return newEmail;
        } catch (error: any) {
            throw new Error(error)
        } finally {
            setLoading(false)
        }
    }

    const saveCampaign = async (campaign: Campaign, email: Emails) => {
        try {
            setLoading(true);

            const emailSaved = await saveEmail(email)

            if (emailSaved) {
                const { id: emailId } = emailSaved;
                campaign.email_id = emailId;
                console.log("a7aaaa", campaign);
                
                if (campaign.id) {
                    const { data: campaignSaved, error } = await supabase
                        .from("campaigns")
                        .upsert({ id: campaign.id, ...campaign })
                        .select()
                        .single()
                    console.log(error);
                    console.log(campaignSaved);
                    
                    return {
                        campaignSaved,
                        emailSaved
                    }
                }

                const { data: campaignSaved, error } = await supabase
                    .from("campaigns")
                    .insert(campaign)
                    .select()
                    .single()

                return {
                    campaignSaved,
                    emailSaved
                }
            }

            return undefined
        } catch (error: any) {
            throw new Error(error)
        } finally {
            setLoading(false)
        }
    }

    const getCampaigns = async () => {
        try {
            setLoading(true);

            const { data, error } = await supabase
                .from('campaigns')
                .select('*, email_id(*)')

            if (data) setCampaigns(data)
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    const sendCampaign = async (campaign: Campaign, email: Emails) => {
        try {
            setLoading(true);

            const response = await fetch('/api/campaigns/send', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ campaign, email })
            })

            if (response) {
                const data = await response.json();
                console.log(data);
                return response
            }

            return undefined
        } catch (error: any) {
            throw new Error(error);
        } finally {
            setLoading(false);
        }
    };


    return {
        loading,
        setLoading,
        newCampaign,
        setNewCampaign,
        handleChange,
        campaigns,
        setCampaigns,
        saveCampaign,
        getCampaigns,
        startNewCampaign,
        sendCampaign
    }
}