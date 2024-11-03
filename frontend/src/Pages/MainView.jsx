import React, { useState, useContext } from "react"; 
import Calendar from "../Components/Calendar";
import LoadBookings from "../Components/LoadBookings";
import Bookings from "../Components/Booking";
import { DateProvider } from '../Context/DateContext'; 
import '../Styles/MainView.css'; 

const MainView = () => {
  return (
    <DateProvider> 
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
    </DateProvider>
  );
};

export default MainView;
