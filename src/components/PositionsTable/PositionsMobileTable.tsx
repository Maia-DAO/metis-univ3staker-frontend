//@ts-nocheck
import { useWeb3 } from '@/hooks'
import { useMemo } from 'react'
import { formatBigInt, formatDateDiff, formatDateTimeShort, formatUSD } from '@/utils'
import { TICK_WIDTH, YEAR } from '@/config/constants/const'
import Image from 'next/image'
import { TOKEN_ICONS } from '@/config'
import Link from 'next/link'
import { Button, ConnectWallet } from '@/components'
import { IIncentive } from '@/types'
import { ActionButtons } from './ActionButtons'
import { MobileTable } from '@/components/Table/MobileTable'

const staticColumns = [
	{
		Header: 'NFT',
		accessor: 'id',
		Cell: ({ value }: any) => <p className="text-center text-sm">{value}</p>,
	},
	{
		Header: 'Duration',
		accessor: 'transaction',
		Cell: ({ value }: any) => <p className="text-center text-sm">{formatDateDiff(value.timestamp * 1000)}</p>,
	},
]

interface IProps {
	data?: any[]
	title?: string
	incentive?: IIncentive
}

const renderRewardApr = (incentive: IIncentive) => {
	const now = Date.now()
	if (now > incentive.endTime * 1000) {
		return <>0%</>
	}

	return (
		<>
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
		</>
	)
}

const SingleMobileIncentive: React.FC<IProps> = ({ incentive }) => {
	if (!incentive) return <></>

	return (
		<div className="flex w-full flex-col items-center justify-center gap-4 text-white sm:hidden">
			<div className="flex justify-between self-stretch">
				<h1 className="text-left text-xl tracking-wider text-white sm:text-2xl sm:tracking-normal">Incentive</h1>
				<Link
					target="_blank"
					href={
						'https://v3.maiadao.io/#/add/' +
						incentive.pool.token0.id +
						'/' +
						incentive.pool.token1.id +
						'/' +
						incentive.pool.feeTier
					}>
					<Button className="w-full">Add Liquidity</Button>
				</Link>
			</div>
			<div className="w-full rounded-xl bg-dark-gunmetal p-4 text-white shadow-[0px_6px_14px_-3px_rgba(0,_0,_0,_0.25)]">
				<div className="flex w-full flex-col gap-4">
					<div className="flex flex-col gap-3 rounded-lg bg-green-charleston px-3 pb-2 pt-4">
						<div className="flex justify-between">
							<div className="flex w-full flex-row items-center gap-6">
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
							</div>
						</div>
						<div className="flex justify-between">
							<span className="text-sm text-blue-tiffany/80">Duration</span>
							<p className="flex flex-col gap-0.5 text-right text-sm">
								<span>{formatDateTimeShort(incentive.startTime * 1000)}</span>
								<span>{formatDateTimeShort(incentive.endTime * 1000)}</span>
							</p>
						</div>
						<div className="flex justify-between">
							<span className="text-sm text-blue-tiffany/80">Min. range</span>
							<div className="flex flex-col items-end">
								<p className="text-sm">±{incentive.minWidth * TICK_WIDTH}%</p>
								<p className="text-sm">
									{incentive.minWidth} {incentive.minWidth == 1 ? 'Tick' : 'Ticks'}
								</p>
							</div>
						</div>
						<div className="flex justify-between">
							<span className="text-sm text-blue-tiffany/80">TVL</span>
							<p className="text-center text-sm">{formatUSD(incentive.pool.totalValueLockedUSD)}</p>
						</div>
						<div className="flex justify-between">
							<span className="text-sm text-blue-tiffany/80">Reward APR</span>
							<p className="text-center text-sm">{renderRewardApr(incentive)}</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	)
}

const PositionsMobileTable: React.FC<IProps> = ({ data, incentive = null, title = 'My Positions' }) => {
	const { account } = useWeb3()
	const columns = useMemo(
		() => [
			{
				Header: '',
				accessor: 'manage',
				Cell: ({ row: { original } }: any) => (
					<div className="flex w-full">
						<Link target="_blank" href={`https://v3.maiadao.io/#/pools/${original.id}`}>
							<Button>Manage Pool</Button>
						</Link>
					</div>
				),
			},
			...staticColumns,
			{
				Header: 'Value',
				accessor: 'value',
				Cell: ({ row: { original: row } }: any) => <p className="text-center text-sm">{formatUSD(row.valueUSD)}</p>,
			},
			{
				Header: 'Range',
				accessor: 'range',
				Cell: ({ row: { original: row } }: any) => (
					<div className="flex flex-col">
						<p className="text-right text-sm">
							{((row.tickUpper.tickIdx - row.tickLower.tickIdx) * TICK_WIDTH).toFixed(2)}%
						</p>
						<p className="text-right text-sm">
							{row.tickUpper.tickIdx - row.tickLower.tickIdx}{' '}
							{row.tickUpper.tickIdx - row.tickLower.tickIdx == 1 ? 'Tick' : 'Ticks'}
						</p>
					</div>
				),
			},
			{
				Header: 'Rewards',
				accessor: 'rewards',
				Cell: ({ row: { original: row } }: { row: { original: any; incentiveRewards: bigint } }) =>
					!!row.incentive && (
						<div className="flex flex-col justify-end gap-1 text-sm">
							<p className="text-right">
								{!!row.incentiveRewards && row.incentive.tokenPriceUSD >= 0 ? (
									formatUSD(
										parseInt(formatBigInt(row.incentiveRewards, row.incentive.rewardToken.decimals)) *
											row.incentive.tokenPriceUSD,
									)
								) : (
									<></>
								)}
							</p>
							<p className="flex justify-end gap-1">
								{!!row.incentiveRewards ? formatBigInt(row.incentiveRewards, row.incentive.rewardToken.decimals) : 0}
								<Image
									className="rounded-full bg-dark-raisin"
									src={TOKEN_ICONS[row.incentive.rewardToken.symbol]}
									alt={`${row.incentive.rewardToken.symbol.toString()} token`}
									width={20}
									height={20}
								/>
							</p>
						</div>
					),
			},
			{
				Header: 'Stake APR',
				accessor: 'apr',
				Cell: ({ row: { original: row } }: { row: any }) =>
					!!row.incentive &&
					!!row.incentiveRewards &&
					row.incentive.tokenPriceUSD >= 0 && (
						<p className="text-center text-sm">
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
				Header: '',
				accessor: 'stake',
				disableSortBy: true,
				Cell: ({ row: { original: row } }: any) =>
					incentive !== null && incentive.minWidth > row.tickUpper.tickIdx - row.tickLower.tickIdx ? (
						'Position range to low to stake'
					) : (
						<ActionButtons
							format="big"
							className="mt-4 flex w-full flex-col gap-2"
							incentive={row.incentive ?? null}
							position={row}
						/>
					),
			},
		],
		[incentive],
	)

	return (
		<div className="flex w-full flex-col items-center justify-center gap-4 text-white sm:hidden">
			{title && incentive && <SingleMobileIncentive incentive={incentive} />}
			{account ? (
				<>
					<div className="flex justify-between self-stretch">
						<h1 className="mt-3 text-left text-xl tracking-wider text-white sm:text-2xl sm:tracking-normal">{title}</h1>
					</div>
					<MobileTable columns={columns} data={data || []} />
				</>
			) : (
				<>
					<p className="text-center">Connect your wallet to view your positions</p>
					<ConnectWallet />
				</>
			)}
		</div>
	)
}

export default PositionsMobileTable
