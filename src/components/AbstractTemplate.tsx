'use client'
import { Editor } from "novel";
import { Icon } from "@iconify/react/dist/iconify.js";
import banner from "../../public/banner.png";
import Image from "next/image"


function AbstractTemplate({onContent}: any) {
    return (
        <div className="email-abstraction rounded-lg overflow-hidden bg-white w-[700px] mx-auto">
            <Image src={banner} alt="Banner" priority={true} />
            <div>
                <Editor className="border-0"
                    defaultValue=''
                    disableLocalStorage={ true }
                    onUpdate={(e: any) => onContent(e.getHTML())}/>
            </div>
            <footer className="mt-5 p-5 flex items-center justify-between">
                <span className="text-gray-400 text-sm">
                    &copy; {new Date().getFullYear()} abdelmalik.netlify.app, All right reserved
                </span>
                <div className="socials flex items-center gap-3">
                    <a href="https://www.facebook.com/abdelmalik.abdelghafar" target="_blank">
                        <Icon icon='logos:facebook' fontSize='22px' />
                    </a>
                    <a href="https://www.instagram.com/abdelmalik.abdelghafar" target="_blank">
                        <Icon icon='skill-icons:instagram' fontSize='22px' />
                    </a>
                    <a href="https://twitter.com/Abd_elmalik_" target="_blank">
                        <Icon icon='devicon:twitter' fontSize='22px' />
                    </a>
                    <a href="https://github.com/AbdElmalik100" target="_blank">
                        <Icon icon='bytesize:github' fontSize='22px' />
                    </a>
                </div>
            </footer>
        </div>
    )
}

export default AbstractTemplate