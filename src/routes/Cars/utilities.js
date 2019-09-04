import Moment from "moment";
import { extendMoment } from "moment-range";

const moment = extendMoment(Moment);

export const checkVehicleAvailable = ({
  orders = [],
  date = moment(),
  vehicleId = ""
}) => {
  const filteredOrders = orders.filter(order => order.vehicleId === vehicleId);

  if (filteredOrders.length === 0) {
    return true;
  }

  return !filteredOrders.some(order => {
    const existingTime = moment.range(order.pickTime, order.returnTime);

    return existingTime.contains(date);
  });
};

export const checkPickUpOrReturn = ({ orders, date, vehicleId }) => {
  const filteredOrders = orders.filter(order => order.vehicleId === vehicleId);

  for (let i = 0; i < filteredOrders.length; i++) {
    const order = filteredOrders[i];

    const existingTime = moment.range(order.pickTime, order.returnTime);

    if (existingTime.contains(date)) {
      if (date.isSame(moment(order.pickTime.slice(0, 10)))) return "Pickup";
      if (date.isSame(moment(order.returnTime.slice(0, 10)))) return "Return";

      return "Rented";
    }
  }

  return "Available";
};

export const vehicleStatus = ({ vehicleStatus, vehicleId, orders, date }) => {
  const status = checkPickUpOrReturn({ orders, date, vehicleId });

  if (status === "Available" && vehicleStatus === "UNAVAILABLE") {
    return "Unavailable";
  }

  return status;
};

export const vehicleTypeDropdown = ({ cars }) => {
  const carTypes = {};

  cars.forEach(car => {
    const carType = car.vehicleType.toLowerCase();

    if (!(carType in carTypes)) {
      carTypes[carType] = true;
    }
  });

  return Object.keys(carTypes).map(type => ({ label: type, value: type }));
};

export const applyFilter = ({
  car = { Company: {}, rentalCompanyId: "" },
  states = {},
  orders
}) => {
  const {
    filterRentalCompanyId,
    filterVehicleStatus,
    filterVehicleType,
    filterDate
  } = states;

  if (
    filterRentalCompanyId &&
    filterRentalCompanyId !== "All" &&
    car.rentalCompanyId !== filterRentalCompanyId
  ) {
    return false;
  }

  if (
    filterVehicleType &&
    filterVehicleType !== "All" &&
    car.vehicleType.toLowerCase() !== filterVehicleType
  ) {
    return false;
  }

  if (filterVehicleStatus) {
    const carStatus = vehicleStatus({
      vehicleStatus: car.vehicleStatus,
      vehicleId: car._id,
      orders,
      date: filterDate
    });

    if (filterVehicleStatus !== "All" && carStatus !== filterVehicleStatus)
      return false;
  }

  return true;
};
