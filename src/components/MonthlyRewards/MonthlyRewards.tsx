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
		<div className="flex flex-col mb-8 gap-14 items-start">
			<div className="text-2xl text-white">Monthly Rewards And Fees</div>
			<div className="self-stretch flex flex-row justify-between items-center mb-5">
				{data?.map((item, idx) => (
					<div key={idx} className="relative flex flex-col items-start w-full max-w-[300px] h-[90px]">
						<div className="w-full shadow-[0px_6px_14px_-3px_rgba(0,_0,_0,_0.25)] py-4 h-full bg-dark-gunmetal relative flex flex-col justify-center gap-3 items-start px-5 rounded-lg">
							<div className="text-lg text-white ml-px leading-[1]">
								{item.pool.token0.symbol} / {item.pool.token1.symbol}
							</div>
							<div className="self-stretch flex flex-row mr-1 gap-1 items-center">
								<div className="text-sm text-blue-tiffany mr-1">Rewards</div>
								<div className="whitespace-nowrap text-sm text-white">
									{formatBigInt(item.reward, {
										decimals: item.rewardToken.decimals,
										precision: 0,
									})}
								</div>

								<Image alt="Metis token image" src={TOKEN_ICONS[item.rewardToken.symbol]} width={25} height={25} />
								<div className="text-sm text-blue-tiffany ml-auto mr-1">
									Fees <div className="text-xs contents">(24h)</div>
								</div>
								<div className="whitespace-nowrap text-sm text-white">{formatUSD(item.poolDayData?.feesUSD * 0.9)}</div>
							</div>
						</div>
						<Image
							alt="Token image"
							src={TOKEN_ICONS[item.pool.token0.symbol]}
							width={38}
							height={38}
							className="w-[38px] h-[38px] absolute bg-[#262626] rounded-full -top-[30px] z-[1] left-[28px]"
						/>
						<Image
							alt="Token image"
							src={TOKEN_ICONS[item.pool.token1.symbol]}
							width={38}
							height={38}
							className="w-[38px] h-[38px] absolute bg-[#262626] rounded-full -top-[30px] left-[56px]"
						/>
					</div>
				))}
			</div>
		</div>
	)
}

export default MonthlyRewards
