import { useContext } from "react";
import { Link } from "react-router-dom";

import Navbar from "../components/Navbar";
import { BookingContext } from "../context/BookingContext";

function Bookings() {
  const { bookings } = useContext(BookingContext);

  return (
    <>
      <Navbar />

      <div className="container">
        <h1 className="section-title">
          🎟 My Bookings
        </h1>

        {bookings.length === 0 ? (
          <h3>No Bookings Yet</h3>
        ) : (
          <div className="booking-grid">
            {bookings.map((booking) => (
              <div
                key={booking.bookingId}
                className="booking-card"
              >
                <h3>{booking.title}</h3>

                <p className="booking-info">
                  🎤 {booking.artist}
                </p>

                <p className="booking-info">
                  📅 {booking.date}
                </p>

                <p className="booking-info">
                  🎟 {booking.ticketType}
                </p>

                <p className="booking-info">
                  🎫 Qty: {booking.quantity}
                </p>

                <p className="booking-price">
                  ₹{booking.totalAmount}
                </p>

                <Link
                  to={`/event/${booking.id}`}
                  className="booking-btn"
                >
                  View Event
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Bookings;