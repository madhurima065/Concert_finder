import { useContext } from "react";

import Navbar from "../components/Navbar";
import EventCard from "../components/EventCard";

import {
  FavoriteContext
} from "../context/FavoriteContext";

function Favorites() {

  const { favorites } =
    useContext(FavoriteContext);

  return (
    <>
      <Navbar />

      <div className="container">

        <h1 className="section-title">
          ❤️ My Favorites
        </h1>

        {favorites.length === 0 ? (

          <div className="empty-state">
            <h2>
              No Favorites Yet
            </h2>

            <p>
              Add your favorite
              concerts and events.
            </p>
          </div>

        ) : (

          <div className="event-grid">

            {favorites.map(
              (event) => (
                <EventCard
                  key={event.id}
                  event={event}
                />
              )
            )}

          </div>

        )}

      </div>
    </>
  );
}

export default Favorites;