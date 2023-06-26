import { useCallback, useEffect, useMemo } from "react";

import { gql, useLazyQuery } from "@apollo/client";

import { getOrdersQuery } from "../queries/graphQueries";
import { strategyType } from "../utils/constants";
import ethersServiceProvider from "../services/ethersServiceProvider";

export function useOrders(strategy = strategyType.ACCUMULATION) {
  let account = ethersServiceProvider.currentAccount;
  const ordersPage = 1;
  const pendingOrderGraphQuery = useMemo(() => {
    return getOrdersQuery(ordersPage, account, strategy, "pending");
  }, [account]);
  const completedOrderGraphQuery = useMemo(() => {
    return getOrdersQuery(ordersPage, account, strategy, "completed");
  }, [account]);

  const [
    getPendingOrders,
    { loading: pendingLoading, error: pendingError, data: pendingOrders },
  ] = useLazyQuery(gql(pendingOrderGraphQuery), {
    fetchPolicy: "network-only",
    pollInterval: 1000,
  });

  const [
    getCompletedOrders,
    { loading: compledLoading, error: completedError, data: completedOrders },
  ] = useLazyQuery(gql(completedOrderGraphQuery), {
    fetchPolicy: "network-only",
    pollInterval: 1000,
  });

  useEffect(() => {
    console.log("completedOrders ", { completedOrders, completedError });
  }, [completedOrders]);

  useEffect(() => {
    getPendingOrders();
    getCompletedOrders();
  }, [account]);

  return {
    loading: pendingLoading || compledLoading,
    error: pendingError || completedError,
    pendingOrders: pendingOrders,
    completedOrders: completedOrders,
  };
}
