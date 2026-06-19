import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";

import EventCard from "../components/EventCard";
import { FavoriteProvider } from "../context/FavoriteContext";

const mockEvent = {
  id: 1,
  title: "Arijit Singh Live",
  artist: "Arijit Singh",
  city: "Hyderabad",
  language: "Hindi",
  category: "Concert",
  mood: "Romantic",
  rating: 4.8,
  popularity: 95,
  price: 1500,
  image: "test.jpg"
};

describe("EventCard Component", () => {

  const renderEventCard = () => {
    render(
      <FavoriteProvider>
        <BrowserRouter>
          <EventCard event={mockEvent} />
        </BrowserRouter>
      </FavoriteProvider>
    );
  };

  test("shows event title", () => {

    renderEventCard();

    expect(
      screen.getByText("Arijit Singh Live")
    ).toBeInTheDocument();

  });

  test("shows city", () => {

    renderEventCard();

    expect(
      screen.getByText(/Hyderabad/)
    ).toBeInTheDocument();

  });

  test("shows artist name", () => {

    renderEventCard();

    expect(
      screen.getByText(/Arijit Singh/)
    ).toBeInTheDocument();

  });

  test("shows price", () => {

    renderEventCard();

    expect(
      screen.getByText(/1500/)
    ).toBeInTheDocument();

  });

});