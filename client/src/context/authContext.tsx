import { Dispatch, FC, PropsWithChildren, createContext, useReducer } from "react";

interface Payload {
    _id: string;
    userName: string;
    email: string;
    token: string;
    role: string;
    hotel_id: string;
}

interface User {
    user: null | Payload
}

type Action =
    | { type: "LOGIN", payload: Payload }
    | { type: "LOGOUT" }

interface AuthContextTypes {
    state: User;
    dispatch: Dispatch<Action>
}

export const AuthContext = createContext<AuthContextTypes>({} as AuthContextTypes)

const authReducer = (state: User, action: Action): User => {

    switch (action.type) {
        case "LOGIN":
            return { user: action.payload }

        case "LOGOUT":
            return { user: null }

        default:
            return state
    }

}

export const AuthContextProvider: FC<PropsWithChildren> = ({ children }) => {

    const [state, dispatch] = useReducer(authReducer, { user: null }, () => {
        const user_info = localStorage.getItem("user_info")
        return user_info ? { user: JSON.parse(user_info) } : { user: null }
    })

    return (
        <AuthContext.Provider value={{ state, dispatch }}>
            {children}
        </AuthContext.Provider>
    )

}

