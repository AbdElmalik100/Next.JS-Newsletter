'use client'

import Button from "./UI/Button"
import { useState } from "react"
import NewCampaign from "./NewCampaign"

function Header() {
    const [active, setActive] = useState<boolean>(false)
    return (
        <>
            <header className="flex items-center justify-between border-b p-5 px-8">
                <h2 className="text-2xl font-bold capitalize">Welcome</h2>
                <Button isPrimary={true} title="New campaign" icon="ic:round-plus" handleClick={() => setActive(true)} />
            </header>
            <NewCampaign active={active} setActive={setActive} />
        </>
    )
}

export default Header