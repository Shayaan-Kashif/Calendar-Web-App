import React, { useState, useContext, useEffect } from "react"; 
import "../Styles/LoadBookings.css";
import { DateContext } from '../Context/DateContext';

const LoadBookings = () => {

    const {today, year, month, day, selectedDate, setYear, setMonth, setDay, setSelectedDate } = useContext(DateContext);
    const [ending, setEnding] = useState("th");

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


    return(
        <>
            <div className="LoadBookings">
                <h3>Bookings for {getMonthName(month)} {selectedDate}{ending}, {year}</h3>

            </div>
        </>
    )
}


export default LoadBookings;