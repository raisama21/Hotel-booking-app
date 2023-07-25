import { NavLink } from "react-router-dom"

import { useAuthContext } from "@/hooks/useAuthContext"

import avatar from "@/assets/avatar.jpg"
import { ReactComponent as AccountIcon } from "@/assets/account_circle.svg"
import { ReactComponent as LockIcon } from "@/assets/lock.svg"
import { ReactComponent as BookmarkIcon } from "@/assets/bookmark.svg"

const SideNavigationBar = () => {
    const { state } = useAuthContext()

    return (
        <aside>
            <div className="w-72 sticky min-h-[calc(-4rem+100vh)]">
                <div className="pl-4 pt-6">
                    <div className="flex items-center gap-4 mb-4">
                        <div className="w-10 h-10">
                            <img src={avatar} className="rounded-full" />
                        </div>

                        <div>
                            <h4 className="font-semibold text-text text-xl capitalize cursor-pointer">{state.user?.userName}</h4>
                            <p className="font-normal lowercase cursor-pointer">{state.user?.email}</p>
                        </div>
                    </div>

                    <nav>
                        <NavLink to="login-and-security">
                            <div className="flex items-center gap-2 mb-2 p-2 rounded-sm">
                                <span>
                                    <LockIcon className="h-6 w-6" />
                                </span>
                                <span>
                                    <p>Login & Security</p>
                                </span>
                            </div>
                        </NavLink>

                        <NavLink to="your-bookings">
                            <div className="flex items-center gap-2 mb-2 p-2 rounded-sm">
                                <span>
                                    <BookmarkIcon className="h-6 w-6" />
                                </span>
                                <span>
                                    <p>Your bookings</p>
                                </span>
                            </div>
                        </NavLink>
                    </nav>
                </div>
            </div>
        </aside>
    )
}

export default SideNavigationBar
