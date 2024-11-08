import React, { useState, useContext, useEffect } from "react"; 
import "../Styles/LoadBookings.css";
import { DateContext } from '../Context/DateContext';
import BookingDisplayCard from "./BookingDisplayCard";

const LoadBookings = () => {

    const {today, year, month, day, selectedDate, setYear, setMonth, setDay, setSelectedDate, bookingNum, setBookingNum,selectedMonth,selectedYear,setSelectedMonth,setSelectedYear } = useContext(DateContext);
    const [ending, setEnding] = useState("th");
    const [bookings, setBookings] = useState([]);

    //This useEffect hook will run everytime the selected Date changes
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

      //When the user selects a date this useEffect hook will trigger and get the bookings from the localstorage based on the date 
      useEffect(() => {

        const Key = `${getMonthName(selectedMonth)} ${selectedDate}, ${selectedYear}`;
        const storedBookings = JSON.parse(localStorage.getItem(Key)) || []; //Getting it from localsroage


        setBookings(storedBookings);//setting the result from localstorage to this variable
    }, [selectedDate, selectedMonth, selectedYear, bookingNum]);


    return(
        <>
            <h1>View Bookings</h1>
            <div className="LoadBookings">
                <h3>Bookings for {getMonthName(selectedMonth)} {selectedDate}{ending}, {selectedYear}</h3 >

                {/*If the legnth of the booking list is greater than 0 the following will happen otherwise a no booking message will appear.*/}
                {bookings.length > 0 ? (
                        bookings.map((booking, index) => (
                            <BookingDisplayCard 
                            key ={index} 
                            //the stuff below is passing values of each booking into the booking displaycard component to render the card
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



