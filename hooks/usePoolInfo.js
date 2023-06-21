import { useEffect, useMemo, useState } from "react";

import { useLazyQuery } from "@apollo/client";

import { GetPoolDataById } from "../queries/graphQueries";
import { strategyType } from "../utils/constants";
import Web3 from "web3";

export function usePoolInfo(strategy = strategyType.ACCUMULATION) {
  const [poolData, setPoolData] = useState({
    invested: null,
    inOrders: null,
    totalOrders: null,
    vol24: null,
    perVolChange24hr: null,
    allTimeVol: null,
    participants: null,
  });
  const [getPoolDataQuery, { data, loading, error }] = useLazyQuery(
    GetPoolDataById,
    {
      fetchPolicy: "network-only",
      pollInterval: 1000,
    }
  );

  useEffect(() => {
    if (!data?.pools) {
      return;
    }
    let poolValues = data?.pools?.[0];
    if (poolValues) {
      let tempInvested = poolValues.deposit.toString();
      let tempInOrders = poolValues.fiatBalance.toString();
      let tempFiatBalance = poolValues.fiatBalance.toString();

      setPoolData({
        totalOrders: data?.pools?.[0]?.ordersCount,
        invested: Web3.utils.fromWei(tempInvested, "ether"),
        inOrders: Web3.utils.fromWei(tempInOrders, "ether"),
        allTimeVol: parseInt(
          Web3.utils.fromWei(tempInvested, "ether") -
            Web3.utils.fromWei(tempFiatBalance, "ether")
        ),
        participants: data?.pools?.[0]?.usersCount,
      });
    }
  }, [data]);

  useEffect(() => {
    if (!strategy) {
      return;
    }

    getPoolDataQuery({
      variables: {
        type: strategy,
      },
    });
  }, [strategy]);

  return {
    loading: loading,
    error: error,
    poolInfo: poolData,
  };
}
