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
    console.log(data);
    setPoolData({
      totalOrders: data?.pools?.[0]?.ordersCount,
      invested: Web3.utils.fromWei(
        data?.pools?.[0]?.deposit.toString(),
        "ether"
      ),
      inOrders: Web3.utils.fromWei(
        data?.pools?.[0]?.fiatBalance.toString(),
        "ether"
      ),
      allTimeVol: parseInt(
        Web3.utils.fromWei(data?.pools?.[0]?.deposit.toString(), "ether") -
          Web3.utils.fromWei(data?.pools?.[0]?.fiatBalance.toString(), "ether")
      ),
      participants: data?.pools?.[0]?.usersCount,
    });
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
