import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import InsuranceForm from "./insuranceModal";

storiesOf("InsuranceForm", module).add("Sample1", () => (
  <InsuranceForm
  //example: login={action("login")}
  />
));
