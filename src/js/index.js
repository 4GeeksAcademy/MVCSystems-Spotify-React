import React from "react";
import ReactDOM from "react-dom";
import { SongsProvider } from "./Context/SongsProvider"; // Mantener esta importación
import Home from "./component/home";
import "../styles/index.css";

ReactDOM.render(
  <SongsProvider>
    <Home />
  </SongsProvider>,
  document.getElementById("app")
);
