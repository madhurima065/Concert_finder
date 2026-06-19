import { createContext, useState } from "react";

export const FavoriteContext =
  createContext();

export function FavoriteProvider({
  children
}) {

  const [favorites, setFavorites] =
    useState([]);

  const addFavorite = (event) => {

    const exists =
      favorites.some(
        (item) =>
          item.id === event.id
      );

    if (!exists) {
      setFavorites((prev) => [
        ...prev,
        event
      ]);
    }
  };

  const removeFavorite = (id) => {
    setFavorites(
      favorites.filter(
        (item) => item.id !== id
      )
    );
  };

  return (
    <FavoriteContext.Provider
      value={{
        favorites,
        addFavorite,
        removeFavorite
      }}
    >
      {children}
    </FavoriteContext.Provider>
  );
}