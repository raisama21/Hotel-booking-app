import avatar from "@/assets/avatar.jpg"
import { NavLink } from "react-router-dom"

import { useLogout } from "@/hooks/useLogout"
import { useAuthContext } from "@/hooks/useAuthContext"

interface DropDownMenuPropsType {
    handleClick: () => void
}

const DropdownMenu = ({ handleClick }: DropDownMenuPropsType) => {
    const { logout } = useLogout()
    const { state } = useAuthContext()

    function handlLogout(): void {
        logout()

        handleClick()
    }

    return (
        <div className="absolute w-80 right-0 top-12 shadow-md bg-background border border-primary-border rounded-sm">
            <div className="flex items-center gap-4 py-4 px-6 border-b border-primary-border">
                <div className="w-16 h-16">
                    <img src={avatar} className="rounded-full cursor-pointer" />
                </div>
                <div>
                    <h4 className="font-bold text-text text-xl capitalize cursor-pointer">{state.user?.userName}</h4>
                    <div className="font-normal lowercase cursor-pointer">{state.user?.email}</div>
                </div>
            </div>

            <nav className="my-4">
                <NavLink to="setting/your-bookings" onClick={handleClick} className="block h-10 w-full text-left text-text font-normal">
                    <div className="mx-4 h-full flex">
                        <span className="self-center">Your bookings</span>
                    </div>
                </NavLink>

                {state.user?.role === "admin" && (
                    <NavLink to="admin/dashboard" onClick={handleClick} className="block h-10 w-full text-left text-text font-normal">
                        <div className="mx-4 h-full flex">
                            <span className="self-center">Dashboard</span>
                        </div>
                    </NavLink>
                )
                }

                <button onClick={handlLogout} className="h-10 w-full text-left text-text font-normal">
                    <span className="mx-4 self-center">Log out</span>
                </button>

            </nav>
        </div>
    )
}

export default DropdownMenu;
