//@ts-nocheck
import { TICK_WIDTH, YEAR } from '@/config/constants/const'
import { useWeb3 } from '@/hooks'
import { IIncentive } from '@/types'
import { formatBigInt, formatDateDiff, formatDateTimeShort, formatUSD } from '@/utils'
import Link from 'next/link'
import { useMemo } from 'react'
import { Button } from '../Button'
import { ConnectWallet } from '@/components'
import { Table } from '../Table'
import { ActionButtons } from './ActionButtons'
import Image from 'next/image'
import { TOKEN_ICONS } from '@/config'

interface IProps {
	data?: any[]
	title?: string
	incentive?: IIncentive
}

const staticColumns = [
	{
		Header: 'NFT',
		accessor: 'id',
		Cell: ({ value }: any) => <p className="text-md text-center">{value}</p>,
	},
	{
		Header: 'Duration',
		accessor: 'transaction',
		Cell: ({ value }: any) => <p className="text-md text-center">{formatDateDiff(value.timestamp * 1000)}</p>,
	},
]

const SingleIncentive: React.FC<IProps> = (props) => {
	const { incentive } = props
	if (!incentive) return <></>

	return (
		<>
			<div className="flex justify-between self-stretch">
				<div className="text-2xl text-white">Incentive</div>
				<Link
					target="_blank"
					href={
						'https://uni.maiadao.io/#/add/' +
						incentive.pool.token0.id +
						'/' +
						incentive.pool.token1.id +
						'/' +
						incentive.pool.feeTier
					}>
					<Button className="w-full">Add Liquidity</Button>
				</Link>
			</div>
			<div className="mb-8 w-full rounded-xl bg-dark-gunmetal p-4 text-white shadow-[0px_6px_14px_-3px_rgba(0,_0,_0,_0.25)]">
				<div className="overflow-x-auto">
					<table role="table" className="table-rounded-td-lg w-full border-separate border-spacing-y-4">
						<thead>
							<tr role="row">
								<th colSpan={1} role="columnheader" className="px-4 py-2">
									<div className="relative flex items-center justify-start gap-1">
										<div className="">
											<span className="flex justify-center font-normal text-blue-tiffany/60 hover:text-blue-tiffany/80">
												<span className="relative">Pool</span>
											</span>
										</div>
									</div>
								</th>
								<th colSpan={1} role="columnheader" className="px-4 py-2">
									<div className="relative flex items-center justify-center gap-1">
										<div className="block w-full">
											<span className="flex justify-center font-normal text-blue-tiffany/60 hover:text-blue-tiffany/80">
												<span className="relative">Duration</span>
											</span>
										</div>
									</div>
								</th>
								<th colSpan={1} role="columnheader" className="px-4 py-2">
									<div className="relative flex items-center justify-center gap-1">
										<div className="block w-full">
											<span className="flex justify-center font-normal text-blue-tiffany/60 hover:text-blue-tiffany/80">
												<span className="relative">Min. range</span>
											</span>
										</div>
									</div>
								</th>
								<th colSpan={1} role="columnheader" className="px-4 py-2">
									<div className="relative flex items-center justify-center gap-1">
										<div className="block w-full">
											<span className="flex justify-center font-normal text-blue-tiffany/60 hover:text-blue-tiffany/80">
												<span className="relative">TVL</span>
											</span>
										</div>
									</div>
								</th>
								<th colSpan={1} role="columnheader" className="px-4 py-2">
									<div className="relative flex items-center justify-center gap-1">
										<div className="block w-full">
											<span className="flex justify-center font-normal text-blue-tiffany/60 hover:text-blue-tiffany/80">
												<span className="relative">Reward APR</span>
											</span>
										</div>
									</div>
								</th>
							</tr>
						</thead>
						<tbody role="rowgroup">
							<tr role="row" className="h-16 rounded-lg">
								<td role="cell" className="bg-green-charleston pl-3 pr-4">
									<a className="flex w-full flex-row items-center gap-6">
										<div className="relative flex w-12 shrink-0 flex-col items-start">
											<Image
												src={TOKEN_ICONS[incentive.pool.token0.symbol]}
												alt="Token icon"
												width={32}
												height={32}
												className="z-10 h-8 w-8 rounded-full bg-dark-raisin"
											/>
											<Image
												src={TOKEN_ICONS[incentive.pool.token1.symbol]}
												alt="Token icon"
												width={32}
												height={32}
												className="absolute left-6 top-0 h-8 w-8 rounded-full bg-dark-raisin"
											/>
										</div>
										<p className="text-md hover:text-white/75">
											{incentive.pool.token0.symbol} / {incentive.pool.token1.symbol}
										</p>
									</a>
								</td>
								<td role="cell" className="bg-green-charleston pl-3 pr-4">
									<div>
										<p className="text-md flex justify-center gap-2">
											<span>{formatDateTimeShort(incentive.startTime * 1000)}</span> -
											<span>{formatDateTimeShort(incentive.endTime * 1000)}</span>
										</p>
									</div>
								</td>
								<td role="cell" className="bg-green-charleston pl-3 pr-4">
									<div className="text-center">
										<p className="text-md">±{incentive.minWidth * TICK_WIDTH}%</p>
										<p className="text-md">
											{incentive.minWidth} {incentive.minWidth == 1 ? 'Tick' : 'Ticks'}
										</p>
									</div>
								</td>
								<td role="cell" className="bg-green-charleston pl-3 pr-4">
									<p className="text-md text-center">{formatUSD(incentive.pool.totalValueLockedUSD)}</p>
								</td>
								<td role="cell" className="bg-green-charleston pl-3 pr-4">
									<p className="text-md text-center">
										{(incentive.tokenPriceUSD > 0 &&
											incentive.fullRangeLiquidityUSD > 0 &&
											(
												((formatBigInt(incentive.reward) * incentive.tokenPriceUSD) / incentive.fullRangeLiquidityUSD) *
												(YEAR / (incentive.endTime - incentive.startTime)) *
												100
											).toFixed(2)) ||
											0}
										% -{' '}
										{(incentive.tokenPriceUSD > 0 &&
											incentive.activeLiqudityUSD > 0 &&
											(
												((formatBigInt(incentive.reward) * incentive.tokenPriceUSD) / incentive.activeLiqudityUSD) *
												(YEAR / (incentive.endTime - incentive.startTime)) *
												100
											).toFixed(2)) ||
											0}
										%
									</p>
								</td>
							</tr>
						</tbody>
					</table>
				</div>
			</div>
		</>
	)
}

