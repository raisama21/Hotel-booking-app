import { ChangeEvent, FormEvent, useState } from "react"

import { useAuthContext } from "@/hooks/useAuthContext"

export default function AddHotel() {
    const [hotelData, setHotelData] = useState({
        hotelName: "",
        city: "",
        street: "",
        maxCount: "",
        phoneNumber: "",
        rentPerDay: "",
        description: "",
    })

    const [error, setError] = useState<null>(null)

    const { state } = useAuthContext()

    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
        const { name, value } = e.target

        setHotelData((prevData) => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }

    async function handleSubmit(e: FormEvent<HTMLFormElement>) {
        e.preventDefault()

        const response = await fetch("/api/hotel/create-new-hotel", {
            method: "POST",
            headers: {
                "Authorization": `Bearer ${state.user?.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(hotelData)
        })

        const data = await response.json()
        setError(data.error)
    }

    return (
        <section>
            <div className="max-w-3xl">
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="hotelName"
                        placeholder="Hotel Name"
                        onChange={handleChange}
                        value={hotelData.hotelName}
                        className="w-full py-2 px-4 border border-slate-500 rounded-lg"
                        autoComplete="off"
                    />
                    <input
                        type="text"
                        name="city"
                        placeholder="City Name"
                        onChange={handleChange}
                        value={hotelData.city}
                        className="w-full py-2 px-4 border border-slate-500 rounded-lg"
                        autoComplete="off"
                    />
                    <input
                        type="text"
                        name="street"
                        placeholder="Street Name"
                        onChange={handleChange}
                        value={hotelData.street}
                        className="w-full py-2 px-4 border border-slate-500 rounded-lg"
                        autoComplete="off"
                    />
                    <input
                        type="text"
                        name="maxCount"
                        placeholder="max count"
                        onChange={handleChange}
                        value={hotelData.maxCount}
                        className="w-full py-2 px-4 border border-slate-500 rounded-lg"
                        autoComplete="off"
                    />
                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Phone no."
                        onChange={handleChange}
                        value={hotelData.phoneNumber}
                        className="w-full py-2 px-4 border border-slate-500 rounded-lg"
                        autoComplete="off"
                    />
                    <input
                        type="text"
                        name="rentPerDay"
                        placeholder="Rent per day"
                        onChange={handleChange}
                        value={hotelData.rentPerDay}
                        className="w-full py-2 px-4 border border-slate-500 rounded-lg"
                        autoComplete="off"
                    />
                    <textarea
                        name="description"
                        placeholder="Description"
                        onChange={handleChange}
                        value={hotelData.description}
                        className="w-full py-2 px-4 border border-slate-500 rounded-lg"
                        autoComplete="off"
                    >
                    </textarea>

                    <button type="submit" className="w-full h-10 bg-primary-button rounded-lg">Submit</button>
                </form>

                {
                    error && <div className="mt-4 py-2 px-4 text-error bg-error-bg border border-error">{error}</div>
                }
            </div>
        </section>
    )
}
