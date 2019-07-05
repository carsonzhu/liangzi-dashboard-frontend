import React from "react";
import { Table } from "react-bootstrap";
import "./Cars.css";

//Fake data
const data = [
  {
    dailyRate: 100,
    pickupLocation: "Toronto",
    returnLocation: "Toronto",
    specialServices: ["GPS", "驾照翻译件", "儿童安全座椅", "中文向导"],
    transmission: "AUTOMATIC",
    vehicleTypeId: "Toyota",
    rentalCompany: "Aloma"
  },
  {
    dailyRate: 100,
    pickupLocation: "Toronto",
    returnLocation: "Toronto",
    specialServices: ["GPS", "驾照翻译件", "儿童安全座椅", "中文向导"],
    transmission: "AUTOMATIC",
    vehicleTypeId: "Toyota",
    rentalCompany: "Aloma"
  },
  {
    dailyRate: 100,
    pickupLocation: "Toronto",
    returnLocation: "Toronto",
    specialServices: ["GPS", "驾照翻译件", "儿童安全座椅", "中文向导"],
    transmission: "AUTOMATIC",
    vehicleTypeId: "Toyota",
    rentalCompany: "Aloma"
  },
  {
    dailyRate: 100,
    pickupLocation: "Toronto",
    returnLocation: "Toronto",
    specialServices: ["GPS", "驾照翻译件", "儿童安全座椅", "中文向导"],
    transmission: "AUTOMATIC",
    vehicleTypeId: "Toyota",
    rentalCompany: "Aloma"
  }
];

const operationGenerator = operations => {
  const listItems = operations.map((operation, ind) => (
    <li key={ind}>{operation}</li>
  ));

  return <ul style={{ "list-style-type": "disc" }}>{listItems}</ul>;
};

const tbodyGenerator = Cars => {
  return Cars.map((info, ind) => (
    <tr key={ind}>
      <td>{ind}</td>
      <td>{info.dailyRate}</td>
      <td>{info.pickupLocation}</td>
      <td>{info.returnLocation}</td>
      <td>{operationGenerator(info.specialServices)}</td>
      <td>{info.transmission}</td>
      <td>{info.vehicleTypeId}</td>
      <td>{info.rentalCompany}</td>
    </tr>
  ));
};

const Cars = () => {
  return (
    <div className="cars-route">
      <div>Cars</div>
      <Table responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Daily Rate</th>
            <th>Pickup Location</th>
            <th>Return Location</th>
            <th>Special Services</th>
            <th>Transmission</th>
            <th>Vehicle Type</th>
            <th>Rental Company</th>
          </tr>
        </thead>
        <tbody>{tbodyGenerator(data)}</tbody>
      </Table>
    </div>
  );
};

export default Cars;
