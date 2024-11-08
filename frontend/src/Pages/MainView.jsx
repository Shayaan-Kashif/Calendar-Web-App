import React, { useState, useContext } from "react"; 
import Calendar from "../Components/Calendar";
import LoadBookings from "../Components/LoadBookings";
import Bookings from "../Components/Booking";
import { DateProvider } from '../Context/DateContext'; 
import '../Styles/MainView.css'; 

//The date provider allows the childern (in this case the 3 components below) to consume the context

const MainView = () => {
  return (
    <DateProvider> 
      <div className="main-view-container">
        <div className="calendar-section">
          <Calendar />{/*Calender component */}
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
