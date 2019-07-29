import Cars from "../Cars";
// import Users from "../Users";
// import Transactions from "../Transactions";
// import Tickets from "../Tickets";
import Admins from "../Admins";
import Insurances from "../Insurances";
import RentalCompanies from "../RentalCompanies";

// Fake data
const superAdminTabs = [
  {
    title: "Rental Company Management",
    link: "/rentalCompanies",
    component: RentalCompanies
  },
  { title: "Admin Management", link: "/admins", component: Admins },
  { title: "Vehicle Management", link: "/cars", component: Cars },
  {
    title: "Insurance Management",
    link: "/insurances",
    component: Insurances
  }
];

const normalAdminTabs = [
  { id: "cars", title: "Vehicle Management", link: "/cars", component: Cars },
  {
    id: "insurances",
    title: "Insurance Management",
    link: "/insurances",
    component: Insurances
  }
];

export { superAdminTabs, normalAdminTabs };
