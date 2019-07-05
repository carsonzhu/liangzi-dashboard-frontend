import React from "react";
import { Table } from "react-bootstrap";
import "./Admins.css";

//Fake data
const data = [
  {
    email: "abc@abc.com",
    company: "Alamo",
    allowedOperations: ["cars", "users", "insurances", "transactions"]
  },
  {
    email: "abc@abc.com",
    company: "Alamo",
    allowedOperations: ["cars", "users", "insurances", "transactions"]
  },
  {
    email: "abc@abc.com",
    company: "Alamo",
    allowedOperations: ["cars", "users", "insurances", "transactions"]
  },
  {
    email: "abc@abc.com",
    company: "Alamo",
    allowedOperations: ["cars", "users", "insurances", "transactions"]
  },
  {
    email: "abc@abc.com",
    company: "Alamo",
    allowedOperations: ["cars", "users", "insurances", "transactions"]
  },
  {
    email: "abc@abc.com",
    company: "Alamo",
    allowedOperations: ["cars", "users", "insurances", "transactions"]
  }
];

const operationGenerator = operations => {
  const listItems = operations.map((operation, ind) => (
    <li key={ind}>{operation}</li>
  ));

  return <ul style={{ "list-style-type": "disc" }}>{listItems}</ul>;
};

const tbodyGenerator = admins => {
  return admins.map((info, ind) => (
    <tr key={ind}>
      <td>{ind}</td>
      <td>{info.email}</td>
      <td>{info.company}</td>
      <td>{operationGenerator(info.allowedOperations)}</td>
    </tr>
  ));
};

const Admins = () => {
  return (
    <div className="admins-route">
      <div>Admins</div>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Email</th>
            <th>Company</th>
            <th>Allowed Operations</th>
          </tr>
        </thead>
        <tbody>{tbodyGenerator(data)}</tbody>
      </Table>
    </div>
  );
};

export default Admins;
