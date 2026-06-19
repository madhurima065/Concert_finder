import { render, screen } from "@testing-library/react";
import { MemoryRouter, Routes, Route } from "react-router-dom";

import Payment from "../pages/Payment";

import { BookingProvider } from "../context/BookingContext";
import { NotificationProvider } from "../context/NotificationContext";

const mockBooking = {
  bookingId: "BOOK-123",
  title: "Arijit Singh Live",
  ticketType: "Gold",
  quantity: 2,
  totalAmount: 3000
};

describe("Payment Component", () => {

  test("shows payment heading and amount", () => {

    render(
      <NotificationProvider>
        <BookingProvider>
          <MemoryRouter
            initialEntries={[
              {
                pathname: "/payment",
                state: {
                  booking: mockBooking
                }
              }
            ]}
          >
            <Routes>
              <Route
                path="/payment"
                element={<Payment />}
              />
            </Routes>
          </MemoryRouter>
        </BookingProvider>
      </NotificationProvider>
    );

    expect(
      screen.getByText(/Payment/i)
    ).toBeInTheDocument();

    expect(
      screen.getByText(/₹3000/)
    ).toBeInTheDocument();

  });

});