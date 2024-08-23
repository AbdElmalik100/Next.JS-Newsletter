"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import { supabase } from "@/lib/supabase";
import { User } from "@/types";
import React, { createContext, useContext, useEffect, useState } from "react";


const AppContext = createContext<any>(undefined);

export function AppWrapper({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | undefined>(undefined)
    const [loading, setLoading] = useState<boolean>(false)

    const fetchUser = async () => {
        try {
            setLoading(true)
            const { data }: any = await supabase.auth.getSession()
            if (data) {
                setUser(data.session.user)
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }
    useEffect(() => {
        fetchUser()
    }, [])

    if (loading) {
        return <div className="fixed grid place-items-center h-full w-full z-10 bg-white">
            <h1 className="font-bold" style={{fontSize: '50px'}}>Loading...</h1>
        </div>
    }
    return <AppContext.Provider value={{ user, setUser, supabase }}>
        <main className="flex items-start justify-start">
            {
                user &&
                <Sidebar />
            }
            <div className="w-full h-full">
                <Header />
                <div className="content p-8">
                    {children}
                </div>
            </div>
        </main>
    </AppContext.Provider>;

};

export function useAppContext() {
    return useContext(AppContext)
}
