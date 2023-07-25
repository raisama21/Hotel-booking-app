import { ChangeEvent, FC, FormEvent, useState } from "react";

/* react-icons */
import { MdEmail } from "react-icons/md";
import { AiFillLock } from "react-icons/ai";
import { useSignup } from "@/hooks/useSignup";

interface UserRegisterData {
    userName: string;
    email: string;
    password: string;
}

const RegisterField: FC<{}> = () => {
    const [registerData, setRegisterData] = useState<UserRegisterData>({
        userName: "",
        email: "",
        password: "",
    });

    const { error, isLoading, signup } = useSignup();

    const [showPassword, setShowPassword] = useState<boolean>(false);

    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        const { name, value } = e.target;

        setRegisterData((prevData): UserRegisterData => {
            return {
                ...prevData,
                [name]: value,
            };
        });
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault();

        await signup(
            registerData.userName,
            registerData.email,
            registerData.password,
        );
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <div className="relative">
                    <input
                        type="test"
                        name="userName"
                        placeholder="User name"
                        className="w-full h-12 pl-12 bg-input-background rounded-full"
                        autoComplete="off"
                        onChange={handleChange}
                        value={registerData.userName}
                    />
                    <span>
                        <MdEmail className="absolute top-2/4 -translate-y-2/4 left-6" />
                    </span>
                </div>
            </div>
            <div className="mb-3">
                <div className="relative">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        className="w-full h-12 pl-12 bg-input-background rounded-full"
                        autoComplete="off"
                        onChange={handleChange}
                        value={registerData.email}
                    />
                    <span>
                        <MdEmail className="absolute top-2/4 -translate-y-2/4 left-6" />
                    </span>
                </div>
            </div>
            <div className="mb-5">
                <div className="relative">
                    <input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        placeholder="Password"
                        className="w-full h-12 pl-12 bg-input-background rounded-full"
                        autoComplete="off"
                        onChange={handleChange}
                        value={registerData.password}
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
                Sign up
            </button>

            {error && (
                <div className="mt-4 py-2 px-4 text-error bg-error-bg border border-error">
                    {error}
                </div>
            )}
        </form>
    );
};

export default RegisterField;
