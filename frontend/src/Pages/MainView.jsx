import React from "react";
import Calendar from "../Components/Calendar";
import LoadBookings from "../Components/LoadBookings";
import Bookings from "../Components/Booking";
import '../Styles/MainView.css'; 

const MainView = () => {
  return (
    <div className="main-view-container">

      <div className="calendar-section">
        <Calendar />
      </div>

      <div className="load-booking-section">
        <LoadBookings />
      </div>

      <div className="booking-section">
        <Bookings />
      </div>
    </div>
  );
};

export default MainView;
