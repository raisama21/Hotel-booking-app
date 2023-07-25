import { useAuthContext } from "./useAuthContext"

interface useLogoutReturnType {
    logout: () => void
}

export const useLogout = (): useLogoutReturnType => {
    const { dispatch } = useAuthContext()

    const logout = (): void => {
        localStorage.removeItem("user_info")

        dispatch({ type: "LOGOUT" })
    }

    return { logout }
}
