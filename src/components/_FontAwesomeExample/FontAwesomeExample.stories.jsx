import React from "react";
import { storiesOf } from "@storybook/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCoffee } from "@fortawesome/free-solid-svg-icons";

// search for icons: https://fontawesome.com/icons
storiesOf("Fontawesome examples", module).add("coffee icon example", () => (
  <FontAwesomeIcon icon={faCoffee} />
));
