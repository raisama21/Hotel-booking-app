import { Outlet } from "react-router-dom"

import SideNavigationBar from "@/components/sideNavigationBar"

export default function SettingLayout() {

    return (
        <div className="w-full flex gap-8">
            <SideNavigationBar />

            <main className="w-full">
                <Outlet />
            </main>
        </div>
    )

}
