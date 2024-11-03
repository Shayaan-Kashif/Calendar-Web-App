import React, { useState, useContext,useEffect } from "react"; 
import '../Styles/Bookings.css';
import { DateContext } from '../Context/DateContext';

const Bookings = () => {

    const {today, year, month, day, selectedDate, setYear, setMonth, setDay, setSelectedDate, bookingNum, setBookingNum,id, setId} = useContext(DateContext);
    const [ending, setEnding] = useState("th");


    const [title, setTitle] = useState("");
    const [reason, setReason] = useState("");
    const [timeSlot, setTimeSlot] = useState("");
    const [BookingStatus,SetBookingStatus] = useState("");
   

    const [titleError, setTitleError] = useState("");
    const [reasonError, setReasonError] = useState("");
    const [timeSlotError, setTimeSlotError] = useState("");

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




      const hanndleBook = (e)=>{
        e.preventDefault();


        let isValid = true;

        if (title.trim() === "") {
            setTitleError("Title is required");
            isValid = false;
        } 
        
        else {
            setTitleError("");
        }

        if (reason.trim() === "") {
            setReasonError("Reason is required");
            isValid = false;
        } 
        
        else {
            setReasonError("");
        }

        if (timeSlot === "") {
            setTimeSlotError("Time slot is required");
            isValid = false;
        } 
        
        else {
            setTimeSlotError("");
        }



        if(isValid){

            const booking = {
                id: id,
                title: title,
                reason: reason,
                timeSlot: timeSlot,
                date: `${getMonthName(month)} ${selectedDate}, ${year}`
            };

            
            const ID = {
                id: id,  
            };



            const existingBookings = JSON.parse(localStorage.getItem(`${getMonthName(month)} ${selectedDate}, ${year}`)) || [];


            existingBookings.push(booking);


            localStorage.setItem(`${getMonthName(month)} ${selectedDate}, ${year}`, JSON.stringify(existingBookings));
            localStorage.setItem(`ID`, JSON.stringify(ID));


            setTitle("");
            setReason("");
            setTimeSlot("");
            SetBookingStatus("Booking Saved!");
            setBookingNum(bookingNum+1);
            setId(id+1);
        }

      }


    return(
        <>
            <h1>Create Bookings</h1>
            <div className="Booking">
                <h3>What would you like to book for {getMonthName(month)} {selectedDate}{ending}, {year}?</h3>
                <form>
                    <label for="title">Title:</label>
                    <input type="text" name="title" className="booking-text" value={title} placeholder="Enter Your Title Here..." onChange={(e) => setTitle(e.target.value)}></input>

                    <label for="reason">Reason:</label>
                    <input type="text" name="reason" className="booking-text" value={reason} placeholder="Enter Reason Here..." onChange={(e) => setReason(e.target.value)}></input>

                    <label for="time-slot">Time Solt:</label>
                    <input type="time" name="time-slot" value={timeSlot} onChange={(e) => setTimeSlot(e.target.value)}></input>

                    <button onClick={hanndleBook}>Book</button>

                    <p>{BookingStatus}</p>
                </form>
            </div>
        
        </>
    )
}


export default Bookings;