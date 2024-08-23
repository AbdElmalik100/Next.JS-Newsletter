import CampaignEmail from "@/components/Emailtemplates/CampaignEmail";
import { resend } from "@/lib/resend";
import { supabaseAdmin } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();

    const { campaign, email: emailData } = body;

    try {
        if (!campaign || !emailData) return NextResponse.json({ error: 'Missing campaign or email' })

        const { data: subscribers, error } = await supabaseAdmin
            .from('subscribers')
            .select('*')
        console.log(campaign);
        console.log("#".repeat(50));
        console.log(emailData);
        console.log("#".repeat(50));
        console.log(subscribers);
        console.log("#".repeat(50));
        


        let subscribersMapped = subscribers?.map(({ email }) => email) || [];

        console.log(subscribersMapped);
        

        const promises = subscribersMapped
            .map((to: string) => {
                return resend.emails.send({
                    from: campaign.from,
                    to,
                    subject: campaign.subject,
                    react: CampaignEmail({ content: emailData.content })
                })
            })        

        const { data: campaignSaved } = await supabaseAdmin
            .from("campaigns")
            .upsert({ id: campaign.id, status: 'Sent' })
            .select()

        if (campaignSaved) console.log(campaignSaved)

        const responses = await Promise.all(promises);

        return NextResponse.json({
            status: 200,
            responses
        })
    } catch (error) {
        console.log(error);
        
        return NextResponse.json({ error: error, status: 400 });
    }
}