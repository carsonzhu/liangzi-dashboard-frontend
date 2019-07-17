import Cars from "../Cars";
// import Users from "../Users";
// import Transactions from "../Transactions";
// import Tickets from "../Tickets";
import Admins from "../Admins";
import Insurances from "../Insurances";

// Fake data
const superAdminTabs = [
  { title: "Admin Management", link: "/admins", component: Admins },
  { title: "Car Management", link: "/cars", component: Cars },
  {
    title: "Insurance Management",
    link: "/insurances",
    component: Insurances
  }
];

const normalAdminTabs = [
  { title: "Car Management", link: "/cars", component: Cars },
  {
    title: "Insurance Management",
    link: "/insurances",
    component: Insurances
  }
];

export { superAdminTabs, normalAdminTabs };
