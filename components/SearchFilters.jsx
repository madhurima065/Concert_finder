import { useMemo, useState } from "react";

function SearchFilters({
  events = [],
  search,
  setSearch,
  city,
  setCity,
  language,
  setLanguage,
  category,
  setCategory,
  mood,
  setMood,
  budget,
  setBudget
}) {
  const [showSuggestions, setShowSuggestions] =
    useState(false);

  const suggestions = useMemo(() => {
    if (!search.trim()) return [];

    const query = search.toLowerCase();

    const uniqueSuggestions = new Set();

    events.forEach((event) => {
      if (
        event.artist
          .toLowerCase()
          .includes(query)
      ) {
        uniqueSuggestions.add(
          event.artist
        );
      }

      if (
        event.title
          .toLowerCase()
          .includes(query)
      ) {
        uniqueSuggestions.add(
          event.title
        );
      }

      if (
        event.city
          .toLowerCase()
          .includes(query)
      ) {
        uniqueSuggestions.add(
          event.city
        );
      }

      if (
        event.language
          .toLowerCase()
          .includes(query)
      ) {
        uniqueSuggestions.add(
          event.language
        );
      }
    });

    return [...uniqueSuggestions].slice(
      0,
      5
    );
  }, [search, events]);

  const handleSearchChange = (e) => {
    setSearch(e.target.value);
    setShowSuggestions(true);
  };

  const handleSuggestionClick = (
    value
  ) => {
    setSearch(value);
    setShowSuggestions(false);

    const allEvents =
      document.getElementById(
        "all-events"
      );

    if (allEvents) {
      allEvents.scrollIntoView({
        behavior: "smooth"
      });
    }
  };

  return (
    <div className="filter-section">

      <div
        style={{
          position: "relative",
          width: "100%"
        }}
      >
        <input
          type="text"
          placeholder="🔍 Search artist, event, city..."
          value={search}
          onChange={handleSearchChange}
          onFocus={() =>
            setShowSuggestions(true)
          }
        />

        {showSuggestions &&
          suggestions.length > 0 && (
            <div
              style={{
                position: "absolute",
                top: "110%",
                left: 0,
                width: "100%",
                background: "#1f2937",
                borderRadius: "12px",
                overflow: "hidden",
                zIndex: 1000,
                boxShadow:
                  "0 8px 24px rgba(0,0,0,0.3)"
              }}
            >
              {suggestions.map(
                (
                  suggestion,
                  index
                ) => (
                  <div
                    key={index}
                    onClick={() =>
                      handleSuggestionClick(
                        suggestion
                      )
                    }
                    style={{
                      padding:
                        "12px 16px",
                      cursor:
                        "pointer",
                      borderBottom:
                        "1px solid rgba(255,255,255,0.08)"
                    }}
                  >
                    🔍 {suggestion}
                  </div>
                )
              )}
            </div>
          )}
      </div>

      <select
        value={city}
        onChange={(e) =>
          setCity(e.target.value)
        }
      >
        <option value="">
          📍 All Cities
        </option>

        <option value="Hyderabad">
          Hyderabad
        </option>

        <option value="Bangalore">
          Bangalore
        </option>

        <option value="Chennai">
          Chennai
        </option>
      </select>

      <select
        value={language}
        onChange={(e) =>
          setLanguage(e.target.value)
        }
      >
        <option value="">
          🌐 All Languages
        </option>

        <option value="Hindi">
          Hindi
        </option>

        <option value="Telugu">
          Telugu
        </option>

        <option value="Tamil">
          Tamil
        </option>

        <option value="English">
          English
        </option>
      </select>

      <select
        value={category}
        onChange={(e) =>
          setCategory(e.target.value)
        }
      >
        <option value="">
          🎭 All Categories
        </option>

        <option value="Concert">
          Concert
        </option>

        <option value="Comedy">
          Comedy
        </option>

        <option value="Small Band">
          Small Band
        </option>
      </select>

      <select
        value={mood}
        onChange={(e) =>
          setMood(e.target.value)
        }
      >
        <option value="">
          😊 All Moods
        </option>

        <option value="Romantic">
          Romantic ❤️
        </option>

        <option value="Party">
          Party 🎉
        </option>

        <option value="Chill">
          Chill 😌
        </option>

        <option value="Energetic">
          Energetic ⚡
        </option>
      </select>

      <select
        value={budget}
        onChange={(e) =>
          setBudget(e.target.value)
        }
      >
        <option value="">
          💰 All Budgets
        </option>

        <option value="1000">
          Under ₹1000
        </option>

        <option value="2000">
          Under ₹2000
        </option>

        <option value="3000">
          Under ₹3000
        </option>

        <option value="5000">
          Under ₹5000
        </option>
      </select>

    </div>
  );
}

export default SearchFilters; 