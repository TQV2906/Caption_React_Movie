import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./redux/userSlice.js";
import movieSlice from "./redux/movieSlice.js";
import carouselSlice from "./redux/carouselSlice.js";
import modalSlice from "./redux/modalSlice.js";
import loadingSlice from "./redux/loadingSlice.js";
import boxTicketSlice from "./redux/boxTicketSlice.js";
import AppTest from "./AppTest.jsx";
import { BrowserRouter } from "react-router-dom";

export const store = configureStore({
  reducer: {
    boxTicketSlice: boxTicketSlice,
    loadingSlice: loadingSlice,
    carouselSlice: carouselSlice,
    modalSlice: modalSlice,
    movieSlice: movieSlice,
    userSlice: userSlice,
  },
});

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    {/* <BrowserRouter> */}
    <App />
    {/* </BrowserRouter> */}
  </Provider>
);
