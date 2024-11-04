import React, { useState, useContext,useEffect } from "react"; 
import '../Styles/Bookings.css';
import { DateContext } from '../Context/DateContext';

const Bookings = () => {

    const {today, year, month, day, selectedDate, setYear, setMonth, setDay, setSelectedDate, bookingNum, setBookingNum,id, setId} = useContext(DateContext);
    const [ending, setEnding] = useState("th");


    const [title, setTitle] = useState("");
    const [reason, setReason] = useState("");
    const [startTime, setStartTime] = useState("");
    const [endTime, setEndTime] = useState("");
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

        if (startTime === "") {
            setTimeSlotError("Time slot is required");
            isValid = false;
        } 
        
        else {
            setTimeSlotError("");
        }

        if (endTime === "") {
            setTimeSlotError("Time slot is required");
            isValid = false;
        } 
        
        else {
            setTimeSlotError("");
        }



        if(isValid){

            const booking = {
                id,
                title: title,
                reason: reason,
                startTime: startTime,
                endTime: endTime,
                date: `${getMonthName(month)} ${selectedDate}, ${year}`
            };

            
            const ID = id;



            const existingBookings = JSON.parse(localStorage.getItem(`${getMonthName(month)} ${selectedDate}, ${year}`)) || [];


            existingBookings.push(booking);


            localStorage.setItem(`${getMonthName(month)} ${selectedDate}, ${year}`, JSON.stringify(existingBookings));
            localStorage.setItem(`ID`, JSON.stringify(ID));


            setTitle("");
            setReason("");
            setStartTime("");
            setEndTime("");
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

                    <label for="start-time">Start Time:</label>
                    <input type="time" name="start-time" value={startTime} onChange={(e) => setStartTime(e.target.value)}></input>

                    <label for="end-time">End Time:</label>
                    <input type="time" name="end-time" value={endTime} onChange={(e) => setEndTime(e.target.value)}></input>

                    <button onClick={hanndleBook}>Book</button>

                    
                </form>
            </div>
        
        </>
    )
}


export default Bookings;