import React from "react";
import { storiesOf } from "@storybook/react";
import { action } from "@storybook/addon-actions";

import AdminForm from "./adminModal";

storiesOf("AdminForm", module).add("Sample1", () => (
  <AdminForm
  //example: login={action("login")}
  />
));
