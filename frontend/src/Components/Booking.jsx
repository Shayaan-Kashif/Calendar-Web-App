import React from "react";
import '../Styles/Bookings.css';

const Bookings = () => {



    return(
        <>
            <div className="Booking">
                <h3>What would you like to book?</h3>
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