import React, { useState, useContext,useEffect } from "react"; // Add useContext to your import
import '../Styles/Bookings.css';
import { DateContext } from '../Context/DateContext';

const Bookings = () => {

    const {today, year, month, day, selectedDate, setYear, setMonth, setDay, setSelectedDate } = useContext(DateContext);
    const [ending, setEnding] = useState("th");

    const getMonthName = (month) => {
        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        return monthNames[month - 1];
      };


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


    return(
        <>
            <div className="Booking">
                <h3>What would you like to book for {getMonthName(month)} {selectedDate}{ending}, {year}?</h3>
                <form>
                    <label for="title">Title:</label>
                    <input type="text" name="title" className="booking-text" value=" Enter Title Here..."></input>

                    <label for="reason">Reason:</label>
                    <input type="text" name="reason" className="booking-text" value="Enter Reason Here..."></input>

                    <label for="time-slot">Time Solt:</label>
                    <input type="time" name="time-slot"></input>

                    <button>Book</button>
                </form>
            </div>
        
        </>
    )
}


export default Bookings;