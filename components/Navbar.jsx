import { Link } from "react-router-dom";
import { useContext } from "react";

import { BookingContext } from "../context/BookingContext";
import { AuthContext } from "../context/AuthContext";

function Navbar() {
  const { bookings } =
    useContext(BookingContext);

  const { user, logout } =
    useContext(AuthContext);

  return (
    <nav className="navbar">

      <div className="logo">
        EventSphere 🎵
      </div>

      <div className="nav-links">

        <Link to="/">
          Home
        </Link>

        <Link to="/favorites">
          Favorites
        </Link>

        <Link to="/bookings">
          Bookings ({bookings.length})
        </Link>

        <Link to="/notifications">
          Notifications
        </Link>

        <Link to="/reviews">
          Reviews
        </Link>

        {user && (
          <>
            <span
              style={{
                color: "#cbd5e1",
                fontSize: "14px",
                alignSelf: "center"
              }}
            >
              👤 {user.email}
            </span>

            <button
              className="btn"
              onClick={logout}
              style={{
                marginTop: 0,
                padding: "10px 16px"
              }}
            >
              Logout
            </button>
          </>
        )}

      </div>

    </nav>
  );
}

export default Navbar;