import React from "react";
import '../Styles/BookingDisplayCard.css';

const BookingDisplayCard = ({title,reason,time})=>{


    return(
        <>
        <div class="card">
            <p><strong>Time: </strong>{time} <strong>Title: </strong>{title} <strong>Reason: </strong>{reason} </p>
           
            
        </div>
        </>
    );
}

export default BookingDisplayCard;


/*<p><strong>Time: </strong>{time} <strong>Title: </strong>{title} <strong>Reason: </strong>{reason} </p>*/