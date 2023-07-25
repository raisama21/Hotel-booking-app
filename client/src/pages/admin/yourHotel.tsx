import { useEffect, useState } from "react"

import { useAuthContext } from "@/hooks/useAuthContext"

export default function YourHotel() {
    const { state } = useAuthContext()
    const [yourHotel, setYourHotel] = useState({})

    async function getYourHotel(): Promise<void> {
        const response = await fetch("/api/hotel/get-user-hotel", {
            headers: {
                "Authorization": `Bearer ${state.user?.token}`
            }
        })

        const data = await response.json()
        setYourHotel(data)
    }

    useEffect(() => {
        getYourHotel()
    }, [])

    return (
        <section>
            <div className="max-w-3xl font-normal text-xl">
                <div className="font-bold mb-4">Hotel Info</div>
                <h2 className="font-semibold text-2xl">Hotel name: {yourHotel?.hotelName}</h2>
                <p>City: {yourHotel?.city}</p>
                <p>Street: {yourHotel?.street}</p>
                <p>Phone no.: {yourHotel?.phoneNumber}</p>
                <p>Max count: {yourHotel?.maxCount}</p>
                <p>Rent Day/night (NPR): {yourHotel?.rentPerDay}</p>
            </div>
        </section>
    )
}
