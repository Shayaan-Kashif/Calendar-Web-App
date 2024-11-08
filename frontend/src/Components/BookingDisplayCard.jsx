import React, { useContext, useState, useEffect } from "react"; 
import { DateContext } from '../Context/DateContext';
import '../Styles/BookingDisplayCard.css';

//Some varibles have been passed into this compnent which are the ones below
const BookingDisplayCard = ({id,title,reason,startTime,endTime,date})=>{

    const {bookingNum, setBookingNum} = useContext(DateContext);
    const [durationHour, setDurationHour] = useState(0);
    const [durationMinutes, setDurationMinutes] = useState(0);


    useEffect(() => {

        //below is the code for computing the duration

        //getting the start and end time and casting to string 
        const start = String(startTime);
        const end = String(endTime);
    
        //splittting the time by ":" i.e 2:30 --> 2 would be stored in the startHour and 30 would be stored in the startMinutes
        let [startHour, startMinutes] = start.split(":");
        let [endHour, endMinutes] = end.split(":");
    

        //Casting to int 
        startHour = parseInt(startHour, 10);
        startMinutes = parseInt(startMinutes, 10);
        endHour = parseInt(endHour, 10);
        endMinutes = parseInt(endMinutes, 10);
    

        //Computing the differnce
        let hourDifference = endHour - startHour;
        let minuteDifference = endMinutes - startMinutes;
    
        //If the minute does go below 0 (i.e 2:03pm -1:50pm 3-50 = -47)
        if (minuteDifference < 0) {
          minuteDifference += 60;
          hourDifference -= 1;
        }
    
        //Setting the variables to the answers
        setDurationHour(hourDifference);
        setDurationMinutes(minuteDifference);
      }, [startTime, endTime]);
    
     
    //Function to handle a delete
    const handleDelete = () =>{

        if(window.confirm("Are you sure you want to delete this booking?")){

            //Getting the bookings for the date (note dates value is the key which is stored in localstorage)
            const storedBookings = JSON.parse(localStorage.getItem(date)) || [];

            //Finding the index to remove based off the ID
            const indexToRemove = storedBookings.findIndex((booking) => {
                const firstValue = Object.values(booking)[0];
                return firstValue === id;
              });
            
              //Removing the booking at the index
              if (indexToRemove !== -1) {
                storedBookings.splice(indexToRemove, 1); 
              }
            
              //saving the list back into localstorage 
              localStorage.setItem(date, JSON.stringify(storedBookings));
    
              //Bookingnum is responsible for the useEffect hook in the loadbookings component and if booknum chnages it rerenders thus immediatly showing the removal of the booking
              setBookingNum(bookingNum+1);

        }

    }

 


    return(
        <>
        <div class="card">
            <div className="booking-header">
                <p><strong>Start Time: </strong>{startTime}</p>
                <p><strong>Duration: </strong>{durationHour} Hrs {durationMinutes} Mins</p>
                <p><strong>End Time: </strong>{endTime}</p>

            </div>

            <div className="booking-content">
                <p className="booking-content"><strong>Title: </strong>{title}</p>
                <p className="booking-content"><strong>Reason: </strong>{reason} </p>
            </div>
           
            <button onClick={handleDelete}>Delete</button>
           
            
        </div>
        </>
    );
}

export default BookingDisplayCard;


