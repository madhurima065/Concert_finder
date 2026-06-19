import { createContext, useState } from "react";

export const BookingContext =
  createContext();

export const BookingProvider = ({
  children
}) => {
  const [bookings, setBookings] =
    useState([]);

  const bookEvent = (
    event,
    ticketType
  ) => {
    setBookings((prev) => [
      ...prev,
      {
        ...event,
        ticketType,
        bookingDate:
          new Date().toLocaleDateString()
      }
    ]);
  };

  return (
    <BookingContext.Provider
      value={{
        bookings,
        bookEvent
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};