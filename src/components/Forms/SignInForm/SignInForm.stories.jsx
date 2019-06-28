import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import SignInForm from "./SignInForm";

storiesOf("SignInForm", module).add("Sample1", () => (
  <SignInForm
  //example: login={action("login")}
  />
));
