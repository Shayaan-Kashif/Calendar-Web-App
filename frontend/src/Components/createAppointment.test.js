import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import Booking from './Booking';
import { DateContext } from '../Context/DateContext';

afterEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

test('creates a booking and saves it to localStorage', () => {
  const testDate = 4;
  const testMonth = 11; // November
  const testYear = 2024;
  const testId = 1;

  const mockContext = {
    today: new Date(),
    year: testYear,
    month: testMonth,
    day: testDate,
    selectedDate: testDate,
    selectedMonth: testMonth,
    selectedYear: testYear,
    setYear: jest.fn(),
    setMonth: jest.fn(),
    setDay: jest.fn(),
    setSelectedDate: jest.fn(),
    setSelectedMonth: jest.fn(),
    setSelectedYear: jest.fn(),
    bookingNum: 1,
    setBookingNum: jest.fn(),
    id: testId,
    setId: jest.fn()
  };

  render(
    <DateContext.Provider value={mockContext}>
      <Booking />
    </DateContext.Provider>
  );

  // Use placeholders or roles instead of labels
  fireEvent.change(screen.getByPlaceholderText(/Enter Your Title Here/i), {
    target: { value: 'Dentist Appointment' },
  });

  fireEvent.change(screen.getByPlaceholderText(/Enter Reason Here/i), {
    target: { value: 'Routine checkup' },
  });

  const timeInputs = screen.getAllByRole('textbox', { hidden: true });

  // Or use querySelector fallback if role lookup doesn't work
  fireEvent.change(document.querySelector('input[name="start-time"]'), {
    target: { value: '09:00' },
  });

  fireEvent.change(document.querySelector('input[name="end-time"]'), {
    target: { value: '10:00' },
  });

  // Click the button
  fireEvent.click(screen.getByRole('button', { name: /book/i }));

  const expectedKey = `November ${testDate}, ${testYear}`;
  const storedBookings = JSON.parse(localStorage.getItem(expectedKey));

  expect(storedBookings).toHaveLength(1);
  expect(storedBookings[0]).toMatchObject({
    id: testId,
    title: 'Dentist Appointment',
    reason: 'Routine checkup',
    startTime: '09:00',
    endTime: '10:00',
    date: expectedKey,
  });

  expect(localStorage.getItem('ID')).toBe(JSON.stringify(testId));
});
