import { useState, useContext } from "react";
import {
  useParams,
  useNavigate
} from "react-router-dom";

import Navbar from "../components/Navbar";

import { getEventById } from "../services/eventService";

import { BookingContext } from "../context/BookingContext";
import { NotificationContext } from "../context/NotificationContext";

function BookingForm() {
  const { id } = useParams();

  const navigate = useNavigate();

  const event = getEventById(id);

  const { bookEvent } =
    useContext(BookingContext);

  const { addNotification } =
    useContext(NotificationContext);

  const [ticketType, setTicketType] =
    useState("Gold");

  const [quantity, setQuantity] =
    useState(1);

  const [name, setName] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [errors, setErrors] =
    useState({});

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

  const totalAmount =
    event.tickets[
      ticketType.toLowerCase()
    ] * quantity;

  const handleSubmit = (e) => {
  e.preventDefault();

  const newErrors = {};

  if (!name.trim()) {
    newErrors.name = "Name is required";
  }

  if (!email.includes("@")) {
    newErrors.email = "Enter a valid email";
  }

  if (!/^\d{10}$/.test(phone)) {
    newErrors.phone =
      "Enter a valid 10-digit phone number";
  }

  if (Object.keys(newErrors).length) {
    setErrors(newErrors);
    return;
  }

  const booking = {
    ...event,
    bookingId: `BOOK-${Date.now()}`,
    customerName: name,
    customerEmail: email,
    customerPhone: phone,
    quantity,
    ticketType,
    totalAmount
  };

  navigate("/payment", {
    state: { booking }
  });
};   
  return (
    <>
      <Navbar />

      <div className="container">
         <div className="booking-wrapper">
        <h1 className="section-title" >
         Book Your Tickets
        </h1>

        <form
          className="booking-form"
          onSubmit={handleSubmit}
        >

          <input
            type="text"
            placeholder="Full Name"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          {errors.name && (
            <p className="error">
              {errors.name}
            </p>
          )}

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          {errors.email && (
            <p className="error">
              {errors.email}
            </p>
          )}

          <input
            type="tel"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
          />

          {errors.phone && (
            <p className="error">
              {errors.phone}
            </p>
          )}

          <select
            value={ticketType}
            onChange={(e) =>
              setTicketType(e.target.value)
            }
          >
            <option value="Silver">
              Silver - ₹{event.tickets.silver}
            </option>

            <option value="Gold">
              Gold - ₹{event.tickets.gold}
            </option>

            <option value="Platinum">
              Platinum - ₹{event.tickets.platinum}
            </option>

            <option value="VIP">
              VIP - ₹{event.tickets.vip}
            </option>
          </select>

          <input
            type="number"
            min="1"
            max="10"
            value={quantity}
            onChange={(e) =>
              setQuantity(Number(e.target.value))
            }
          />

          <div className="booking-summary">
            <h3>
              Total: ₹{totalAmount}
            </h3>
          </div>

          <button
            className="btn"
            type="submit"
          >
            Confirm Booking
          </button>

        </form>
</div>
      </div>
    </>
  );
}

export default BookingForm;