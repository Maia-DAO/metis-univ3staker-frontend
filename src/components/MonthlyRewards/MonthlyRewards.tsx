import Image from 'next/image'

import { IIncentive, PoolDayData } from '@/types'
import { formatBigInt, formatUSD } from '@/utils'
import { TOKEN_ICONS } from '@/config'

type IncentiveWithDayData = IIncentive & {
	poolDayData?: PoolDayData
}

interface IProps {
	data?: IncentiveWithDayData[]
}

const MonthlyRewards: React.FC<IProps> = ({ data }) => {
	return (
		<div className="flex flex-col items-start gap-14 sm:mb-8">
			<h2 className="text-left text-xl tracking-wider text-white sm:text-2xl sm:tracking-normal">
				Monthly Rewards And Fees
			</h2>
			<div className="mb-5 flex flex-row flex-wrap items-center justify-evenly gap-y-12 self-stretch sm:flex-nowrap sm:gap-[26px] lg:justify-start">
				{data?.map((item, idx) => {
					if (Date.now() > item.endTime * 1000) {
						return null
					}

					return (
						<div key={idx} className="relative flex h-[90px] w-full max-w-[300px] flex-col items-start">
							<div className="relative flex h-full w-full flex-col items-start justify-center gap-3 rounded-lg bg-dark-gunmetal px-5 py-4 shadow-[0px_6px_14px_-3px_rgba(0,_0,_0,_0.25)]">
								<div className="ml-px text-lg leading-[1] text-white">
									{item.pool.token0.symbol} / {item.pool.token1.symbol}
								</div>
								<div className="mr-1 flex flex-row items-center gap-1 self-stretch">
									<div className="mr-1 text-sm text-blue-tiffany">Rewards</div>
									<div className="whitespace-nowrap text-sm text-white">
										{formatBigInt(item.reward, {
											decimals: item.rewardToken.decimals,
											precision: 0,
										})}
									</div>

									<Image
										className="rounded-full bg-dark-raisin"
										alt="Metis token image"
										src={TOKEN_ICONS[item.rewardToken.symbol]}
										width={25}
										height={25}
									/>
									<div className="ml-auto mr-1 text-sm text-blue-tiffany">
										Fees <div className="contents text-xs">(24h)</div>
									</div>
									<div className="whitespace-nowrap text-sm text-white">
										{formatUSD(item.poolDayData?.feesUSD * 0.9)}
									</div>
								</div>
							</div>
							<Image
								alt="Token image"
								src={TOKEN_ICONS[item.pool.token0.symbol]}
								width={38}
								height={38}
								className="absolute -top-[30px] left-[28px] z-[1] h-[38px] w-[38px] rounded-full bg-dark-raisin"
							/>
							<Image
								alt="Token image"
								src={TOKEN_ICONS[item.pool.token1.symbol]}
								width={38}
								height={38}
								className="absolute -top-[30px] left-[56px] h-[38px] w-[38px] rounded-full bg-dark-raisin"
							/>
						</div>
					)
				})}
			</div>
		</div>
	)
}

export default MonthlyRewards
