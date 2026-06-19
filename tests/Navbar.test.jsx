import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import Navbar from "../components/Navbar";
import { BookingProvider } from "../context/BookingContext";

describe("Navbar Component", () => {

  const renderNavbar = () => {
    render(
      <BookingProvider>
        <BrowserRouter>
          <Navbar />
        </BrowserRouter>
      </BookingProvider>
    );
  };

  test("renders Home link", () => {

    renderNavbar();

    expect(
      screen.getByText("Home")
    ).toBeInTheDocument();

  });

  test("renders Favorites link", () => {

    renderNavbar();

    expect(
      screen.getByText("Favorites")
    ).toBeInTheDocument();

  });

  test("renders Notifications link", () => {

    renderNavbar();

    expect(
      screen.getByText("Notifications")
    ).toBeInTheDocument();

  });

  test("renders Bookings link", () => {

    renderNavbar();

    expect(
      screen.getByText(/Bookings/i)
    ).toBeInTheDocument();

  });

});