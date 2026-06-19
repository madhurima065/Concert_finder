import { useContext, useState } from "react";

import Navbar from "../components/Navbar";

import { ReviewContext } from "../context/ReviewContext";
import { getEventById } from "../services/eventService";

function Reviews() {
  const { reviews, addReview } =
    useContext(ReviewContext);

  const [selectedEvent, setSelectedEvent] =
    useState("");

  const [name, setName] =
    useState("");

  const [rating, setRating] =
    useState(5);

  const [comment, setComment] =
    useState("");

  const completedEvents = [
    getEventById(1),
    getEventById(2),
    getEventById(3)
  ].filter(Boolean);

  const handleSubmit = () => {
    if (
      !selectedEvent ||
      !name ||
      !comment
    ) {
      return;
    }

    addReview({
      eventId: Number(selectedEvent),
      name,
      rating,
      comment,
      date: new Date().toLocaleDateString()
    });

    setSelectedEvent("");
    setName("");
    setRating(5);
    setComment("");
  };

  return (
    <>
      <Navbar />

      <div className="container">

        <h1 className="section-title">
          ⭐ Community Reviews
        </h1>

        <div className="event-grid">
          {reviews.map(
            (review, index) => (
              <div
                key={index}
                className="success-card"
              >
                <h3>
                  {review.name}
                </h3>

                <p>
                  {"⭐".repeat(
                    review.rating
                  )}
                </p>

                <p>
                  {review.comment}
                </p>

                <small>
                  {review.date}
                </small>
              </div>
            )
          )}
        </div>

        <h2 className="section-title">
          ✍ Share Your Experience
        </h2>

        <div className="booking-form">

          <select
            value={selectedEvent}
            onChange={(e) =>
              setSelectedEvent(
                e.target.value
              )
            }
          >
            <option value="">
              Select Completed Event
            </option>

            {completedEvents.map(
              (event) => (
                <option
                  key={event.id}
                  value={event.id}
                >
                  {event.title}
                </option>
              )
            )}
          </select>

          <input
            type="text"
            placeholder="Your Name"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
          />

          <div className="star-rating">
            {[1, 2, 3, 4, 5].map(
              (star) => (
                <span
                  key={star}
                  onClick={() =>
                    setRating(star)
                  }
                >
                  {star <= rating
                    ? "⭐"
                    : "☆"}
                </span>
              )
            )}
          </div>

          <textarea
            rows="5"
            placeholder="Share your experience..."
            value={comment}
            onChange={(e) =>
              setComment(
                e.target.value
              )
            }
          />

          <button
            className="btn"
            onClick={handleSubmit}
          >
            Submit Review
          </button>

        </div>

      </div>
    </>
  );
}

export default Reviews;