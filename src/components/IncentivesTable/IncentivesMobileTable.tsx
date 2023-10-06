//@ts-nocheck
import { MobileTable } from '@/components/Table/MobileTable'
import { IIncentive } from '@/types'
import Link from 'next/link'
import { TOKEN_ICONS } from '@/config'
import { TICK_WIDTH, YEAR } from '@/config/constants/const'
import { formatBigInt, formatUSD } from '@/utils'
import xIcon from '@/../public/x.svg'
import check from '@/../public/check.svg'
import Image from 'next/image'
import { Button } from '../Button'
interface IProps {
	data?: IIncentive[]
}

const columns = [
	{
		Header: '',
		accessor: 'pool',
		Cell: ({ value: pool, row: { original } }) => (
			<Link href={`/${original.id}`} className="flex w-full flex-row items-center gap-6">
				<div className="relative flex w-12 shrink-0 flex-col items-start">
					<Image
						src={TOKEN_ICONS[pool.token0.symbol]}
						alt="Token icon"
						width={32}
						height={32}
						className="z-10 h-8 w-8 rounded-full bg-dark-raisin"
					/>
					<Image
						src={TOKEN_ICONS[pool.token1.symbol]}
						alt="Token icon"
						width={32}
						height={32}
						className="absolute left-6 top-0 h-8 w-8 rounded-full bg-dark-raisin"
					/>
				</div>
				<p className="text-md hover:text-white/75">
					{pool.token0.symbol} / {pool.token1.symbol}
				</p>
			</Link>
		),
	},
	{
		Header: 'Min. range',
		accessor: 'minWidth',
		Cell: ({ row: { original: row } }) => (
			<div className="text-right">
				<p className="text-sm">{row.minWidth * TICK_WIDTH}%</p>
				<p className="text-sm">
					{row.minWidth} {row.minWidth == 1 ? 'Tick' : 'Ticks'}
				</p>
			</div>
		),
	},
	{
		Header: 'TVL',
		accessor: 'tvl',
		Cell: ({ row: { original: row } }) => (
			<p className="text-right text-sm">{formatUSD(row.pool.totalValueLockedUSD)}</p>
		),
	},
	{
		Header: 'Reward APR',
		accessor: 'rewardapr',
		Cell: ({ row: { original: row } }) => {
			const now = Date.now()
			return (
				<>
					<p className="text-md text-center">
						{now > row.endTime * 1000 ? (
							<>0%</>
						) : (
							<>
								{(row.tokenPriceUSD > 0 &&
									row.fullRangeLiquidityUSD > 0 &&
									(
										((formatBigInt(row.reward) * row.tokenPriceUSD) / row.fullRangeLiquidityUSD) *
										(YEAR / (row.endTime - row.startTime)) *
										100
									).toFixed(2)) ||
									0}
								% -{' '}
								{(row.tokenPriceUSD > 0 &&
									row.activeLiqudityUSD > 0 &&
									(
										((formatBigInt(row.reward) * row.tokenPriceUSD) / row.activeLiqudityUSD) *
										(YEAR / (row.endTime - row.startTime)) *
										100
									).toFixed(2)) ||
									0}
								%
							</>
						)}
					</p>
				</>
			)
		},
	},
	{
		Header: 'Fee APR',
		accessor: 'feeapr',
		Cell: ({ row: { original: row } }) => (
			<>
				<p className="text-right text-sm">
					{(row.poolDayData.feesUSD > 0 &&
						row.fullRangeLiquidityUSD > 0 &&
						(((row.poolDayData.feesUSD * 0.9 * 365) / row.fullRangeLiquidityUSD) * 100).toFixed(2)) ||
						0}
					% -{' '}
					{(row.poolDayData.feesUSD > 0 &&
						row.activeLiqudityUSD > 0 &&
						(((row.poolDayData.feesUSD * 0.9 * 365) / row.activeLiqudityUSD) * 100).toFixed(2)) ||
						0}
					%
				</p>
			</>
		),
	},
	{
		Header: 'Status',
		accessor: 'status',
		Cell: ({ row: { original: row } }) => {
			const now = Date.now()
			if (now < row.startTime * 1000) {
				return <p className="text-right text-sm">Upcoming</p>
			}
			if (now > row.endTime * 1000) {
				return (
					<div className="flex items-center justify-center">
						<Image src={xIcon} alt="X icon" width={22} height={23} />
					</div>
				)
			}
			return (
				<div className="flex items-center justify-center">
					<Image src={check} alt="Check icon" width={22} height={15} />
				</div>
			)
		},
	},
	{
		Header: '',
		accessor: 'link',
		disabledSorting: true,
		Cell: ({ row: { original } }) => (
			<Link className="mt-2 w-full" href={`/${original.id}`}>
				<Button className="group w-full" format="big">
					<span className="text-md font-medium leading-tight">Stake</span>
				</Button>
			</Link>
		),
	},
]

export const IncentivesTableMobile: React.FC<IProps> = ({ data }) => {
	return (
		<div className="flex w-full flex-col justify-center gap-4 text-white">
			<h5 className="text-left text-xl tracking-wider text-white sm:text-2xl sm:tracking-normal">Incentives</h5>
			<MobileTable columns={columns} data={data || []} showFilterButton={true} />
		</div>
	)
}
