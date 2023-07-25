import { FC, useState } from "react"
import { Link } from "react-router-dom"

import { ReactComponent as NotificationIcon } from "@/assets/notification.svg"
import avatar from "@/assets/avatar.jpg"

import DropdownMenu from "./dropdownMenu"
import { useAuthContext } from "@/hooks/useAuthContext"

const NavigationBar: FC = () => {
    const [showDropdown, setShowDropdown] = useState<boolean>(false)

    const { state } = useAuthContext()
    const { user } = state

    function handleClick(): void {
        setShowDropdown(!showDropdown)
    }

    return (
        <nav className="w-full h-16 px-8 flex items-center text-text border-b border-primary-border shadow-md">
            <h2 className="text-2xl font-bold cursor-pointer">
                <Link to="/">Book Me</Link>
            </h2>

            {!user?.email && (
                <div className="ml-auto font-semibold text-text">
                    <button className="h-10 px-4 mr-4 bg-secondary-button rounded-md">
                        <Link to="/login">Log in</Link>
                    </button>
                    <button className="h-10 px-4 bg-primary-button rounded-md">
                        <Link to="/signup">Sign up</Link>
                    </button>
                </div>
            )}

            {user?.email && (
                <>
                    <div className="ml-auto mr-4 cursor-pointer">
                        <NotificationIcon className="h-6 w-6" />
                    </div>

                    <div className="mr-6">
                        <Link to="hotel/book-a-room"
                            className="block h-10 px-4 text-white font-bold bg-primary-button border border-primary-button rounded-md"
                        >
                            <div className="mx-4 h-full flex">
                                <span className="self-center">Book a room</span>
                            </div>
                        </Link>
                    </div>

                    <div className="relative">
                        <div onClick={handleClick} className="h-10 w-10  rounded-full cursor-pointer">
                            <img src={avatar} className="rounded-full" />
                        </div>

                        {showDropdown && <DropdownMenu handleClick={handleClick} />}
                    </div>
                </>
            )}
        </nav>
    )
}

export default NavigationBar
