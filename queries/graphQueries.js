import { gql } from "@apollo/client";

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
export const GetLeaderboardData = gql`
  query GetLeaderboardData($order: String) {
    userEntities(
      first: 100
      orderBy: score
      orderDirection: desc
      where: { address_not: "0xCC863109a4838637781b78e08F06743cE0148EEF" }
    ) {
      id
      address
      dishCount
      dishCountRewards
      ingredientCount
      score
    }
  }
`;

export const GetOrderBooksBySeller = gql`
  query GetOrderBooksBySeller($address: String) {
    orderBooks(first: 1000, orderBy: name, where: { activeOrderCount_not: 0 }) {
      id
      tokenId
      name
      orderDetail(first: 1000, where: { seller: $address, quantity_not: 0 }) {
        id
        orderId
        orderOpen
        price
        seller
        quantity
        isDish
      }
    }
  }
`;

export const GetOrderBooksByTokenId = gql`
  query GetOrderBooksBySeller($tokenId: String) {
    orderBooks(first: 1000, where: { tokenId: $tokenId }) {
      tokenId
      name
      activeOrderCount
      orderDetail {
        price
        quantity
        tokenId
        orderId
        seller
      }
    }
  }
`;
export const GetFarmerOffers = gql`
  query GetFarmerOffers($tokenId: String) {
    orderDetails(
      first: 1000
      orderBy: price
      where: { tokenId: $tokenId, orderOpen: true }
    ) {
      id
      tokenId
      orderId
      name
      orderOpen
      price
      seller
      quantity
      isDish
    }
  }
`;
export const GetOrderDetailsQuery = gql`
  query GetOrderDetails {
    orderDetails {
      id
      orderId
      orderOpen
      seller
      price
      quantity
    }
  }
`;

export const GetIngredientsQuery = gql`
  query GetIngredients($address: String) {
    ingredientEntities(where: { address: $address }) {
      id
      address
      ingredientData {
        tokenId
        data
      }
      currentOwner
    }
  }
`;
export const GetDishesQuery = gql`
  query GetDishes($address: String) {
    dishEntities(where: { address: $address }) {
      id
      dishData(first: 990) {
        id
        data
      }
      address
    }
  }
`;

export const GetIngredientsListQuery = gql`
  query GetIngredientsList($first: Int, $skip: Int) {
    ingredientDatas(orderBy: tokenId, first: $first, skip: $skip) {
      tokenId
      data
    }
  }
`;

export const GetIngredientSeeds = gql`
  query GetIngredientSeeds($first: Int, $skip: Int) {
    seedDatas(orderBy: tokenId, first: $first, skip: $skip) {
      tokenId
      ingredient {
        tokenId
        data
      }
      timelines
    }
  }
`;

export const GetDishesListQuery = gql`
  query GetDishesListQuery(
    $orderBy: String
    $orderDirection: String
    $first: Int
    $skip: Int
    $searchWord: String
    $method: String
    $cuisine: String
    $diet: String
    $brand: String
  ) {
    dishDatas(
      orderBy: $orderBy
      orderDirection: $orderDirection
      first: $first
      skip: $skip
      where: {
        name_contains: $searchWord
        brand_contains: $brand
        method_contains: $method
        cuisine_contains: $cuisine
        diet_contains: $diet
        locked: false
      }
    ) {
      id
      data
      diet
      timestamp
      mintedCount
      cuisine
      locked
    }
  }
`;

export const GetIngredientOrdersQuery = gql`
  query GetIngredientOrdersQuery(
    $orderBy: String
    $orderDirection: String
    $first: Int
    $skip: Int
    $searchWord: String
    $category: String
  ) {
    orderBooks(
      orderBy: $orderBy
      orderDirection: $orderDirection
      first: $first
      skip: $skip
      where: {
        name_contains_nocase: $searchWord
        isDish: false
        category_contains: $category
        activeOrderCount_not: 0
      }
    ) {
      id
      tokenId
      name
      activeOrderCount
      category
      data
      orderDetail(orderBy: price, where: { orderOpen_not: false }) {
        id
        orderId
        orderOpen
        price
        seller
        quantity
        isDish
      }
    }
  }
`;

