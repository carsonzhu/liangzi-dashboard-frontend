import React from "react";
import { Table } from "react-bootstrap";

const fields = [
  { title: "Total", key: "amount" },
  { title: "Currency", key: "currency" },
  { title: "Pickup Time", key: "pickTime" },
  { title: "Return Time", key: "returnTime" },
  { title: "Payment", key: "paymentMethod" },
  { title: "Insurance", key: "insuranceId" }
];

const OrderHistory = ({ data, insurances }) => {
  const displayPayment = paymentMethod => {
    switch (paymentMethod) {
      case "WAITTOCHOOSE":
      case "WAIT_TO_PAY":
        return "Pending";
      default:
        return paymentMethod;
    }
  };
  const displayInsurance = (insurances, insuranceId) => {
    if (!insuranceId) {
      return "None";
    }

    for (let i = 0; i < insurances.length; i++) {
      if (insurances[i]._id === insuranceId) {
        return insurances[i].name;
      }
    }

    return "None";
  };

  const theadGenerater = () => {
    return (
      <tr>
        {fields.map((field, ind) => {
          return <th key={`${ind}-${field.title}`}>{field.title}</th>;
        })}
      </tr>
    );
  };

  const tbodyGenerator = (data, insurances) => {
    return data.map(order => (
      <tr>
        {fields.map((field, ind) => {
          const key = field.key;

          switch (key) {
            case "pickTime":
            case "returnTime":
              return <td key={`${ind}-${key}`}>{order[key]}</td>;
            case "paymentMethod":
              return (
                <td key={`${ind}-${key}`}>{displayPayment(order[key])}</td>
              );
            case "insuranceId":
              return (
                <td key={`${ind}-${key}`}>
                  {displayInsurance(insurances, order[key])}
                </td>
              );
            default:
              return <td key={`${ind}-${key}`}>{order[key]}</td>;
          }
        })}
      </tr>
    ));
  };

  return (
    <Table responsive hover>
      <thead>{theadGenerater()}</thead>
      <tbody>{tbodyGenerator(data, insurances)}</tbody>
    </Table>
  );
};

export default OrderHistory;
