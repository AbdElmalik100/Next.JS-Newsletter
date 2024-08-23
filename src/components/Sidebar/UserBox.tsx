'use client'

import { useAppContext } from "@/context"

function UserBox() {
    const { user } = useAppContext()
    return (
        <div className='user flex items-center justify-start overflow-hidden gap-3 border transition ease-in-out hover:bg-gray-50 p-2 cursor-pointer px-3 rounded-xl shadow-md'>
            <div className='avatar bg-green-400 min-w-10 text-white min-h-10 rounded-full grid place-items-center'>
                AV
            </div>
            <div className='info truncate text-ellipsis text-sm'>
                <h3 className='font-bold truncate'>
                    {user.email}
                </h3>
                <span className='block text-gray-400 truncate'>
                    {user.email}
                </span>
            </div>
        </div>
    )
}

export default UserBox