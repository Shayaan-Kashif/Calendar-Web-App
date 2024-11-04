import React, { useContext, useState, useEffect } from "react"; 
import { DateContext } from '../Context/DateContext';
import '../Styles/BookingDisplayCard.css';

const BookingDisplayCard = ({id,title,reason,startTime,endTime,date})=>{

    const {bookingNum, setBookingNum} = useContext(DateContext);
    const [duration, setDuration] = useState(null);


    
    
     

    const handleDelete = () =>{

        if(window.confirm("Are you sure you want to delete this booking?")){

            const storedBookings = JSON.parse(localStorage.getItem(date)) || [];

            const indexToRemove = storedBookings.findIndex((booking) => {
                const firstValue = Object.values(booking)[0];
                return firstValue === id;
              });
            
              if (indexToRemove !== -1) {
                storedBookings.splice(indexToRemove, 1); 
              }
            
              localStorage.setItem(date, JSON.stringify(storedBookings));
    
              setBookingNum(bookingNum+1);

        }

    }


    return(
        <>
        <div class="card">
            <div className="booking-header">
                <p><strong>Start Time: </strong>{startTime}</p>
                <p><strong>Duration: </strong>Calulating...</p>
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


