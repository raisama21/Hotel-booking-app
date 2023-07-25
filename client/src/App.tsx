import {
    createBrowserRouter, createRoutesFromElements, Route, RouterProvider,
} from "react-router-dom";

import RootLayout from "./layouts/rootLayout"
import HotelLayout from "./layouts/hotelLayout"
import SettingLayout from "./layouts/settingLayout"
import AdminLayout from "./layouts/adminLayout"

import Home from "./pages/home"
import Register from "./pages/register";
import Login from "./pages/login";

/* Hotel room */
import Hotel from "./pages/hotel/hotel"
import Details from "./pages/hotel/details"
import Payment from "./pages/hotel/payment";

/* Setting */
import LoginAndSecurity from "./pages/setting/loginAndSecurity"
import YourBookings from "./pages/setting/yourBookings"

/* admin */
import AddHotel from "./pages/admin/addHotel"
import YourHotel from "./pages/admin/yourHotel";
import UserBookings from "./pages/admin/userBookings";
import Dashboard from "./layouts/dashboard";

import { AuthContextProvider } from "./context/authContext";

const router = createBrowserRouter(

    createRoutesFromElements(
        <>
            <Route path="/" element={<RootLayout />}>
                <Route index element={<Home />} />

                <Route path="hotel" element={<HotelLayout />}>
                    <Route path="book-a-room" element={<Hotel />} />
                    <Route path="book-a-room/details/:hotelId" element={<Details />} />
                    <Route path="book-a-room/details/:hotelId/payment" element={<Payment />} />
                </Route>

                <Route path="setting" element={<SettingLayout />}>
                    <Route path="login-and-security" element={<LoginAndSecurity />} />
                    <Route path="your-bookings" element={<YourBookings />} />
                </Route>

                <Route path="admin" element={<AdminLayout />}>
                    <Route path="dashboard" element={<Dashboard />} />
                    <Route path="add-hotel" element={<AddHotel />} />
                    <Route path="your-hotel" element={<YourHotel />} />
                    <Route path="user-bookings" element={<UserBookings />} />
                </Route>
            </Route>

            <Route path="/signup" element={<Register />} />
            <Route path="/login" element={<Login />} />
        </>
    )

);

export default function App() {

    return (
        <AuthContextProvider>
            < RouterProvider router={router} />
        </AuthContextProvider>
    )

}

