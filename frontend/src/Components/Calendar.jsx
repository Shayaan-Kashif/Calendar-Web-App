import React, { useState, useContext,useEffect } from "react"; 
import '../Styles/Calendar.css';
import { DateContext } from '../Context/DateContext';

const Calendar = () => {

    const {today, year, month, day, selectedDate, setYear, setMonth, setDay, setSelectedDate, bookingNum, setBookingNum,selectedMonth,selectedYear,setSelectedMonth,setSelectedYear } = useContext(DateContext);
    const [bookings, setBookings] = useState([]);
    const [bookedDays, setBookedDays] = useState([]);


    useEffect(() => {
        const daysWithBookings = [];
    
        for (let day = 1; day <= daysInMonth; day++) {
            if (checkForBookedDays(day)) {
                daysWithBookings.push(day);
            }
        }
    
        setBookedDays(daysWithBookings);
    }, [month, year, bookingNum]);
    

    //Function to get the month name based on the month 0-11 entered 
    const getMonthName = (month) => {
        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        return monthNames[month - 1];
      };

    //Returns the number of days in the month
    const getDaysInMonth = (month, year)=>{
        return(new Date(year, month,0).getDate());
    }

    //Returns the starting day of the month 0-6
    const getStartDayOfMonth = (month, year) => {
        return(new Date(year,month-1,1).getDay());

    }

    //Sets the the day to the current day
    const handleToday = () =>{
        setYear(today.getFullYear());
        setMonth((today.getMonth())+1);
        setDay(today.getDate());
        setSelectedDate(day);
    }

    //Function when the user clicks the next button to find the next month
    const handleNextMonth = () =>{
        if(month === 12){//If the month is december 
            setMonth(1);// set the month to January
            setYear(year+1);//go up a year
        }

        else{
        setMonth(month + 1); //Otherwise we dont need to chnage the year
        }

    }

    //Function when the user clicks the previous button to get the prior month
    const handlePreviousMonth = () =>{
        if(month === 1){//If the month is January
            setMonth(12);//set the month to december 
            setYear(year-1);// go back a year 
        }

        else{
        setMonth(month - 1); //Otherwise we dont need to change the year
        }
    }

    const daysInMonth = getDaysInMonth(month, year);//retund the number of days in the month
    const startDay = getStartDayOfMonth(month, year); // returns the start day of the month from 0-6
    
    /*
    0 is sunday
    1 is monday
    2 is tuesday
    3 is wednesday
    4 is thursday
    5 is friday
    6 is saturday
    
    */

    //Adding the number of days into a empty array
    const daysArray = [];
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }


    const calendarDays = [];
    for (let i = 0; i < startDay; i++) {
        calendarDays.push(null); // Adding the number of empty days before the start of teh month
    }

    calendarDays.push(...daysArray); // Adding the number of days to the calendarDays array after the empty days --> [null,null,1,2,3,4...etc]
  
    const weeks = [];
    while (calendarDays.length) {
        weeks.push(calendarDays.splice(0, 7)); // Split into chunks of 7 (for each week)
      }

      const checkForBookedDays = (day) => {
        const Key = `${getMonthName(month)} ${day}, ${year}`;;
        const storedBookings = JSON.parse(localStorage.getItem(Key)) || [];
        return storedBookings.length > 0;
    };
    



    // Function to handle clicking on a date
    const handleDateClick = (day) => {
        if(day != null){
            setSelectedDate(day);
            setSelectedMonth(month);
            setSelectedYear(year);
        }
        
    };


    return(
        <>
            <h1>Calendar</h1>
            
            <div className="Cal-table">
                <table>                
                    <thead>
                        {/*Buttons to navigate the months and the current day*/}
                        <tr className="button-header">
                            <td colSpan='2'><button className= "Cal-button" onClick={handlePreviousMonth}>Previous</button></td>
                            <td colSpan='3'> <button className= "Cal-button" onClick={handleToday}>Today</button></td>
                            <td colSpan='2'> <button className= "Cal-button" onClick={handleNextMonth}>Next</button></td>
                        </tr>
                        <tr className="Cal-header">
                            <td colSpan='3'>{getMonthName(month)}</td>
                            <td colSpan='4'>{year}</td>
                        </tr>
                        <tr>
                            <th>Sun</th>
                            <th>Mon</th>
                            <th>Tue</th>
                            <th>Wed</th>
                            <th>Thu</th>
                            <th>Fri</th>
                            <th>Sat</th>
                        </tr> 
                    </thead>
                    <tbody>

                    {/*Looping over the weeks*/}
                    {weeks.map((week, weekIndex) => (
                    <tr key={weekIndex}>

                    {/*Looping over the days in a particular week*/}
                    {week.map((day, dayIndex) => (
                        <td
                        key={dayIndex}
                        onClick={() => handleDateClick(day)} // Added onClick event to change the selected date

                        //The className will always have the calender-cell but if the conditons below are true then it can change accrodingly 
                        className={`calendar-cell ${day === selectedDate && month === selectedMonth && year=== selectedYear? "selected-date" : ""} 
                        ${bookedDays.includes(day) ? "booked-day" : ""} ${day === null ? "empty-cell" : ""}`}>
                        {day || ""}
                    </td>
                ))}
                </tr>
            ))}
                    </tbody>
                </table>
            </div>

       
        
       
       

        </>
    )
}


export default Calendar;