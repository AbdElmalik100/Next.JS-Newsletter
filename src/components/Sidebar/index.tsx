'use client'

import UserBox from './UserBox';
import Menu from './Menu';
import { MenuLinks } from '@/types';



function Sidebar() {
    const menuLinks: MenuLinks = {
        groupName: "General",
        list: [
            {
                path: '/',
                icon: 'streamline:dashboard-3',
                title: 'Dashboard'
            },
            {
                path: '/campaigns',
                icon: 'material-symbols-light:stacked-email-outline',
                title: 'Campaigns'
            },
            {
                path: '/subscribers',
                icon: 'ph:users-light',
                title: 'Subscribers'
            },
            {
                path: '/lists',
                icon: 'ph:list-checks-bold',
                title: 'Lists'
            },
        ]
    }

    return (
        <div className="sidebar min-h-screen w-[300px] p-6 py-5 flex flex-col border-r">
            <UserBox />
            <div className='menu grow mt-8'>
                <Menu menuLinks={menuLinks} />
            </div>
        </div>
    )
}

export default Sidebar