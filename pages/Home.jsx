import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import SearchFilters from "../components/SearchFilters";
import EventCard from "../components/EventCard";
import { getEvents } from "../services/eventService";

function Home() {
  const [events, setEvents] = useState([]);

  const [search, setSearch] = useState("");
  const [city, setCity] = useState("");
  const [language, setLanguage] = useState("");
  const [category, setCategory] = useState("");
  const [mood, setMood] = useState("");
  const [budget, setBudget] = useState("");

  useEffect(() => {
    getEvents().then((data) => {
      setEvents(data);
    });
  }, []);

  useEffect(() => {
  const hasActiveFilter =
    city ||
    language ||
    category ||
    mood ||
    budget;

  if (hasActiveFilter) {
    const allEvents =
      document.getElementById(
        "all-events"
      );

    if (allEvents) {
      allEvents.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });
    }
  }
}, [
  city,
  language,
  category,
  mood,
  budget
]);

  const filteredEvents = events.filter(
    (event) => {
      const searchMatch =
        event.artist
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        event.title
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        event.city
          .toLowerCase()
          .includes(
            search.toLowerCase()
          ) ||
        event.language
          .toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const cityMatch =
        city === "" ||
        event.city === city;

      const languageMatch =
        language === "" ||
        event.language === language;

      const categoryMatch =
        category === "" ||
        event.category === category;

      const moodMatch =
        mood === "" ||
        event.mood === mood;

      const budgetMatch =
        budget === "" ||
        event.price <= Number(budget);

      return (
        searchMatch &&
        cityMatch &&
        languageMatch &&
        categoryMatch &&
        moodMatch &&
        budgetMatch
      );
    }
  );

  const trendingEvents = [...events]
    .sort(
      (a, b) =>
        b.popularity - a.popularity
    )
    .slice(0, 3);

  return (
    <>
      <Navbar />

      <div className="container">

        <div className="hero">
          <h1>
            🎵 EventSphere
          </h1>

          <p>
            Concerts • Comedy • Small Bands
          </p>
        </div>

        <SearchFilters
          events={events}
          search={search}
          setSearch={setSearch}
          city={city}
          setCity={setCity}
          language={language}
          setLanguage={setLanguage}
          category={category}
          setCategory={setCategory}
          mood={mood}
          setMood={setMood}
          budget={budget}
          setBudget={setBudget}
        />

        <h2 className="section-title">
          🔥 Trending Events
        </h2>

        <div className="event-grid">
          {trendingEvents.map(
            (event) => (
              <EventCard
                key={event.id}
                event={event}
              />
            )
          )}
        </div>

        <h2
          id="all-events"
          className="section-title"
        >
          🎟 All Events
        </h2>

        <div className="event-grid">
          {filteredEvents.length ===
          0 ? (
            <h3>
              No events found
            </h3>
          ) : (
            filteredEvents.map(
              (event) => (
                <EventCard
                  key={event.id}
                  event={event}
                />
              )
            )
          )}
        </div>

      </div>
    </>
  );
}

export default Home;