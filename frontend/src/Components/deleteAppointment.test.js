import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import BookingDisplayCard from './BookingDisplayCard';
import { DateContext } from '../Context/DateContext';

beforeAll(() => {
  window.confirm = jest.fn();
});

afterEach(() => {
  localStorage.clear();
  jest.clearAllMocks();
});

test('deletes booking from localStorage when confirmed', () => {
  const testDate = 'November 4, 2024';
  const testId = 1;
  const mockSetBookingNum = jest.fn();

  // Mock context
  const mockContext = {
    bookingNum: 5,
    setBookingNum: mockSetBookingNum,
  };

  // Insert a full booking object into localStorage
  const booking = {
    id: testId,
    title: 'Math Class',
    reason: 'Weekly lesson',
    startTime: '10:00',
    endTime: '11:30',
    date: testDate,
  };

  localStorage.setItem(testDate, JSON.stringify([booking]));

  // Make sure confirm returns true
  window.confirm.mockReturnValue(true);

  // Render the component
  render(
    <DateContext.Provider value={mockContext}>
      <BookingDisplayCard
        id={testId}
        title={booking.title}
        reason={booking.reason}
        startTime={booking.startTime}
        endTime={booking.endTime}
        date={testDate}
      />
    </DateContext.Provider>
  );

  // Click the delete button
  const deleteButton = screen.getByText(/delete/i);
  fireEvent.click(deleteButton);

  // Assert booking was removed
  const updatedBookings = JSON.parse(localStorage.getItem(testDate));
  expect(updatedBookings).toHaveLength(0);
  expect(mockSetBookingNum).toHaveBeenCalledWith(6); // bookingNum + 1
});
