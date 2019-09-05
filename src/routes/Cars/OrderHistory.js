import React from "react";
import { Table } from "react-bootstrap";

import { formatPhoneNumber, checkInRange } from "./utilities";

const fields = [
  { title: "Amount", key: "amount" },
  { title: "Currency", key: "currency" },
  { title: "Pickup Time", key: "pickTime" },
  { title: "Return Time", key: "returnTime" },
  { title: "Payment", key: "paymentMethod" },
  { title: "Insurance", key: "insuranceId" },
  { title: "Driver Name", key: "driver" },
  { title: "Account Contact", key: "contact" }
];

const OrderHistory = ({ data, insurances, selectedDate }) => {
  const displayPayment = paymentMethod => {
    switch (paymentMethod) {
      case "WAITTOCHOOSE":
      case "WAIT_TO_PAY":
        return "Pending";
      default:
        return paymentMethod;
    }
  };

  const displayTime = time => {
    // "2019-08-26T17:54:51.009Z"
    return time.replace("T", " ").slice(0, -5);
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
      <tr
        className={
          checkInRange({
            start: order.pickTime,
            end: order.returnTime,
            selected: selectedDate
          })
            ? "order-history__hightlighted"
            : ""
        }
      >
        {fields.map((field, ind) => {
          const key = field.key;

          switch (key) {
            case "pickTime":
            case "returnTime":
              return <td key={`${ind}-${key}`}>{displayTime(order[key])}</td>;
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
            case "driver":
              if (
                !order.Driver ||
                !order.Driver.firstName ||
                !order.Driver.lastName
              ) {
                return <td key={`${ind}-${key}`}>None</td>;
              }

              return (
                <td key={`${ind}-${key}`}>
                  {`${order.Driver.firstName} ${order.Driver.lastName}`}
                </td>
              );
            case "contact":
              if (
                !order.User ||
                (!order.User.phoneNumber && !order.User.email)
              ) {
                return <td key={`${ind}-${key}`}>None</td>;
              } else if (order.User.phoneNumber) {
                return (
                  <td key={`${ind}-${key}`}>
                    {formatPhoneNumber(order.User.phoneNumber)}
                  </td>
                );
              }
              return <td key={`${ind}-${key}`}>{order.User.email}</td>;
            default:
              return <td key={`${ind}-${key}`}>{order[key]}</td>;
          }
        })}
      </tr>
    ));
  };

  return (
    <div>
      <Table responsive hover>
        <thead>{theadGenerater()}</thead>
        <tbody>{tbodyGenerator(data, insurances)}</tbody>
      </Table>
      <div className="order-history__legends">
        <div className="order-history__legends-square" />
        <p className="order-history__legends-blue">Current Order</p>
      </div>
    </div>
  );
};

export default OrderHistory;
