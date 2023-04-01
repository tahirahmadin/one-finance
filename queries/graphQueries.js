import { gql } from "@apollo/client";

export const GetPoolDataById = gql`
  query GetPoolDataById($address: String) {
    pool(id: "0xef8bfb001801dfee3dc421ab31398c2d1fdb2bd4") {
      deposit
      fiatBalance
      id
      ordersCount
      strategyType
      tokenBalance
      usersCount
    }
  }
`;

export const GetPoolUserDataByAddress = gql`
  query GetPoolUserDataByAddress($user: String) {
    poolUsers(where: { user: $user }) {
      tokenBalance
      strategyType
      ordersCount
      id
      fiatBalance
      deposit
      user
    }
  }
`;
export const GetPoolUserActivityQuery = gql`
  query getPoolUserActivityQuery($user: String, $type: String) {
    userActivities(where: { user: $user, strategyType: $type }) {
      user
      token
      timestamp
      price
      orderId
      id
      fiat
      amount
      action
      strategyType
      tokenAddress
    }
  }
`;

export const GetUserGraphData = gql`
  query GetUserGraphData($address: String) {
    userEntities(first: 5, where: { address: $address }) {
      id
      address
      dishCount
      ingredientCount
      dishCountRewards
      score
      scoreSeason
      stakedFlag
      marketFlag
      kitchenFlag
    }
  }
`;
