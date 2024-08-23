'use client';

import { Icon } from "@iconify/react";

export default function Home() {

    return (
        <div className="home-page min-h-screen">
            <div className="grid grid-col-1 md:grid-col-2 lg:grid-cols-4 gap-5">
                <div className="boxes p-6 border rounded-xl font-bold">
                    <div className="flex items-center justify-between">
                        <h1 className="mb-3 text-xl">Campaigns</h1>
                        <Icon icon='mdi:email-sent-outline' className="text-4xl" />
                    </div>
                    <span className="text-3xl">0</span>
                </div>
                <div className="boxes p-6 border rounded-xl font-bold">
                    <div className="flex items-center justify-between">
                        <h1 className="mb-3 text-xl">Subscribers</h1>
                        <Icon icon='ph:users-light' className="text-4xl" />
                    </div>
                    <span className="text-3xl">0</span>
                </div>
                <div className="boxes p-6 border rounded-xl font-bold">
                    <div className="flex items-center justify-between">
                        <h1 className="mb-3 text-xl">Email sent</h1>
                        <Icon icon='material-symbols-light:stacked-email-outline' className="text-4xl" />
                    </div>
                    <span className="text-3xl">0</span>
                </div>
                <div className="boxes p-6 border rounded-xl font-bold">
                    <div className="flex items-center justify-between">
                        <h1 className="mb-3 text-xl">Lists</h1>
                        <Icon icon='ph:list-checks-bold' className="text-4xl" />
                    </div>
                    <span className="text-3xl">0</span>
                </div>
            </div>
        </div>
    );
}
