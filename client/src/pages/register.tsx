import { Link, Navigate } from "react-router-dom"

/* react-icons */
import { CgArrowLongRight } from "react-icons/cg"

import Illustration from "@/assets/login-and-signup-illustration.webp"

import RegisterField from "@/components/registerField"

import { useAuthContext } from "@/hooks/useAuthContext"

export default function Register() {
    const { state } = useAuthContext()

    if (state.user) {
        return <Navigate to="/" />
    }

    return (
        <div className="w-full min-h-screen p-4 flex items-center bg-[linear-gradient(-135deg,#c850c0,#4158d0)]">
            <div
                className="w-full max-w-5xl mx-auto flex justify-center gap-16 items-top pt-24 pb-8 px-4 bg-background rounded-lg"
            >
                <div className="hidden md:block">
                    <img src={Illustration} alt="#" className="max-w-xs" />
                </div>

                <div className="w-full md:max-w-xs">
                    <h2 className="mb-12 text-2xl font-semibold text-center">User Signup</h2>

                    <RegisterField />

                    <div className="mt-32 text-sm tex-text">
                        <Link
                            to="/login"
                            className="flex justify-center items-center gap-4 transition-color duration-200 ease-out hover:text-primary-button"
                        >
                            <span>Login to your account</span>
                            <CgArrowLongRight />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

