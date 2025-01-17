import { MAX_RANGE } from '@/config/constants/const'
import {
	IIncentive,
	useGetEthPriceQuery,
	useGetIncentiveQuery,
	useGetIncentivesQuery,
	useGetPoolDayDataQuery,
	useGetPoolQuery,
	useGetPoolsQuery,
	useGetTokenQuery,
	useGetTokensQuery,
} from '@/types'
import { convertBasedOnEfficiency, getAmountsCurrentTickUSD } from '@/utils/tvl'
import { useMemo } from 'react'
import { useGraphClient } from './web3'

export const useIncentive = (id: string) => {
	const client = useGraphClient()

	const { data: ethPrice, loading: ethPriceLoading } = useGetEthPriceQuery({
		variables: { filter: { id_in: ['1'] } },
	})

	const { data, loading: incentiveLoading } = useGetIncentiveQuery({
		client,
		variables: { id },
	})

	const incentive = data?.incentive

	const { data: poolsData, loading: poolLoading } = useGetPoolQuery({
		variables: { id: incentive?.pool },
	})

	const { data: rewardTokensData, loading: tokenLoading } = useGetTokenQuery({
		variables: { id: incentive?.rewardToken },
	})

	const result: IIncentive | undefined = useMemo(() => {
		const pool = poolsData?.pool
		const rewardToken = rewardTokensData?.token

		const tokenPriceUSD = rewardToken?.derivedETH * ethPrice?.bundles[0].ethPriceUSD

		const poolToken0PriceUSD = pool?.token0?.derivedETH * ethPrice?.bundles[0].ethPriceUSD
		const poolToken1PriceUSD = pool?.token1?.derivedETH * ethPrice?.bundles[0].ethPriceUSD

		const activeTickLiqudityUSD = getAmountsCurrentTickUSD(
			pool?.sqrtPrice,
			pool?.tick,
			pool?.liquidity,
			pool?.feeTier,
			pool?.token0?.decimals,
			pool?.token1?.decimals,
			poolToken0PriceUSD,
			poolToken1PriceUSD,
		)

		const activeLiqudityUSD = convertBasedOnEfficiency(activeTickLiqudityUSD, pool?.feeTier, incentive?.minWidth ?? 0)

		const fullRangeLiquidityUSD = convertBasedOnEfficiency(activeTickLiqudityUSD, pool?.feeTier, MAX_RANGE)

		if (!incentive || !pool || !rewardToken) return
		return {
			...incentive,
			tokenPriceUSD,
			activeLiqudityUSD,
			fullRangeLiquidityUSD,
			pool,
			rewardToken,
		}
	}, [ethPrice?.bundles, incentive, poolsData?.pool, rewardTokensData?.token])
	const loading = incentiveLoading || poolLoading || tokenLoading
	return [result, loading] as const
}

export const useIncentives = () => {
	const client = useGraphClient()

	const { data: ethPrice, loading: ethPriceLoading } = useGetEthPriceQuery({
		variables: { filter: { id_in: ['1'] } },
	})

	const { data, loading: incentivesLoading } = useGetIncentivesQuery({
		client,
	})

	const { data: poolsData, loading: poolsLoading } = useGetPoolsQuery({
		variables: { filter: { id_in: data?.incentives.map((i: any) => i.pool) } },
	})

	const day = (new Date().getTime() / 86400000 - 1).toFixed(0)

	const { data: poolsDayData, loading: poolsDayLoading } = useGetPoolDayDataQuery({
		variables: {
			filter: { id_in: data?.incentives.map((i: any) => i.pool + '-' + day) },
		},
	})

	const { data: poolTokensData, loading: poolTokensLoading } = useGetTokensQuery({
		variables: {
			filter: {
				id_in: poolsData?.pools.map((i: any) => [i.token0.id, i.token1.id]).flat(),
			},
		},
	})

	const { data: rewardTokensData, loading: tokensLoading } = useGetTokensQuery({
		variables: {
			filter: { id_in: data?.incentives.map((i: any) => i.rewardToken) },
		},
	})

	const result: IIncentive[] | undefined = useMemo(() => {
		const pools = poolsData?.pools
		const rewardTokens = rewardTokensData?.tokens
		const poolsDayDatas = poolsDayData?.poolDayDatas
		const poolTokens = poolTokensData?.tokens
		if (!data || !pools || !rewardTokens || !poolsDayDatas || !ethPrice || !poolTokens) return
		return data.incentives
			.map((i: any) => {
				const pool = pools.find((p: any) => p.id === i.pool)
				let poolDayData = poolsDayDatas.find((d) => d.pool.id === pool?.id)

				const rewardToken = rewardTokens.find((t: any) => t.id === i.rewardToken)
				const poolToken0 = poolTokens.find((p: any) => p.id === pool?.token0.id)
				const poolToken1 = poolTokens.find((p: any) => p.id === pool?.token1.id)

				const tokenPriceUSD = rewardToken?.derivedETH * ethPrice.bundles[0].ethPriceUSD

				const poolToken0PriceUSD = poolToken0?.derivedETH * ethPrice.bundles[0].ethPriceUSD
				const poolToken1PriceUSD = poolToken1?.derivedETH * ethPrice.bundles[0].ethPriceUSD

				const activeTickLiqudityUSD = getAmountsCurrentTickUSD(
					pool?.sqrtPrice,
					pool?.tick,
					pool?.liquidity,
					pool?.feeTier,
					pool?.token0?.decimals,
					pool?.token1?.decimals,
					poolToken0PriceUSD,
					poolToken1PriceUSD,
				)

				const activeLiqudityUSD = convertBasedOnEfficiency(activeTickLiqudityUSD, pool?.feeTier, i?.minWidth ?? 0)

				const fullRangeLiquidityUSD = convertBasedOnEfficiency(activeTickLiqudityUSD, pool?.feeTier, MAX_RANGE)

				if (!pool || !rewardToken) {
					return
				}

				if (!poolDayData) {
					poolDayData = {
						date: 0,
						feesUSD: 0,
						pool: pool,
					}
				}

				return {
					...i,
					pool,
					rewardToken,
					poolDayData,
					tokenPriceUSD,
					activeLiqudityUSD,
					fullRangeLiquidityUSD,
				}
			})
			.filter(Boolean) as IIncentive[]
	}, [poolsData?.pools, rewardTokensData?.tokens, poolsDayData?.poolDayDatas, data, ethPrice, poolTokensData?.tokens])

	const loading =
		incentivesLoading || poolsLoading || tokensLoading || ethPriceLoading || poolsDayLoading || poolTokensLoading
	return [result, loading] as const
}
