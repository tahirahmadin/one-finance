import axios from "axios";
import constants from "../utils/constants";

// Update user profile data
let baseUrl = constants.backend_url;
let foodTruckBaseUrl = "https://foodtruck.onerare.io";

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

// Update user username
export const updateUserUsername = async (address, data) => {
  let url = `${baseUrl}/update-username/${address}`;
  let response = axios
    .post(url, data)
    .then((res) => {
      return true;
    })
    .catch((err) => {
      return false;
    });
  return response;
};
export const getUsernamesOfLeaderboard = async (addresses) => {
  let url = `${baseUrl}/getUserNames`;
  let response = axios
    .post(url, { userAddresses: addresses })
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });
  return response;
};

// Update user username
export const updateUserPicture = async (data) => {
  let url = `${baseUrl}/update-user-picture`;
  let response = axios
    .post(url, data, { headers: { "Content-Type": "multipart/form-data" } })
    .then((res) => {
      return true;
    })
    .catch((err) => {
      return false;
    });
  return response;
};

// Update user OrareFlag
export const updateUserOrareFlag = async (address) => {
  let url = `${baseUrl}/update-orareFlag/${address}`;
  let response = axios
    .post(url, {})
    .then((res) => {
      return true;
    })
    .catch((err) => {
      return false;
    });
  return response;
};

// Send new notification
export const sendNewNotification = async (data) => {
  let url = `${baseUrl}/notification-custom`;
  let response = axios
    .post(url, data)
    .then((res) => {
      console.log(res);
      return true;
    })
    .catch((err) => {
      console.log(err);

      return false;
    });
  return response;
};

// Claim Airdrop APIs

// Check if user is eligible for claiming airdrop
export const getClaimAirdropStatus = async (address) => {
  let url = `${baseUrl}/getCMCClaimStatus/${address}`;
  let response = await axios
    .get(url)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });

  return response;
};

// Claim Airdrop for eligible users
export const claimAirdropForUser = async (address) => {
  let url = `${baseUrl}/claimCMCAirdrop/${address}`;
  let response = axios.post(url);
  return response;
};
// Claim Bhukkad Cafe Rewards

export const getBhukkadClaimStatus = async (address) => {
  let url = `${baseUrl}/getBhukkadClaimStatus/${address}`;
  let response = await axios
    .get(url)
    .then((res) => {
      return res.data;
    })
    .catch((err) => {
      return err;
    });

  return response;
};

export const claimBhukkadRewardsForUser = async (address, couponCode) => {
  let url = `${baseUrl}/claimBhukkadAirdrop`;
  let response = axios.post(url, { address: address, code: couponCode });
  return response;
};
// <********** FoodTruckWars APIS ***************>

// Claim Rewards for completing the user onboarding
export const claimJourneyRewardsForUser = async (address) => {
  let url = `${foodTruckBaseUrl}/claimOrareReward`;
  let response = axios.post(url, { address: address });
  return response;
};

// Claim Rewards for completing the user onboarding
export const getJourneyClaimStatusForUser = async (address) => {
  let url = `${foodTruckBaseUrl}/getClaimOrareStatus`;
  let response = axios.post(url, { address: address });
  return response;
};

// GET User foodtruckwars balance
export const getUserFoodTruckWarsBalance = async (address) => {
  let url = `${foodTruckBaseUrl}/balanceOf`;
  let response = await axios
    .post(url, { userAddress: address })
    .then((res) => res.data);

  console.log(response);
  return response;
};

// POST Withdraw rewards from foodtruckwars
export const withdrawUserFoodTruckWarsBalance = async (data) => {
  let url = `${foodTruckBaseUrl}/withdrawRewards`;
  let response = await axios.post(url, data).then((res) => res.data);

  console.log(response);
  return response;
};

// Price of Orare
export const getOrareStats = async () => {
  let url =
    "https://api.coingecko.com/api/v3/simple/price?ids=onerare&vs_currencies=usd&include_market_cap=true&include_24hr_change=true";
  let response = await axios.get(url);

  return response.data;
};

// Next dish to release
// Price of Orare
export const getNextDishToRelease = async () => {
  let url = `${baseUrl}/nextDish`;
  let response = await axios.get(url).then((res) => res.data);

  return response;
};
