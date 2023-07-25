import { Outlet, Navigate } from "react-router-dom"
import NavigationBar from "@/components/navigationBar"
import { useAuthContext } from "@/hooks/useAuthContext"

export default function RootLayout() {
    const { state } = useAuthContext()

    if (!state.user?.token) {
        return <Navigate to="/login" />
    }

    return (
        <>
            <NavigationBar />
            <Outlet />
        </>
    )

}
