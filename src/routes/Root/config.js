// TODO: Import component!
import Cars from "../Cars";
import Users from "../Users";
import Transactions from "../Transactions";
import Tickets from "../Tickets";

// Fake data
const urlTabs = [
  {
    title: "Transaction Table",
    link: "#",
    component: () => {}
  },
  { title: "User Profiles", link: "#", component: () => {} },
  {
    title: "Create Transaction",
    link: "/transactions",
    component: Transactions
  },
  { title: "Support Tickets", link: "/tickets", component: Tickets },
  { title: "User Management", link: "/users", component: Users },
  { title: "Car Management", link: "/cars", component: Cars }
];

export { urlTabs };
