'use client'

import { useNavigation } from '@/hooks/useNavigation';
import Link from 'next/link';
import { Icon } from '@iconify/react';
import { MenuLinks } from '@/types';


function Menu({menuLinks}: {menuLinks: MenuLinks}) {
    const { pathname } = useNavigation()
    
    return (
        <div> 
            <span className='text-sm font-semibold text-gray-500 mb-2 block'>{menuLinks.groupName}</span>
                <ul className="px-2 flex flex-col gap-1">
                    {
                        menuLinks.list.map((link, index) =>
                            <li key={index} className={`rounded-lg p-1.5 text-base px-3 transition ease-in-out hover:bg-slate-50 ${pathname === link.path ? 'bg-slate-50' : ''}`}>
                                {pathname === link.path}
                                <Link className='flex items-center gap-2' href={link.path}>
                                    <Icon icon={link.icon} />
                                    <span className='font-semibold'>{link.title}</span>
                                </Link>
                            </li>
                        )
                    }
                </ul>
        </div>
    )
}

export default Menu