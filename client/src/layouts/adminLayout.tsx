import { Outlet } from "react-router-dom";
import AdminNavigationBar from "@/components/adminNavigationBar"

export default function AdminLayout() {
    return (
        <main>
            <div className="flex gap-8">
                <AdminNavigationBar />

                <div className="mt-6">
                    <Outlet />
                </div>
            </div>
        </main>
    )
}
