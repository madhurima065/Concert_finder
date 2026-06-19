import { Routes, Route } from "react-router-dom";

import Home from "../pages/Home";
import Favorites from "../pages/Favorites";
import Notifications from "../pages/Notifications";
import EventDetails from "../pages/EventDetails";
import Bookings from "../pages/Bookings";
import BookingForm from "../pages/BookingForm";
import Reviews from "../pages/Reviews";
import Payment from "../pages/Payment";
import Login from "../pages/Login";

import ProtectedRoute from "../components/ProtectedRoute";

function AppRoutes() {
  return (
    <Routes>

      {/* Public Route */}

      <Route
        path="/login"
        element={<Login />}
      />

      {/* Protected Routes */}

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
      />

      <Route
        path="/favorites"
        element={
          <ProtectedRoute>
            <Favorites />
          </ProtectedRoute>
        }
      />

      <Route
        path="/notifications"
        element={
          <ProtectedRoute>
            <Notifications />
          </ProtectedRoute>
        }
      />

      <Route
        path="/bookings"
        element={
          <ProtectedRoute>
            <Bookings />
          </ProtectedRoute>
        }
      />

      <Route
        path="/event/:id"
        element={
          <ProtectedRoute>
            <EventDetails />
          </ProtectedRoute>
        }
      />

      <Route
        path="/booking/:id"
        element={
          <ProtectedRoute>
            <BookingForm />
          </ProtectedRoute>
        }
      />

      <Route
        path="/payment"
        element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        }
      />

      <Route
        path="/reviews"
        element={
          <ProtectedRoute>
            <Reviews />
          </ProtectedRoute>
        }
      />

    </Routes>
  );
}

export default AppRoutes;