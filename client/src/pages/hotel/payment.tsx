import { useAuthContext } from "@/hooks/useAuthContext"
import { FormEvent, useState } from "react";
import { Navigate, useSearchParams } from "react-router-dom"

interface UserBookingType {
    hotel_id: string;
    hotelName: string;
    checkInDate: string;
    checkOutDate: string;
    rentPerDay: number;
    totalAmount: number;
    totalDays: number;
    transaction_id: string | null;
}

export default function Payment() {
    const { state } = useAuthContext()
    const [searchParams] = useSearchParams()
    const [response, setResponse] = useState<boolean>(false)

    async function handleBookingSubmit(e: FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault()

        const getBookingDetails = localStorage.getItem("user_booking_detail") as string
        let detail: UserBookingType = JSON.parse(getBookingDetails)
        detail.transaction_id = searchParams.get("transaction_id");

        const response = await fetch("/api/booking/create-hotel-booking", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${state.user?.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(detail)
        })

        setResponse(response.ok)

        return response.json()
    }

    if (response) {
        return <Navigate to="/setting/your-bookings" />
    }


    return (
        <section>
            <div className="max-w-xxl mx-auto">
                <form onSubmit={handleBookingSubmit}>
                    <button className="h-10 px-4 bg-primary-button text-semibold rounded-lg">confirm booking</button>
                </form>
            </div>
        </section>
    )
}
