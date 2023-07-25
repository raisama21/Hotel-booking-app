import { ChangeEvent, Dispatch, SetStateAction } from "react"
import { BookingDateType } from "@/pages/hotel/details"

interface BookingType {
    bookingDate: BookingDateType;
    setBookingDate: Dispatch<SetStateAction<BookingDateType>>;
    storeBookingDetailsLocally: () => void;
    setShowBookingModal: Dispatch<SetStateAction<boolean>>;
}

const Bookings = (props: BookingType) => {
    function handleChange(e: ChangeEvent<HTMLInputElement>): void {
        const { name, value } = e.target

        props.setBookingDate((prevData) => {
            return {
                ...prevData,
                [name]: value
            }
        })
    }

    function handleClick(): void {
        props.storeBookingDetailsLocally()

        props.setShowBookingModal((prevData) => !prevData)
    }

    return (
        <>
            <div className="max-w-[370px] p-6 shadow-lg rounded-lg border border-black/20">
                <h2 className="text-medium">
                    <span className="text-xl">
                        &#x20B9;
                        1500
                    </span>
                    night
                </h2>

                <div>
                    <div className="border border-black/60 rounded-xl mt-2 mb-6">
                        <div className="flex items-center justify-between p-4">
                            <div>
                                <label htmlFor="checkInDate" className="text-xs font-medium">
                                    check-in
                                </label>
                                <input
                                    id="checkInDate"
                                    type="date"
                                    name="checkInDate"
                                    onChange={handleChange}
                                    value={props.bookingDate.checkInDate}
                                    className="block w-full text-xs"
                                />
                            </div>

                            <div>
                                <label htmlFor="checkOutDate" className="text-xs font-medium">
                                    check-out
                                </label>
                                <input
                                    id="checkOutDate"
                                    type="date"
                                    name="checkOutDate"
                                    onChange={handleChange}
                                    value={props.bookingDate.checkOutDate}
                                    className="block w-full text-xs"
                                />
                            </div>
                        </div>

                        <div className="text-sm font-medium border-t border-black/60 text-center py-4">
                            guest: max 2
                        </div>
                    </div>

                    <button
                        onClick={handleClick}
                        className="w-full py-3 text-sm font-medium bg-primary-button text-white rounded-lg"
                    >
                        Reserve
                    </button>
                </div>

                <div className="flex mt-6 pt-4 justify-between border-t border-black/60">
                    <span>Total amount</span>
                    <span>&#x20b9; 1500</span>
                </div>
            </div>
        </>
    )
}

export default Bookings
