import { useContext } from "react";
import { Link } from "react-router-dom";
import { FavoriteContext } from "../context/FavoriteContext";

function EventCard({ event }) {
  const { addFavorite } =
    useContext(FavoriteContext);

  return (
    <div className="event-card">

      <img
        src={event.image}
        alt={event.title}
      />

      <div className="card-content">

        {event.offer && (
          <div
            style={{
              background: "#dc2626",
              color: "white",
              padding: "6px 10px",
              borderRadius: "8px",
              marginBottom: "10px",
              fontSize: "14px",
              fontWeight: "bold"
            }}
          >
            🔥 {event.discount}% OFF
          </div>
        )}

        <span className="tag">
          {event.category}
        </span>

        <h3
          style={{
            marginTop: "10px"
          }}
        >
          {event.title}
        </h3>

       <div className="event-details">

  <div className="detail-item">
    <span>📍 City</span>
    <strong>{event.city}</strong>
  </div>

  <div className="detail-item">
    <span>🎤 Artist</span>
    <strong>{event.artist}</strong>
  </div>

  <div className="detail-item">
    <span>🗣 Language</span>
    <strong>{event.language}</strong>
  </div>

  <div className="detail-item">
    <span>😊 Mood</span>
    <strong>{event.mood}</strong>
  </div>

  <div className="detail-item">
    <span>⭐ Rating</span>
    <strong>{event.rating}/5</strong>
  </div>

</div>

        <div
          style={{
            marginTop: "8px",
            color: "#22c55e",
            fontWeight: "600"
          }}
        >
          Popularity:
          {" "}
          {event.popularity}%
        </div>

        <div className="price">
          Starting ₹{event.price}
        </div>

        <div
          style={{
            display: "flex",
            gap: "10px",
            marginTop: "15px",
            flexWrap: "wrap"
          }}
        >

          <button
            className="btn"
            onClick={() =>
              addFavorite(event)
            }
          >
            ❤️ Favorite
          </button>

          <Link
            to={`/event/${event.id}`}
          >
            <button
              className="btn"
            >
              🎟 View Details
            </button>
          </Link>

        </div>

      </div>
    </div>
  );
}

export default EventCard;