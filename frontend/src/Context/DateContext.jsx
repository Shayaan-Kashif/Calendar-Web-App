import React, { createContext, useState, useContext } from 'react';

// Creating the context
export const DateContext = createContext();

// Creating the provider component
export const DateProvider = ({ children }) => {

  const today = new Date();// date object

  //Below are the varibles which states will be shared between the components 
  const [year, setYear] = useState(today.getFullYear());
  const [selectedYear, setSelectedYear] = useState(year);
  const [month, setMonth] = useState(today.getMonth() + 1); 
  const [day, setDay] = useState(today.getDate());
  const [selectedMonth,setSelectedMonth] = useState(month);
  const [selectedDate, setSelectedDate] = useState(day);
  const [bookingNum, setBookingNum] = useState(0);//This variable will be used to track when the book or delete button is pressed becuase the loadbookings needs to be reloaded to reflect the change
  const [id, setId] = useState(()=>{
    if(localStorage.getItem("ID")){//checking if there is a id stored in the localstorage or not
      return (JSON.parse(localStorage.getItem("ID"))+1);//setting it as the intial value of Id and adding 1 since the Id from the localstoeage has already been used 
    }
    else{
      return 0;//If no match then start at 0
    }
  });


  return (
    <DateContext.Provider value={{today, year, setYear, month, setMonth, day, setDay, selectedDate, setSelectedDate, bookingNum, setBookingNum,id, setId,selectedMonth,setSelectedMonth,selectedYear,setSelectedYear }}>
      {children}
    </DateContext.Provider>
  );
};

