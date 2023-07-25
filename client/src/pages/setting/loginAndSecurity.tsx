import { Link, Navigate } from "react-router-dom"
import { FormEvent, useState } from "react"

import { useAuthContext } from "@/hooks/useAuthContext"
import { useLogout } from "@/hooks/useLogout"

import { ReactComponent as CloseIcon } from "@/assets/close.svg"

export default function LoginAndSecurity() {
    const { state } = useAuthContext()

    const [show, setShow] = useState<boolean>(false)
    const [response, setResponse] = useState<boolean>(false)
    const { logout }= useLogout()

    function handleShowClick(): void {
        setShow((prevData) => !prevData)
    }

    async function handleDeleteAccount(e: FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault()

        const response = await fetch("/api/user/delete", {
            method: "DELETE",
            headers: {
                Authorization: `Bearer ${state.user?.token}`
            }
        })

        setResponse(response.ok)

        return response.json()
    }

    if (response) {
        logout()
    }

    if (!state.user?.token) {
        return <Navigate to="/login" />
    }

    return (
        <div className="max-w-3xl">
            <div className="mt-4 mb-6">
                <h2 className="text-xl font-semibold">Login</h2>
            </div>

            <div className="mb-6">
                <h4 className="mb-4 font-semibold">Password</h4>

                <div className="pb-12 border-b-2 border-primary-border">
                    <div>
                        <p>
                            To reset your password you need to go here
                            <Link to="/" className="pl-2 text-purple-500 font-semibold underline underline-offset-2">Password reset page</Link>
                        </p>
                    </div>
                </div>
            </div>

            <div>
                <h4 className="mb-6 font-semibold">Delete Account</h4>

                <div className="pb-4 border-b-2 border-primary-border">
                    <div>
                        <p className="font-normal mb-2">
                            By deleting your account, you'll no longer be able to access any of your hotel data or log in to Book Me.
                        </p>
                    </div>

                    <div>
                        <button onClick={handleShowClick} className="h-10 px-4 mr-4 bg-primary-button text-text font-semibold">Delete account</button>
                    </div>
                </div>
                {show &&
                    <div className="fixed top-12 w-full max-w-lg mx-auto">
                        <div className="flex flex-col bg-white md:border md:rounded-xl md:shadow-sm">
                            <div className="flex justify-between items-center py-3 px-4 border-b">
                                <h3 className="font-bold text-gray-800">Delete account</h3>
                                <button onClick={handleShowClick} className="inline-flex flex-shrink-0 justify-center">
                                    <CloseIcon className="w-6 h-6"/>
                                </button>
                            </div>

                            <div className="p-4 overlay-y-auto">
                                <p className="mt-1 text-gray-800">
                                    Deleting your account will permanently erase all data and revoke access to services. Please consider the loss of information, 
                                    communications, and impact on services before proceeding. 
                                </p>
                            </div>

                            <div className="flex justify-end items-center gap-x-2 py-3 px-4 border-t">
                                <button onClick={handleShowClick} className="py-3 px-4 inline-flex justify-center bg-secondary-button font-semibold">Close</button>
                                <form onSubmit={handleDeleteAccount}>
                                    <button className="py-3 px-4 inline-flex justify-center bg-primary-button font-semibold">Confirm</button>
                                </form>
                            </div>
                        </div>
                    </div>
                }                
            </div>
        </div>
    )
}
