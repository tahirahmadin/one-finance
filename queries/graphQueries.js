import { gql } from "@apollo/client";

export const GetPoolDataById = gql`
  query GetPoolDataById($type: String) {
    pools(where: { strategyType: $type }) {
      id
      strategyType
      usersCount
      ordersCount
      deposit
      fiatBalance
      tokenBalance
    }
  }
`;

export const GetPoolUserDataByAddress = gql`
  query GetPoolUserDataByAddress($user: String, $type: String) {
    poolUsers(where: { user: $user, strategyType: $type }) {
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
export const GetAllOrdersOfUser = gql`
  query GetAllOrdersOfUser($address: String, $type: String) {
    orders(first: 500, where: { user: $address, strategyType: $type }) {
      id
      orderId
      user
      open
      entryPrice
      nextPrice
      percentage
      grids
      executedGrids
      fiatBalance
      deposit
      remainingFiat
      tokenBalance
      tokenAddress
      strategyType
      remainingToken
    }
  }
`;
