import UnsubscribeEmail from "@/components/Emailtemplates/UnsubscribeEmail";
import { resend } from "@/lib/resend";
import { supabase } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
    const body = await request.json();
    const { email } = body;

    if (!email) return NextResponse.json({ status: 422, error: "Unprocessable Entity" });

    const { data, error }: any = await supabase
        .from("unsubscribers")
        .insert({ email })
        .select()
        .single()

    if (error) return NextResponse.json({ status: 422, error });

    if (data) {
        try {
            await resend.emails.send({
                from: "Acme <onboarding@resend.dev>",
                to: email,
                replay_to: 'paydaychains200@mail.com',
                subject: 'Confirm your unsubscription',
                react: UnsubscribeEmail({ code: data.id })
            })

            return NextResponse.json({ status: 200 })
        } catch (error) {
            return NextResponse.json({ status: 422, error });
        }
    }
    return NextResponse.json({ status: 200 })
}


export async function GET(request: NextRequest) {
    const code = request.nextUrl.searchParams.get("code")

    if (!code) return NextResponse.json({ status: 422, error: "Unprocessable Entity" });

    const { data, error } = await supabase
        .from("unsubscribers")
        .select()
        .eq("id", code)
        .single()

    if (error) return NextResponse.json({ status: 422, error: "Unprocessable Entity" });

    if (data) {
        const { email } = data

        if (!email) return NextResponse.json({ status: 422, error: "No email found" });

        try {
            const { data, error }: any = await supabase
                .from("subscribers")
                .delete()
                .eq('email', email)


            return NextResponse.json({ status: 200, data })
        } catch (error) {
            return NextResponse.json({ status: 422, error });

        }
    }
}
