import {
  render,
  screen
} from "@testing-library/react";

import {
  BrowserRouter
} from "react-router-dom";

import Home from "../pages/Home";

describe(
  "Booking Flow",
  () => {

    test(
      "home page loads",
      () => {

        render(
          <BrowserRouter>
            <Home />
          </BrowserRouter>
        );

        expect(
          screen.getByText(
            /Discover Amazing Events/i
          )
        ).toBeInTheDocument();

      }
    );

  }
);