export const PositionsTable: React.FC<IProps> = ({ data, incentive = null, title = 'My Positions' }) => {
	const { account } = useWeb3()
	const columns = useMemo(
		() => [
			...staticColumns,
			{
				Header: 'Value',
				accessor: 'value',
				Cell: ({ row: { original: row } }: any) => <p className="text-md text-center">{formatUSD(row.valueUSD)}</p>,
			},
			{
				Header: 'Range',
				accessor: 'range',
				Cell: ({ row: { original: row } }: any) => (
					<>
						<p className="text-md text-center">
							{((row.tickUpper.tickIdx - row.tickLower.tickIdx) * TICK_WIDTH).toFixed(2)}%
						</p>
						<p className="text-md text-center">
							{row.tickUpper.tickIdx - row.tickLower.tickIdx}{' '}
							{row.tickUpper.tickIdx - row.tickLower.tickIdx == 1 ? 'Tick' : 'Ticks'}
						</p>
					</>
				),
			},
			{
				Header: 'Rewards',
				accessor: 'rewards',
				Cell: ({ row: { original: row } }: { row: { original: any; incentiveRewards: bigint } }) =>
					!!row.incentive && (
						<>
							<p className="text-md text-center">
								{!!row.incentiveRewards && row.incentive.tokenPriceUSD >= 0 ? (
									formatUSD(
										formatBigInt(row.incentiveRewards, row.incentive.rewardToken.decimals) *
											row.incentive.tokenPriceUSD,
									)
								) : (
									<></>
								)}
							</p>
							<p className="text-md flex justify-center gap-1">
								{!!row.incentiveRewards ? formatBigInt(row.incentiveRewards, row.incentive.rewardToken.decimals) : 0}
								<Image
									className="rounded-full bg-dark-raisin"
									src={TOKEN_ICONS[row.incentive.rewardToken.symbol]}
									alt={`${row.incentive.rewardToken.symbol.toString()} token`}
									width={18}
									height={18}
								/>
							</p>
						</>
					),
			},
			{
				Header: 'Stake APR',
				accessor: 'apr',
				Cell: ({ row: { original: row } }: { row: any }) =>
					!!row.incentive &&
					!!row.incentiveRewards &&
					row.incentive.tokenPriceUSD >= 0 && (
						<p className="text-md text-center">
							{(
								(((row.incentiveRewards / 10 ** row.incentive.rewardToken.decimals) * row.incentive.tokenPriceUSD) /
									row.valueUSD) *
								(YEAR /
									(new Date().getTime() / 1000 -
										row.stakedIncentives.find((i: any) => i.incentive.id === row.incentive.id).stakeTime)) *
								100
							).toFixed(2)}
							%
						</p>
					),
			},
			{
				Header: 'Manage Liquidity',
				accessor: 'manage',
				Cell: ({ row: { original } }: any) => (
					<div className="flex justify-center">
						<Link target="_blank" href={`https://uni.maiadao.io/#/pools/${original.id}`}>
							<Button>Manage Pool</Button>
						</Link>
					</div>
				),
			},
			{
				Header: '',
				accessor: 'stake',
				disableSortBy: true,
				Cell: ({ row: { original: row } }: any) =>
					incentive !== null && incentive.minWidth > row.tickUpper.tickIdx - row.tickLower.tickIdx ? (
						'Position range to low to stake'
					) : (
						<ActionButtons incentive={row.incentive ?? null} position={row} />
					),
			},
		],
		[incentive],
	)

	return (
		<div className="hidden w-full flex-col items-center justify-center gap-4 text-white sm:flex">
			{title && incentive && <SingleIncentive incentive={incentive} />}
			{account ? (
				<>
					<div className="flex justify-between self-stretch">
						<h1 className="text-left text-xl tracking-wider text-white sm:text-2xl sm:tracking-normal">{title}</h1>
					</div>
					<Table columns={columns} data={data || []} />
				</>
			) : (
				<>
					<p>Connect your wallet to view your positions</p>
					<ConnectWallet />
				</>
			)}
		</div>
	)
}

export default PositionsTable
