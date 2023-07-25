import { useEffect, useState } from "react"

import { useAuthContext } from "@/hooks/useAuthContext"

export default function UserBookings() {
    const { state } = useAuthContext()
    const [userBookings, setUserBookings] = useState<any[]>([])

    async function getYourHotel(): Promise<void> {
        const response = await fetch(`/api/booking/get-owner-booking/${state.user?.hotel_id}`, {
            headers: {
                "Authorization": `Bearer ${state.user?.token}`
            }
        })

        const data = await response.json()
        setUserBookings(data)
    }

    useEffect(() => {
        getYourHotel()
    }, [])

    return (
        <section>
            <div className="max-w-3xl">
                <h2 className="font-bold text-xl">
                    user bookings
                </h2>

                {userBookings.map((userBooking) => {
                    return (
                        <div key={userBooking._id} className="mb-4 text-xl font-normal">
                            <p className="font-semibold">Hotel name: {userBooking.hotelName}</p>
                            <p>User name: {userBooking.userName}</p>
                            <p>Email: {userBooking.email}</p>
                            <p>Check in date: {userBooking.checkInDate}</p>
                            <p>Check out date: {userBooking.checkOutDate}</p>
                            <p>Rent per day(NPR): {userBooking.rentPerDay}</p>
                            <p>Total days: {userBooking.totalDays}</p>
                            <p>Total amount: {userBooking.totalAmount}</p>
                            <p>Status: {userBooking.status}</p>
                        </div>
                    )
                })
                }
            </div>
        </section>
    )
}
