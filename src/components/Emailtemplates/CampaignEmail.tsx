// import { Icon } from "@iconify/react";
import { Body, Container, Head, Hr, Html, Row, Section, Tailwind, Link, Img, Text } from "@react-email/components";
// import { Img } from '@react-email/img';
// import { Text } from '@react-email/text';

interface Props {
    content: string;
}

const baseUrl = process.env.VERCEL_URL
    ? `https://${process.env.VERCEL_URL}`
    : 'http://localhost:3000';

function CampaignEmail({ content = 'Hello world' }: Props) {
    return (
        <Html>
            <Head />
            <Tailwind>
                <Body className="font-sans text-gray-400 bg-gray-100 py-6">
                    <Container className="my-6 bg-white shadow-sm">
                        {/* <Img
                            src={`${baseUrl}/banner.png`}
                            width="100%"
                            height="auto"
                            alt="Abdo newsletter"
                        /> */}
                        <Section className="mx-6 my-6 text-[16px] leading-[23px]">
                            <div dangerouslySetInnerHTML={{ __html: content }} />
                            <Hr />
                            <Row className="flex items-center justify-between p-5">
                                <Text className="text-gray-400 text-sm">
                                    &copy; {new Date().getFullYear()} abdelmalik.netlify.app, All right reserved
                                </Text>
                                <Section className="socials flex items-center gap-3">
                                    <Link href="https://www.facebook.com/abdelmalik.abdelghafar" target="_blank">
                                        {/* <Icon icon='logos:facebook' fontSize='22px' /> */}
                                        <span>FACEBOOK</span>
                                    </Link>
                                    <Link href="https://www.instagram.com/abdelmalik.abdelghafar" target="_blank">
                                        {/* <Icon icon='skill-icons:instagram' fontSize='22px' /> */}
                                        <span>INSTAGRAM</span>
                                    </Link>
                                    <Link href="https://twitter.com/Abd_elmalik_" target="_blank">
                                        {/* <Icon icon='devicon:twitter' fontSize='22px' /> */}
                                        <span>X</span>
                                    </Link>
                                    <Link href="https://github.com/AbdElmalik100" target="_blank">
                                        {/* <Icon icon='bytesize:github' fontSize='22px' /> */}
                                        <span>GITHUB</span>
                                    </Link>
                                </Section>
                            </Row>
                        </Section>
                    </Container>
                </Body>
            </Tailwind>
        </Html>
    )
}

export default CampaignEmail


