import React, { useState, useContext,useEffect } from "react"; 
import '../Styles/Bookings.css';
import { DateContext } from '../Context/DateContext';

const Bookings = () => {

    //Context variables
    const {today, year, month, day, selectedDate, setYear, setMonth, setDay, setSelectedDate, bookingNum, setBookingNum,id, setId,selectedMonth,selectedYear,setSelectedMonth,setSelectedYear} = useContext(DateContext);
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



      //Function to handle bookings (when the book button is clicked)
      const hanndleBook = (e)=>{
        e.preventDefault();//Prevents the website from automatically submitting 


        //Below is the code to compute the duration of the booking which will later be used in order to determine if its valid or not
        const start = String(startTime);
        const end = String(endTime);
    
        let [startHour, startMinutes] = start.split(":");
        let [endHour, endMinutes] = end.split(":");

        startHour = parseInt(startHour, 10);
        endHour = parseInt(endHour, 10);


        let hourDifference = endHour - startHour;


        let isValid = true;//variable to check if the form is valid. if its not then it will be false 

        //checking if the title is entered
        if (title.trim() === "") {
            setTitleError("Title is required");
            alert("Title is required");
            isValid = false;
        } 
        
        else {
            setTitleError("");
        }

        //checking if the reason is entered
        if (reason.trim() === "") {
            setReasonError("Reason is required");
            alert("Reason is required");
            isValid = false;
        } 
        
        else {
            setReasonError("");
        }

        //checking if the start time is entered
        if (startTime === "") {
            setTimeSlotError("Start time is required");
            alert("Start time is required");
            isValid = false;
        } 
        
        else {
            setTimeSlotError("");
        }

        //checking if the end time is entered
        if (endTime === "") {
            setTimeSlotError("End time is required");
            alert("End time is required");
            isValid = false;
        } 
        
        else {
            setTimeSlotError("");
        }

        //checking if the time slot isnt negative (if it is negative that means the user wnats the booking to end before the start time i.r start is 1:30pm and wants the end time to be 1:00pm)
        if(hourDifference <0){
            setTimeSlotError("Not a valid time slot");
            alert("Not a valid time slot");
            isValid = false;
        }

        else {
            setTimeSlotError("");
        }



        //if everything was good then the varibale remains true meaning its valid
        if(isValid){

            //Object to store the booking data
            const booking = {
                id,
                title: title,
                reason: reason,
                startTime: startTime,
                endTime: endTime,
                date: `${getMonthName(selectedMonth)} ${selectedDate}, ${selectedYear}`
            };

            //storing the id data
            const ID = id;


            //getting all the previous bookings for a key (Dates will be keys in the localstorage)
            const existingBookings = JSON.parse(localStorage.getItem(`${getMonthName(selectedMonth)} ${selectedDate}, ${selectedYear}`)) || [];

            //Adding the new booking for that key into the list
            existingBookings.push(booking);

            //storing them back into the local storage 
            localStorage.setItem(`${getMonthName(selectedMonth)} ${selectedDate}, ${selectedYear}`, JSON.stringify(existingBookings));
            localStorage.setItem(`ID`, JSON.stringify(ID));

            //In the localStorage a date key will look like: November 4th 2024


            //setting all the variables relating to the booking back to thier original empty state
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
                <h3>What would you like to book for {getMonthName(selectedMonth)} {selectedDate}{ending}, {selectedYear}?</h3>
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