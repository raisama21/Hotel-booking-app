import { useAuthContext } from "@/hooks/useAuthContext";
import KhaltiPaymentGateway from "@/components/khaltiPaymentGateway";

interface BookingDetailsType {
    hotel_id: string | undefined;
    hotelName: string | undefined;
    phoneNumber: number;
    checkInDate: string;
    checkOutDate: string;
    rentPerDay: number;
    totalDays: number;
    totalAmount: number;
}

const BookingDetails = (props: BookingDetailsType) => {
    const { state } = useAuthContext();

    return (
        <div>
            <div className="fixed top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 shadow-lg bg-background rounded-lg">
                <div className="px-6 py-4">
                    <h2 className="text-xl font-semibold">{props.hotelName}</h2>
                    <h2 className="text-xl font-semibold">
                        {state.user?.userName}
                    </h2>
                    <p>Check in date: {props.checkInDate}</p>
                    <p>Check out date: {props.checkOutDate}</p>
                    <p>Rent per day/nigh: {props.rentPerDay}</p>
                    <p>Total days: {props.totalDays}</p>
                    <p>Total amount: {props.totalAmount}</p>
                </div>
                <KhaltiPaymentGateway
                    hotel_id={props.hotel_id}
                    hotelName={props.hotelName}
                    totalDays={props.totalDays}
                    rentPerDay={props.rentPerDay}
                />
            </div>
        </div>
    );
};

export default BookingDetails;
