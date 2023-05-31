import { useEffect, useMemo, useState } from "react";

import { useLazyQuery } from "@apollo/client";

import { GetPoolDataById } from "../queries/graphQueries";
import { strategyType } from "../utils/constants";

export function usePoolInfo(strategy = strategyType.ACCUMULATION) {
  const [poolData, setPoolData] = useState({
    invested: null,
    inOrders: null,
    totalOrders: null,
    vol24: null,
    perVolChange24hr: null,
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

    setPoolData({
      totalOrders: data?.pools?.[0]?.ordersCount,
      invested: data?.pools?.[0]?.deposit,
      inOrders: data?.pools?.[0]?.fiatBalance,
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
