'use client';
import { useAppContext } from "@/context";
import { useNavigation } from "@/hooks/useNavigation";
import { supabase } from "@/lib/supabase";
import { isValidEmail } from "@/lib/utils";
import { UserForm } from "@/types";
import { useState } from "react";

function login() {
    const [userForm, setUserForm] = useState<UserForm>({
        email: '',
        password: ''
    })
    const { router } = useNavigation()
    const { setUser } = useAppContext()
    const [error, setError] = useState<string | undefined>(undefined)
    const [loading, setLoading] = useState<boolean>(false)

    const login = async () => {
        if (userForm.email.length < 4 || userForm.password.length < 4) return alert("Please enter a valid email address & password length must be at least 4 characters.")

        if (!isValidEmail(userForm.email)) return alert("Please enter a valid email address");


        try {
            setLoading(true)
            const { data, error }: any = await supabase.auth.signInWithPassword({
                email: userForm.email,
                password: userForm.password
            })
            if (error) return setError("Invalid email address or password")
            if (data) {
                await supabase.auth.setSession({
                    access_token: data.session.access_token,
                    refresh_token: data.session?.refresh_token
                })
                setUser(data)
                router.refresh()
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="login-page min-h-screen bg-gray-100 py-8">
            <div className="login-box p-8 py-10 rounded-lg shadow-lg w-[400px] mx-auto bg-white flex flex-col gap-4">
                <h2 className="text-3xl font-bold text-center">Login</h2>
                <label>
                    <span className="block mb-1">Email address</span>
                    <input
                        className="p-2 px-4 rounded-lg border w-full"
                        type="email"
                        name="email"
                        placeholder="me@mail.com"
                        value={userForm.email}
                        onChange={(e) => setUserForm({ ...userForm, email: e.target.value })}
                    />
                </label>
                <label>
                    <span className="block mb-1">Password</span>
                    <input
                        className="p-2 px-4 rounded-lg border w-full"
                        type="password"
                        name="password"
                        placeholder="Enter Your password"
                        value={userForm.password}
                        onChange={(e) => setUserForm({ ...userForm, password: e.target.value })}
                    />
                </label>
                {
                    error &&
                    <span className="block p-2 px-3 text-center bg-rose-100 text-rose-800 border-rose-800 rounded-lg">
                        {error}
                    </span>
                }
                <button className={`bg-red-800 text-white mt-5 transition ease-in-out hover:bg-red-600 p-2 px-5 rounded-lg ${loading ? 'opacity-50 hover:bg-red-800' : ''}`}
                    disabled={loading ? true : false}
                    onClick={login}>
                    {loading ? 'Loading...' : 'Login'}
                </button>
            </div>
        </div>
    )
}

export default login;
