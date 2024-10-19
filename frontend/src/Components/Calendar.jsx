import React, { useState } from "react";
import '../Styles/Calendar.css';

const Calendar = () => {

    const today = new Date();
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState((today.getMonth())+1); //) based so add 1 to get the actual month from 1-12
    const [day, setDay] = useState(today.getDate());
    const [selectedDate, setSelectedDate] = useState(day);



    const getMonthName = (month) => {
        const monthNames = [
          "January", "February", "March", "April", "May", "June",
          "July", "August", "September", "October", "November", "December"
        ];
        return monthNames[month - 1];
      };


    const getDaysInMonth = (month, year)=>{
        return(new Date(year, month,0).getDate());
    }

    const getStartDayOfMonth = (month, year) => {
        return(new Date(year,month-1,1).getDay());

    }

    const handleToday = () =>{
        setYear(today.getFullYear());
        setMonth((today.getMonth())+1);
        setDay(today.getDate());
    }


    const handleNextMonth = () =>{
        if(month === 12){
            setMonth(1);
            setYear(year+1);
        }

        else{
        setMonth(month + 1); 
        }

    }

    const handlePreviousMonth = () =>{
        if(month === 1){
            setMonth(12);
            setYear(year-1);
        }

        else{
        setMonth(month - 1); 
        }
    }

    const daysInMonth = getDaysInMonth(month, year);
    const startDay = getStartDayOfMonth(month, year);
    
    /*
    0 is sunday
    1 is monday
    2 is tuesday
    3 is wednesday
    4 is thursday
    5 is friday
    6 is saturday
    
    */

    const daysArray = [];
    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push(i);
    }

    const calendarDays = [];
    for (let i = 0; i < startDay; i++) {
        calendarDays.push(null); // Add empty cells before the first day
    }

    calendarDays.push(...daysArray); // Add the days of the month in the calendar days array
  
    const weeks = [];
    while (calendarDays.length) {
        weeks.push(calendarDays.splice(0, 7)); // Split into chunks of 7 (for each week)
      }

    // Function to handle clicking on a date
    const handleDateClick = (day) => {
        setSelectedDate(day);
    };


    return(
        <>
            <h1>Calendar</h1>
            
            <div className="Cal-table">
                <table>                
                    <thead>
                        <tr className="button-header">
                            <td colSpan='2'><button className= "Cal-button" onClick={handlePreviousMonth}>Previous</button></td>
                            <td colSpan='2'> <button className= "Cal-button" onClick={handleToday}>Today</button></td>
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

                    {weeks.map((week, weekIndex) => (
                    <tr key={weekIndex}>
                    {week.map((day, dayIndex) => (
                        <td
                        key={dayIndex}
                        onClick={() => handleDateClick(day)} // Add onClick event
                        className={`calendar-cell ${
                            day === selectedDate ? "selected-date" : ""
                        }`}
                        >
                        {day || ""} {/* Render day or empty cell */}
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