import { useEffect, useState } from "react"

import { useAuthContext } from "@/hooks/useAuthContext"

export default function YourBookings() {
    const { state } = useAuthContext()
    const [userBooking, setUserBooking] = useState<any[]>([])
    const [message, setMessage] = useState<string | undefined>(undefined)

    async function getUserBooking(): Promise<void> {
        const response = await fetch("/api/booking/get-user-booking", {
            headers: {
                Authorization: `Bearer ${state.user?.token}`
            }
        })

        const data = await response.json()
        setUserBooking(data)
    }

    useEffect(() => {
        getUserBooking()
    }, [message])

    async function cancelBooking(booking_id: string, hotel_id: string): Promise<void> {

        const response = await fetch(`/api/booking/cancel-booking/${booking_id}/${hotel_id}`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${state.user?.token}`
            }
        })

        const data = await response.json()
        setMessage(data.message)
    }

    return (
        <div className="max-w-3xl">
            <div className="mt-4">
                <h2 className="mb-6 text-xl font-semibold">Your bookings</h2>
                {userBooking.map((booking) => {
                    return (
                        <div key={booking?._id} className="max-w-xs mb-8">
                            <h3 className="font-semibold text-center text-xl">{booking.hotelName}</h3>
                            <p>User Name: {booking.userName}</p>
                            <p>Email: {booking.email}</p>
                            <p>Check in date: {booking.checkInDate}</p>
                            <p>Check out date: {booking.checkOutDate}</p>
                            <p>Rent per day: {booking.rentPerDay}</p>
                            <p>Total days (NPR): {booking.totalDays}</p>
                            <p>Total amount (NPR): {booking.totalAmount}</p>
                            <p>Status: {booking.status}</p>

                            <button
                                onClick={() => cancelBooking(booking._id, booking.hotel_id)}
                                className="w-full py-2 bg-primary-button rounded-full"
                            >
                                cancel booking
                            </button>
                        </div>
                    )
                })
                }
            </div>
        </div>
    )
}
