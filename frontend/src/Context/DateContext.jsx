import React, { createContext, useState, useContext } from 'react';

// Creating the context
export const DateContext = createContext();

// Creating the provider component
export const DateProvider = ({ children }) => {

  const today = new Date();
  const [year, setYear] = useState(today.getFullYear());
  const [month, setMonth] = useState(today.getMonth() + 1); 
  const [day, setDay] = useState(today.getDate());
  const [selectedDate, setSelectedDate] = useState(day);


  return (
    <DateContext.Provider value={{today, year, setYear, month, setMonth, day, setDay, selectedDate, setSelectedDate }}>
      {children}
    </DateContext.Provider>
  );
};

