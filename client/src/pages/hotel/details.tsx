import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"

import { useAuthContext } from "@/hooks/useAuthContext"

import hotel_photo from "@/assets/hotel_photo.avif"

import Bookings from "@/components/bookings"
import BookingDetails from "@/components/bookingDetails"

interface DetailsDataType {
    _id: string;
    user_id: string;
    hotelName: string;
    city: string;
    street: string;
    maxCount: string;
    phoneNumber: string;
    rentPerDay: string;
    description: string;
    currentBookings: [];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

export interface BookingDateType {
    checkInDate: string,
    checkOutDate: string,
}

interface BookingDetailsType {
    hotel_id: string | undefined,
    hotelName: string | undefined,
    checkInDate: string,
    checkOutDate: string,
    rentPerDay: number | undefined,
    totalDays: number,
    totalAmount: number,
}

export default function Details() {
    const { state } = useAuthContext()
    const { hotelId } = useParams()
    const [detailsData, setDetailsData] = useState<DetailsDataType>()

    const [bookingDate, setBookingDate] = useState<BookingDateType>({
        checkInDate: "",
        checkOutDate: "",
    })

    const [showBookingModal, setShowBookingModal] = useState<boolean>(false)

    const diffTime = Math.abs(Date.parse(bookingDate.checkInDate) - Date.parse(bookingDate.checkOutDate));
    const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    const totalAmount = totalDays * Number(detailsData?.rentPerDay)

    const bookingDetails: BookingDetailsType = {
        hotel_id: detailsData?._id,
        hotelName: detailsData?.hotelName,
        checkInDate: bookingDate.checkInDate,
        checkOutDate: bookingDate.checkOutDate,
        rentPerDay: Number(detailsData?.rentPerDay),
        totalDays,
        totalAmount,
    }

    function storeBookingDetailsLocally(): void {

        localStorage.setItem("user_booking_detail", JSON.stringify(bookingDetails))

    }

    async function getDetailsData(): Promise<void> {
        const response = await fetch(`/api/hotel/get-one-hotel/${hotelId}`, {
            headers: {
                "Authorization": `Bearer ${state.user?.token}`
            }
        })

        const data = await response.json()
        setDetailsData(data)
    }

    useEffect(() => {
        getDetailsData()
    }, [])

    return (
        <section>
            <div className="max-w-7xl px-8">
                <div>
                    <div>
                        <img src={hotel_photo} />
                    </div>
                    <div>
                        <h4 className="font-bold text-2xl">{detailsData?.hotelName}</h4>
                        <p>{detailsData?.city}</p>
                        <p>{detailsData?.street}</p>
                        <p>(NPR) {detailsData?.rentPerDay}</p>
                        <p className="font-normal">{detailsData?.description}</p>
                    </div>
                </div>

                <Bookings
                    bookingDate={bookingDate}
                    setBookingDate={setBookingDate}
                    storeBookingDetailsLocally={storeBookingDetailsLocally}
                    setShowBookingModal={setShowBookingModal}
                />

                {showBookingModal &&
                    <BookingDetails
                        hotel_id={hotelId}
                        hotelName={detailsData?.hotelName}
                        phoneNumber={Number(detailsData?.phoneNumber)}
                        checkInDate={bookingDate.checkInDate}
                        checkOutDate={bookingDate.checkOutDate}
                        rentPerDay={Number(detailsData?.rentPerDay)}
                        totalDays={totalDays}
                        totalAmount={totalAmount}
                    />
                }
            </div>
        </section>
    )
}
