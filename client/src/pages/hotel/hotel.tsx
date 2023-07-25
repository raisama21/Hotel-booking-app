import { ChangeEvent, useEffect, useState } from "react"

import { useAuthContext } from "@/hooks/useAuthContext"

import hotel_photo from "@/assets/hotel_photo.avif"
import { Link } from "react-router-dom";

interface CurrentBookingsType {
    booking_id: string;
    checkInDate: string;
    checkOutDate: string;
    status: string;
    user_id: string;
}

interface HotelDataType {
    _id: string;
    user_id: string;
    hotelName: string;
    city: string;
    street: string;
    maxCount: string;
    phoneNumber: string;
    rentPerDay: string;
    description: string;
    currentBookings: CurrentBookingsType[];
    createdAt: string;
    updatedAt: string;
    __v: number;
}

interface DateValue {
    checkInDate: string;
    checkOutDate: string,
}

export default function Hotel() {
    const { state } = useAuthContext()
    const [hotelData, setHotelData] = useState<HotelDataType[]>([])

    const [dateValue, setDateValue] = useState<DateValue>({
        checkInDate: "",
        checkOutDate: "",
    });


    function handleDateChange(e: ChangeEvent<HTMLInputElement>) {
        const { value, name } = e.target;

        setDateValue((oldDate) => {
            return {
                ...oldDate,
                [name]: value,
            };
        });
    }

    function getBookedRoomsId(hotelData: HotelDataType[], dateValue: DateValue): string[] {
        let idArray = [];

        for (let i = 0; i < hotelData.length; i++) {
            const hotel = hotelData[i];

            if (hotel.currentBookings.length > 0) {
                for (let j = 0; j < hotel.currentBookings.length; j++) {
                    const currentBookings = hotel.currentBookings[j];

                    if (
                        (currentBookings.checkInDate >= dateValue.checkInDate &&
                            currentBookings.checkOutDate <= dateValue.checkOutDate) ||
                        (currentBookings.checkOutDate >= dateValue.checkInDate &&
                            currentBookings.checkOutDate <= dateValue.checkOutDate) ||
                        (currentBookings.checkInDate >= dateValue.checkInDate &&
                            currentBookings.checkInDate <= dateValue.checkOutDate)
                    ) {
                        idArray.push(hotel._id);
                    }
                }
            }
        }

        return idArray;
    }

    const newBookedHotelId = getBookedRoomsId(hotelData, dateValue);

    const hotelsData = hotelData.filter(
        (hotel) => !newBookedHotelId.includes(hotel._id)
    );

    async function getHotelData() {

        const response = await fetch("/api/hotel/get-all-hotel", {
            headers: {
                "Authorization": `Bearer ${state.user?.token}`
            }
        })

        const data = await response.json()
        setHotelData(data)
    }

    useEffect(() => {
        getHotelData()
    }, [])

    return (
        <section>
            <div className="max-w-xxl mx-auto mt-8 flex gap-4 justify-center">
                <input
                    type="date"
                    name="checkInDate"
                    onChange={handleDateChange}
                    value={dateValue.checkInDate}
                    className="border border-black/60 rounded-lg py-1 px-2"
                />

                <input
                    type="date"
                    name="checkOutDate"
                    value={dateValue.checkOutDate}
                    onChange={handleDateChange}
                    className="border border-black/60 rounded-lg py-1 px-2"
                />
            </div>

            <div className="max-w-[1764px] mx-auto px-4 mt-8 grid grid-cols-[repeat(auto-fit,_minmax(18.375rem,_1fr))] gap-x-1">
                {hotelsData.map((item) => {
                    return (
                        <article
                            key={item._id}
                            className="aspect-square xs:aspect-[1.15/1] sm:aspect-square"
                        >
                            <div className="mb-2">
                                <Link to={`details/${item._id}`}>
                                    <img src={hotel_photo} className="rounded-lg" />
                                </Link>
                            </div>

                            <div>
                                <Link to={`details/${item._id}`}>
                                    <h4 className="font-semibold mb-2">{item.hotelName}</h4>
                                    <p>Available</p>
                                    <p>(NPR) {item.rentPerDay} night</p>
                                </Link>
                            </div>
                        </article>
                    );
                })}
            </div>
        </section>)
}

