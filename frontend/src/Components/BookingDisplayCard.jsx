import React, { useContext, useState, useEffect } from "react"; 
import { DateContext } from '../Context/DateContext';
import '../Styles/BookingDisplayCard.css';

const BookingDisplayCard = ({id,title,reason,startTime,endTime,date})=>{

    const {bookingNum, setBookingNum} = useContext(DateContext);
    const [durationHour, setDurationHour] = useState(0);
    const [durationMinutes, setDurationMinutes] = useState(0);


    useEffect(() => {

        const start = String(startTime);
        const end = String(endTime);
    

        let [startHour, startMinutes] = start.split(":");
        let [endHour, endMinutes] = end.split(":");
    

        startHour = parseInt(startHour, 10);
        startMinutes = parseInt(startMinutes, 10);
        endHour = parseInt(endHour, 10);
        endMinutes = parseInt(endMinutes, 10);
    

        let hourDifference = endHour - startHour;
        let minuteDifference = endMinutes - startMinutes;
    

        if (minuteDifference < 0) {
          minuteDifference += 60;
          hourDifference -= 1;
        }
    

        setDurationHour(hourDifference);
        setDurationMinutes(minuteDifference);
      }, [startTime, endTime]);
    
     

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


