import { useParams, Link } from "react-router-dom";
import { useContext, useState } from "react";

import Navbar from "../components/Navbar";
import Gallery from "../components/Gallery";
import TicketSection from "../components/TicketSection";

import { getEventById } from "../services/eventService";

import { NotificationContext } from "../context/NotificationContext";
import { FavoriteContext } from "../context/FavoriteContext";

function EventDetails() {
  const { id } = useParams();

  const event = getEventById(id);

  const [reminderAdded, setReminderAdded] =
    useState(false);

  const { addNotification } =
    useContext(NotificationContext);

  const { addFavorite } =
    useContext(FavoriteContext);

  if (!event) {
    return (
      <>
        <Navbar />

        <div className="container">
          <h1>Event Not Found</h1>
        </div>
      </>
    );
  }

  const mapUrl =
    `https://www.google.com/maps/search/${event.venue}`;

  const handleReminder = () => {
    addNotification(
      `🔔 Reminder Added for ${event.title}`
    );

    setReminderAdded(true);
  };

  const handleFavorite = () => {
  console.log("Favorite clicked"); // test

  addFavorite(event);

  alert(
    `❤️ ${event.title} added to Favorites!`
  );
};

  return (
    <>
      <Navbar />

      <div className="container">

        <img
  src={event.image}
  alt={event.title}
  className="artist-image"
/>

        <div className="event-header">
          <h1>{event.title}</h1>

          <p className="event-subtitle">
            🎤 {event.artist} • 📍 {event.city}
          </p>
        </div>

        <div className="event-details">

          <div className="info-card">

            <h2>Event Details</h2>

            <p>
              🎤 <strong>Artist:</strong> {event.artist}
            </p>

            <p>
              📍 <strong>Venue:</strong> {event.venue}
            </p>

            <p>
              🏙 <strong>City:</strong> {event.city}
            </p>

            <p>
              🗣 <strong>Language:</strong> {event.language}
            </p>

            <p>
              📅 <strong>Date:</strong> {event.date}
            </p>

            <p>
              ⭐ <strong>Rating:</strong> {event.rating}
            </p>

            <p>
              🎭 <strong>Category:</strong> {event.category}
            </p>

            <p>
              😊 <strong>Mood:</strong> {event.mood}
            </p>

          </div>

          <div className="ticket-card">

            <h2>Ticket Pricing</h2>

            <TicketSection
              tickets={event.tickets}
            />

          </div>

        </div>

        <div
          style={{
            display: "flex",
            gap: "15px",
            flexWrap: "wrap",
            justifyContent: "center",
            marginTop: "30px"
          }}
        >

          <Link to={`/booking/${event.id}`}>
            <button className="btn">
              🎟 Book Now
            </button>
          </Link>

         <button
  className="btn"
  onClick={handleFavorite}
>
  ❤️ Add to Favorites
</button>

          <button
            className="btn"
            onClick={handleReminder}
          >
            🔔 Remind Me
          </button>

          <a
            href={mapUrl}
            target="_blank"
            rel="noreferrer"
          >
            <button className="btn">
              📍 Navigate
            </button>
          </a>

        </div>

        {reminderAdded && (
          <div
            className="success-card"
            style={{
              marginTop: "20px",
              textAlign: "center"
            }}
          >
            🔔 Reminder Added Successfully
          </div>
        )}

        {event.gallery && (
          <Gallery
            images={event.gallery}
          />
        )}

      </div>
    </>
  );
}

export default EventDetails;