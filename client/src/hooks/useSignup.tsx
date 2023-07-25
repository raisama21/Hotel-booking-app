import { useState } from "react"
import { useAuthContext } from "./useAuthContext"

export const useSignup = () => {

    const [error, setError] = useState<null>(null)
    const [isLoading, setIsloading] = useState<boolean>(false)
    const { dispatch } = useAuthContext();

    const signup = async (userName: string, email: string, password: string): Promise<void> => {
        setIsloading(true)
        setError(null)

        const response = await fetch("/api/user/signup", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ userName, email, password })
        })

        const data = await response.json()

        if (!response.ok) {
            setIsloading(false)
            setError(data.error)
        }

        if (response.ok) {
            /* save the use to localstorage */
            localStorage.setItem("user_info", JSON.stringify(data))

            /* update the authContext */
            dispatch({ type: "LOGIN", payload: data })

            setIsloading(false)

        }
    }

    return { error, isLoading, signup }

}
