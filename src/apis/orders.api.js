import axios from "axios";

import { LIANG_ZI_BACKEND_URL } from "./utilities";

const ORDER_API = `${LIANG_ZI_BACKEND_URL}/apis/orders`;

export const getOrdersRequest = ({ token }) => {
  const fetchOrderRequestJSONTransform = json => {
    const { orders } = json.data.data;

    return { orders };
  };

  return new Promise((resolve, reject) => {
    axios({
      method: "get",
      url: ORDER_API,
      headers: {
        authorization: token
      }
    })
      .then(json => {
        if (json.status !== 200) {
          return reject({ msg: "Internal Error" });
        }

        return resolve(fetchOrderRequestJSONTransform(json));
      })
      .catch(reject);
  });
};

// TODO
export const createOrderRequest = ({ token }) => {
  const createOrderRequestJSONTransform = json => {
    const { newOrder } = json.data.data;

    return { order: newOrder };
  };

  return new Promise((resolve, reject) => {
    axios({
      method: "post",
      url: ORDER_API,
      //   data: { name, address, image, rating, perks, locationAlias },
      headers: {
        authorization: token
      }
    })
      .then(json => {
        if (json.status !== 200) {
          return reject({ msg: "Internal Error" });
        }

        return resolve(createOrderRequestJSONTransform(json));
      })
      .catch(reject);
  });
};

export const editOrderRequest = ({ token, orderId, fieldToUpdate }) => {
  return new Promise((resolve, reject) => {
    axios({
      method: "put",
      url: ORDER_API,
      data: {
        orderId,
        fieldToUpdate
      },
      headers: {
        authorization: token
      }
    })
      .then(json => {
        if (json.status !== 200) {
          return reject({ msg: "Internal Error" });
        }

        return resolve(json);
      })
      .catch(reject);
  });
};
