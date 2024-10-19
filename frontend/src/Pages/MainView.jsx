import React from "react";
import Calendar from "../Components/Calendar";
import LoadBookings from "../Components/LoadBookings";
import Bookings from "../Components/Booking";

const MainView = () => {



    return(
        <>
            <Calendar />
            <Bookings />
            <LoadBookings />
        </>
    )
}


export default MainView;