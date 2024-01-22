// @ts-nocheck
import chevronDown from '@/../public/chevron.svg'
import xIcon from '@/../public/x.svg'
import TokenImage from '@/components/Tokens/TokenImage'
import { TICK_WIDTH, YEAR } from '@/config/constants/const'
import { IIncentive } from '@/types'
import { formatBigInt, formatUSD } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
import check from '../../../public/check.svg'
import { Button } from '../Button'
import { Table } from '../Table'

interface IProps {
	data?: IIncentive[]
}

const columns = [
	{
		Header: 'Pool',
		accessor: 'pool',
		Cell: ({ value: pool, row: { original } }) => (
			<Link href={`/${original.id}`} className="flex w-full flex-row items-center gap-6">
				<div className="relative flex w-12 shrink-0 flex-col items-start">
					<TokenImage key={pool.token0.id} address={pool.token0.id} className="z-10 h-8 w-8" />
					<TokenImage key={pool.token1.id} address={pool.token1.id} className="absolute left-6 top-0 h-8 w-8" />
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
			<div className="text-center">
				<p className="text-md">{row.minWidth * TICK_WIDTH}%</p>
				<p className="text-md">
					{row.minWidth} {row.minWidth == 1 ? 'Tick' : 'Ticks'}
				</p>
			</div>
		),
	},
	{
		Header: 'TVL',
		accessor: 'tvl',
		Cell: ({ row: { original: row } }) => (
			<p className="text-md text-center">{formatUSD(row.pool.totalValueLockedUSD)}</p>
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
				<p className="text-md text-center">
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
				return <p className="text-md text-center">Upcoming</p>
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
			<Link href={`/${original.id}`}>
				<Button className="group">
					<span className="text-md leading-tight">Stake</span>
					<Image
						className="duration-75 group-hover:translate-x-0.5"
						src={chevronDown}
						alt="Chevron right"
						height={16}
						width={16}
					/>
				</Button>
			</Link>
		),
	},
]

export const IncentivesTable: React.FC<IProps> = ({ data }) => {
	return (
		<div className="flex w-full flex-col justify-center gap-4 text-white">
			<h5 className="text-left text-2xl text-white">Incentives</h5>
			<Table columns={columns} data={data || []} showFilterButton={true} />
		</div>
	)
}

export default IncentivesTable
