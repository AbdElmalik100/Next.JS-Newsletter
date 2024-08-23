import { Html, Button, Head, Body, Tailwind, Container, Section, Text } from "@react-email/components";

interface Props {
    code: string;
};

const baseUrl = process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000'


function UnsubscribeEmail({ code }: Props) {
    return (
        <Html lang="en" dir="ltr">
            <Head />
            <Tailwind>
                <Body className="font-sans text-gray-400 bg-gray-100 py-6">
                    <Container className="my-6 bg-white shadow-sm">
                        <Section className="mx-6 my-6 text-[16px] leading-[23px]">
                            <Text>Click the link down below to unsubscribe:</Text>
                            <Button style={{ color: "black", padding: "10px 20px" }} href={`${baseUrl}/api/unsubscribe?code=${code}`}>
                                Unsubscribe
                            </Button>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    );
}

export default UnsubscribeEmail