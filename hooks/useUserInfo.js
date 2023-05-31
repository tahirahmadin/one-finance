import { useEffect, useState } from "react";

import { useLazyQuery } from "@apollo/client";

import { GetPoolUserDataByAddress } from "../queries/graphQueries";
import { strategyType } from "../utils/constants";
import { useWeb3Auth } from "./useWeb3Auth";

export function useUserInfo() {
  const { accountSC } = useWeb3Auth();

  const [userData, setUserData] = useState({
    totalOrders: null,
    totalInvestedUSDT: null,
    inOrderUSDT: null,
    tokensAccumulated: null,
    pnl: null,
  });

  const [getPoolUserDataQuery, { data, loading, error }] = useLazyQuery(
    GetPoolUserDataByAddress,
    {
      fetchPolicy: "network-only",
      pollInterval: 1000,
    }
  );

  useEffect(() => {
    if (accountSC) {
      getPoolUserDataQuery({
        variables: { user: accountSC, type: strategyType.ACCUMULATION },
      });
    }
  }, [accountSC]);

  useEffect(() => {
    if (!data?.poolUsers) {
      return;
    }

    setUserData({
      totalOrders: data?.poolUsers?.[0]?.ordersCount,
      totalInvestedUSDT: data?.poolUsers?.[0]?.deposit,
      tokensAccumulated: data?.poolUsers?.[0]?.tokenBalance,
    });
  }, [data]);

  return {
    loading: loading,
    error: error,
    userPoolInfo: userData,
  };
}
