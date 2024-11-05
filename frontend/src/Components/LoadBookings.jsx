import React, { useState, useContext, useEffect } from "react"; 
import "../Styles/LoadBookings.css";
import { DateContext } from '../Context/DateContext';
import BookingDisplayCard from "./BookingDisplayCard";

const LoadBookings = () => {

    const {today, year, month, day, selectedDate, setYear, setMonth, setDay, setSelectedDate, bookingNum, setBookingNum,selectedMonth,selectedYear,setSelectedMonth,setSelectedYear } = useContext(DateContext);
    const [ending, setEnding] = useState("th");
    const [bookings, setBookings] = useState([]);

   useEffect(()=>{

    if(selectedDate === 1 ||selectedDate === 21||selectedDate === 31){
        setEnding("st");
    }

    else if(selectedDate === 2 ||selectedDate === 22){
        setEnding("nd");
    }

    else if(selectedDate === 3 ||selectedDate === 23){
        setEnding("rd");
    }

    else{
        setEnding("th");
    }

   },[selectedDate]);


    const getMonthName = (month) => {
        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        return monthNames[month - 1];
      };


      useEffect(() => {

        const Key = `${getMonthName(selectedMonth)} ${selectedDate}, ${selectedYear}`;
        const storedBookings = JSON.parse(localStorage.getItem(Key)) || [];


        setBookings(storedBookings);
    }, [selectedDate, selectedMonth, selectedYear, bookingNum]);


    return(
        <>
            <h1>View Bookings</h1>
            <div className="LoadBookings">
                <h3>Bookings for {getMonthName(selectedMonth)} {selectedDate}{ending}, {selectedYear}</h3 >
                {bookings.length > 0 ? (
                        bookings.map((booking, index) => (
                            <BookingDisplayCard 
                            key ={index} 
                            id= {booking.id}
                            title = {booking.title} 
                            reason={booking.reason} 
                            startTime={booking.startTime}
                            endTime={booking.endTime}
                            date={`${getMonthName(month)} ${selectedDate}, ${year}`}
                            />  
                        ))
                    
                ) : (
                    <p>No bookings for this date.</p>
                )}
            </div>
        </>
    )
}


export default LoadBookings;



