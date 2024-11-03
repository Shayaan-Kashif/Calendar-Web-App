import React, { useContext } from "react"; 
import { DateContext } from '../Context/DateContext';
import '../Styles/BookingDisplayCard.css';

const BookingDisplayCard = ({id,title,reason,time,date})=>{

    const {bookingNum, setBookingNum} = useContext(DateContext);

    const handleDelete = () =>{
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



    return(
        <>
        <div class="card">
            <p><strong>Time: </strong>{time} <strong>Title: </strong>{title} <strong>Reason: </strong>{reason} </p>
            <button onClick={handleDelete}>Delete</button>
           
            
        </div>
        </>
    );
}

export default BookingDisplayCard;


/*<p><strong>Time: </strong>{time} <strong>Title: </strong>{title} <strong>Reason: </strong>{reason} </p>*/