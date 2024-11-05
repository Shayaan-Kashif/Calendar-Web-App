import React, { createContext, useState, useContext } from 'react';

// Creating the context
export const DateContext = createContext();

// Creating the provider component
export const DateProvider = ({ children }) => {

  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [selectedYear, setSelectedYear] = useState(year);
  const [month, setMonth] = useState(today.getMonth() + 1); 
  const [day, setDay] = useState(today.getDate());
  const [selectedMonth,setSelectedMonth] = useState(month);
  const [selectedDate, setSelectedDate] = useState(day);
  const [bookingNum, setBookingNum] = useState(0);
  const [id, setId] = useState(()=>{
    if(localStorage.getItem("ID")){
      return JSON.parse(localStorage.getItem("ID"));
    }
    else{
      return 0;
    }
  });


  return (
    <DateContext.Provider value={{today, year, setYear, month, setMonth, day, setDay, selectedDate, setSelectedDate, bookingNum, setBookingNum,id, setId,selectedMonth,setSelectedMonth,selectedYear,setSelectedYear }}>
      {children}
    </DateContext.Provider>
  );
};

