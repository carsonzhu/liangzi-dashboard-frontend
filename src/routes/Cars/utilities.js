import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

export const checkVehicleAvailable = ({ orders = [], vehicleId = "" }) => {
  const filteredOrders = orders.filter(order => order.vehicleId === vehicleId);

  if (filteredOrders.length === 0) {
    return true;
  }

  const currTime = moment();

  return !filteredOrders.some(order => {
    const existingTime = moment.range(order.pickTime, order.returnTime);

    return existingTime.contains(currTime);
  });
};
