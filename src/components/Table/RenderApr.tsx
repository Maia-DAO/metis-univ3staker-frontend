import { YEAR } from '@/config/constants/const'
import { formatBigInt } from '@/utils'

export const renderRewardApr = (incentive: any) => {
	const now = Date.now()
	if (
		now > incentive.endTime * 1000 ||
		incentive.tokenPriceUSD === 0 ||
		(incentive.fullRangeLiquidityUSD === 0 && incentive.activeLiqudityUSD === 0)
	) {
		return <>0%</>
	}

	return (
		<>
			{(incentive.fullRangeLiquidityUSD > 0 &&
				(
					((Number(formatBigInt(incentive.reward)) * incentive.tokenPriceUSD) / incentive.fullRangeLiquidityUSD) *
					(YEAR / (incentive.endTime - incentive.startTime)) *
					100
				).toFixed(2)) ||
				0}
			% -{' '}
			{(incentive.activeLiqudityUSD > 0 &&
				(
					((Number(formatBigInt(incentive.reward)) * incentive.tokenPriceUSD) / incentive.activeLiqudityUSD) *
					(YEAR / (incentive.endTime - incentive.startTime)) *
					100
				).toFixed(2)) ||
				0}
			%
		</>
	)
}

export const renderFeeApr = (incentive: any) => {
	if (
		incentive.poolDayData.feesUSD === 0 ||
		(incentive.fullRangeLiquidityUSD === 0 && incentive.activeLiqudityUSD === 0)
	) {
		return <>0%</>
	}

	return (
		<>
			{(incentive.fullRangeLiquidityUSD > 0 &&
				(((incentive.poolDayData.feesUSD * 0.9 * 365) / incentive.fullRangeLiquidityUSD) * 100).toFixed(2)) ||
				0}
			% -{' '}
			{(incentive.activeLiqudityUSD > 0 &&
				(((incentive.poolDayData.feesUSD * 0.9 * 365) / incentive.activeLiqudityUSD) * 100).toFixed(2)) ||
				0}
			%
		</>
	)
}
