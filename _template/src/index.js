import React from "react";
import ReactDOM from "react-dom";
import Presentation from "./Presentation";

// Not using React.StrictMode because of performance issues (renders everything twice)
const rootEl = document.getElementById("root");
ReactDOM.render(<Presentation />, rootEl);

if (module.hot) {
  module.hot.accept("./Presentation", () => {
    const NextPresentation = require("./Presentation").default;
    ReactDOM.render(<NextPresentation />, rootEl);
  });
}
