import { createContext, useEffect, useState } from "react";

export const ReviewContext = createContext();

const initialReviews = [
  {
    eventId: 1,
    name: "Priya S",
    rating: 5,
    comment: "Arijit's performance was magical!",
    date: "12 Jul 2025"
  },
  {
    eventId: 2,
    name: "Rahul K",
    rating: 4,
    comment: "Amazing energy and great crowd.",
    date: "22 Aug 2025"
  },
  {
    eventId: 3,
    name: "Sneha R",
    rating: 5,
    comment: "Zakir Khan was hilarious!",
    date: "15 Sep 2025"
  }
];

export const ReviewProvider = ({
  children
}) => {
  const [reviews, setReviews] = useState(() => {
    const stored = localStorage.getItem(
      "reviews"
    );

    return stored
      ? JSON.parse(stored)
      : initialReviews;
  });

  useEffect(() => {
    localStorage.setItem(
      "reviews",
      JSON.stringify(reviews)
    );
  }, [reviews]);

  const addReview = (review) => {
    setReviews((prev) => [
      ...prev,
      review
    ]);
  };

  return (
    <ReviewContext.Provider
      value={{
        reviews,
        addReview
      }}
    >
      {children}
    </ReviewContext.Provider>
  );
};