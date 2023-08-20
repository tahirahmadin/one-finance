import axios from "axios";
import { constants } from "../utils/constants";

// Update user profile data
let baseUrl = constants.backend_dev;

export const getUserData = async (address) => {
  let url = `${baseUrl}/user/${address}`;
  let response = axios
    .get(url)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
  return response;
};

export const getLatestPrice = async () => {
  let url = `${baseUrl}/order-apis/v1/latest-price`;
  let response = axios
    .get(url)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
  return response;
};

export const updateUserData = async (userData) => {
  let url = `${baseUrl}/user`;
  let response = axios
    .post(url, userData)
    .then((res) => {
      return true;
    })
    .catch((err) => {
      return false;
    });
  return response;
};