export const GetDishOrdersQuery = gql`
  query GetDishOrdersQuery(
    $orderBy: String
    $orderDirection: String
    $first: Int
    $skip: Int
    $searchWord: String
    $category: String
    $cuisine: String
    $diet: String
    $brand: String
  ) {
    orderBooks(
      orderBy: $orderBy
      orderDirection: $orderDirection
      first: $first
      skip: $skip
      where: {
        name_contains_nocase: $searchWord
        category_contains: $category
        cuisine_contains: $cuisine
        diet_contains: $diet
        brand_contains: $brand
        isDish: true
        activeOrderCount_not: 0
      }
    ) {
      id
      tokenId
      name
      activeOrderCount
      category
      data
      diet
      cuisine
      brand
      orderDetail(
        orderBy: price
        where: { orderOpen_not: false, quantity_not: 0 }
      ) {
        id
        orderId
        orderOpen
        price
        seller
        quantity
        isDish
      }
    }
  }
`;

export const GetIngredientById = gql`
  query GetIngredientById($id: Int) {
    ingredientData(id: $id) {
      id
      data
      tokenId
    }
  }
`;

export const GetIngredientByTokenId = gql`
  query GetIngredientById($tokenId: Int) {
    ingredientDatas(where: { tokenId: $tokenId }) {
      id
      data
      tokenId
    }
  }
`;

export const GetDishById = gql`
  query GetDishById($id: Int) {
    dishData(id: $id) {
      id
      data
      burnTokenQty
      burnTokens {
        tokenId
        data
        # price
      }
      mintedCount
    }
  }
`;

export const GetTokensWin = gql`
  query GetIngredientsList($first: Int, $skip: Int, $tokenArray: [String]) {
    ingredientDatas(
      orderBy: tokenId
      first: $first
      skip: $skip
      where: { tokenId_in: $tokenArray }
    ) {
      tokenId
      data
    }
  }
`;

export const GetTokensOwned = gql`
  query GetTokensOwned($address: String) {
    ingredientEntities(
      where: { currentOwner: true, address: $address, ingredientCount_not: 0 }
      first: 1000
    ) {
      ingredientData {
        tokenId
        data
        orderDetail(
          orderBy: price
          orderDirection: asc
          where: { quantity_not: 0, orderOpen_not: false }
        ) {
          price
          quantity
          tokenId
          name
          orderOpen
          seller
        }
        # price
      }
      ingredientCount
    }
    dishEntities(
      first: 1000
      where: { currentOwner: true, address: $address, dishCount_not: 0 }
    ) {
      dishData {
        id
        data
        orderDetail(
          orderBy: price
          orderDirection: asc
          where: { quantity_not: 0, orderOpen_not: false }
        ) {
          price
          quantity
          tokenId
          name
          orderOpen
          isDish
        }
      }

      dishCount
    }
  }
`;

export const GetTokensOwnedByFarmingContract = gql`
  query GetTokensOwned($address: String) {
    ingredientEntities(
      first: 1000
      where: { currentOwner: true, address: $address, ingredientCount_not: 0 }
    ) {
      ingredientData {
        tokenId
        data
      }
      ingredientCount
    }
  }
`;

export const GetTokenData = gql`
  query GetTokenData {
    ingredientDatas(first: 1000, orderDirection: asc, orderBy: tokenId) {
      id
      data
      orderDetail(
        orderBy: price
        orderDirection: asc
        where: { quantity_not: 0, orderOpen_not: false }
      ) {
        price
        quantity
        tokenId
        name
        orderOpen
        seller
      }
    }
    dishDatas(first: 1000, where: { locked: false }) {
      id
      data
      burnTokens {
        id
        tokenId
        data
        # price
      }
      burnTokenQty
      mintedCount
      name
      cuisine
      diet
      method
      season
      skillMeter
      timestamp
      timeMeter
      spiceMeter
      ingredientsCount
      brand
    }
  }
`;

export const GetUserActivity = gql`
  query GetUserActivity($address: String) {
    userActivities(
      where: { address: $address }
      first: 100
      orderBy: timestamp
      orderDirection: desc
    ) {
      id
      address
      action
      quantity
      price
      tokenId
      contractAdd
      activityType
      timestamp
    }
  }
`;

export const GetSalesHistory = gql`
  query GetSalesHistory($address: String) {
    userActivities(
      first: 100
      where: {
        address: $address
        action_in: ["SELL_ORDER", "SELL_ORDER_INGREDIENT", "SELL_ORDER_DISH"]
      }
      orderBy: timestamp
      orderDirection: desc
    ) {
      id
      address
      action
      quantity
      price
      tokenId
      timestamp
    }
  }
`;

//Minted Count
export const GetTotalMintedDishCountQuery = gql`
  query GetTotalMintedDishCountQuery($first: Int, $skip: Int) {
    statsEntities(first: 50) {
      id
      dishMintedCount
    }
  }
`;
