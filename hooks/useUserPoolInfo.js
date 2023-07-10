import { useEffect, useState } from "react";
import { useLazyQuery } from "@apollo/client";
import { GetPoolUserDataByAddress } from "../queries/graphQueries";
import Web3 from "web3";
import ethersServiceProvider from "../services/ethersServiceProvider";

export function useUserPoolInfo(strategyType) {
  let accountSC = ethersServiceProvider.currentAccount;

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
    console.log("calling");
    if (accountSC) {
      getPoolUserDataQuery({
        variables: { user: accountSC, type: strategyType },
      });
    }
  }, [accountSC]);

  useEffect(() => {
    console.log("data");
    console.log(data);

    if (!data?.poolUsers) {
      return;
    }

    setUserData({
      totalOrders: data?.poolUsers?.[0]?.ordersCount,
      totalInvestedUSDT: Web3.utils.fromWei(
        data?.poolUsers?.[0]?.deposit.toString(),
        "ether"
      ),
      inOrderUSDT: Web3.utils.fromWei(
        data?.poolUsers?.[0]?.fiatBalance.toString(),
        "ether"
      ),
      tokensAccumulated: data?.poolUsers?.[0]?.tokenBalance,
    });
  }, [data]);

  return {
    loading: loading,
    error: error,
    userPoolInfo: userData,
  };
}
