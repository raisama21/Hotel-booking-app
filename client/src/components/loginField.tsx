import { ChangeEvent, FC, FormEvent, useState } from "react";

import { useLogin } from "@/hooks/useLogin";

/* react-icons */
import { MdEmail } from "react-icons/md";
import { AiFillLock } from "react-icons/ai";

interface UserLoginData {
    email: string;
    password: string;
}

const LoginField: FC = () => {
    const [loginData, setLoginData] = useState<UserLoginData>({
        email: "",
        password: "",
    });

    const { login, error, isLoading } = useLogin();

    const [showPassword, setShowPassword] = useState<boolean>(false);

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        const { name, value } = e.target;

        setLoginData((prevData): UserLoginData => {
            return {
                ...prevData,
                [name]: value,
            };
        });
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();

        await login(loginData.email, loginData.password);
    }

    return (
        <form onSubmit={handleSubmit} className="">
            <div className="mb-4">
                <div className="relative">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full h-12 pl-12 bg-input-background rounded-full"
                        autoComplete="off"
                        onChange={handleChange}
                        value={loginData.email}
                    />
                    <span>
                        <MdEmail className="absolute top-2/4 -translate-y-2/4 left-6" />
                    </span>
                </div>
            </div>
            <div className="mb-5 relative">
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        className="w-full h-12 pl-12 bg-input-background rounded-full"
                        autoComplete="off"
                        onChange={handleChange}
                        value={loginData.password}
                    />
                    <span>
                        <AiFillLock
                            className="absolute top-2/4 -translate-y-2/4 left-6 cursor-pointer hover:scale-125 transition-transform duration-200ms ease-in"
                            onClick={() => setShowPassword(!showPassword)}
                        />
                    </span>
                </div>
            </div>
            <button
                type="submit"
                className={`w-full h-12 text-white font-medium bg-primary-button rounded-full`}
                disabled={isLoading}
            >
                Login
            </button>

            {error && (
                <div className="mt-4 py-2 px-4 text-error bg-error-bg border border-error">
                    {error}
                </div>
            )}
        </form>
    );
};

export default LoginField;
