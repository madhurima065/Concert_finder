import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Reviews from "../pages/Reviews";

import { BookingProvider } from "../context/BookingContext";
import { NotificationProvider } from "../context/NotificationContext";

describe("Reviews Component", () => {

  test("review textbox exists", () => {

    render(
      <NotificationProvider>
        <BookingProvider>
          <BrowserRouter>
            <Reviews />
          </BrowserRouter>
        </BookingProvider>
      </NotificationProvider>
    );

    expect(
      screen.getByPlaceholderText(
        /Share your experience/i
      )
    ).toBeInTheDocument();

  });

});