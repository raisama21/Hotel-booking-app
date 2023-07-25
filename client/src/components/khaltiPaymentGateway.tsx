import { FormEvent } from "react";
import { v4 as uuidv4 } from "uuid"
import { useParams } from "react-router-dom"

import { useAuthContext } from "@/hooks/useAuthContext"

interface KhaltiPaymentGatewayType {
    hotel_id: string | undefined;
    hotelName: string | undefined;
    totalDays: number;
    rentPerDay: number | undefined;
}

const KhaltiPaymentGateway = (props: KhaltiPaymentGatewayType) => {
    const { hotelId } = useParams()
    const { state } = useAuthContext()
    const RETURN_URL = `http://localhost:5173/hotel/book-a-room/details/${hotelId}/payment`

    const payload = {
        return_url: RETURN_URL,
        website_url: `http://localhost:5173/hotel/book-a-room/details`,
        amount: 1300,
        purchase_order_id: uuidv4(),
        purchase_order_name: props.hotelName,
        customer_info: {
            name: state.user?.userName,
            email: state.user?.email,
        },
        amount_breakdown: [
            {
                label: "Mark Price",
                amount: 1000,
            },
            {
                label: "VAT",
                amount: 300,
            },
        ],
        product_details: [
            {
                identity: props.hotel_id,
                name: props.hotelName,
                total_price: 1300,
                quantity: props.totalDays,
                unit_price: 1300,
            },
        ],
    };

    async function handlePayment(e: FormEvent<HTMLFormElement>): Promise<void> {
        e.preventDefault()

        const response = await fetch("/api/epayment/khalti-epayment", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${state.user?.token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        })

        const data = await response.json()

        if (data?.payment_url) {
            window.location.href = data?.payment_url;
        }
    }

    return (
        <form onSubmit={handlePayment}>
            <button className="w-full h-10 bg-khalti-button text-white font-semibold">Pay with khalti</button>
        </form>
    )
}

export default KhaltiPaymentGateway;



/* Test Credentials for sandbox environment

    Test Khalti ID for 9800000000 9800000001 9800000002 9800000003 9800000004 9800000005

    Test MPIN 1111

    Test OTP 987654

    // merchant test account
    https://test-admin.khalti.com 
*/

