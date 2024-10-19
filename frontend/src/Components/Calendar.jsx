import React, { useState } from "react";

const Calendar = () => {

    const today = new Date();
    const [year, setYear] = useState(today.getFullYear());
    const [month, setMonth] = useState((today.getMonth())+1); //) based so add 1 to get the actual month from 1-12
    const [day, setDay] = useState(today.getDate());




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

    return(
        <>
            <h1>Calendar Component</h1>
            <p>The day is {day} the month is {month} the year is {year}</p>
            <p>There are {daysInMonth} in the month {month} in the year {year}</p>
            <p>The start day for the {month} in {year} year is {startDay}</p>
            <table>
                <thead>
                    <th>Sun</th>
                    <th>Mon</th>
                    <th>Tue</th>
                    <th>Wed</th>
                    <th>Thu</th>
                    <th>Fri</th>
                    <th>Sat</th> 
                </thead>
                <tbody>
                {weeks.map((week, weekIndex) => (
                    <tr key={weekIndex}>
                {week.map((day, dayIndex) => (
                        <td key={dayIndex}>{day || ''}</td> // Render day or empty cell
              ))}
                    </tr>
          ))}

                </tbody>
            </table>

        <button onClick={handleNextMonth}>Next Month</button>
        <button onClick={handlePreviousMonth}>Previous Month</button>
        <button onClick={handleToday}>Today</button>

        </>
    )
}


export default Calendar;