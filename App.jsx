import { BrowserRouter } from "react-router-dom";

import AppRoutes from "./routes/AppRoutes";

import { AuthProvider } from "./context/AuthContext";
import { FavoriteProvider } from "./context/FavoriteContext";
import { NotificationProvider } from "./context/NotificationContext";
import { BookingProvider } from "./context/BookingContext";
import { ReviewProvider } from "./context/ReviewContext";

function App() {
  return (
    <AuthProvider>
      <FavoriteProvider>
        <NotificationProvider>
          <BookingProvider>
            <ReviewProvider>
              <AppRoutes />
            </ReviewProvider>
          </BookingProvider>
        </NotificationProvider>
      </FavoriteProvider>
    </AuthProvider>
  );
}

export default App;