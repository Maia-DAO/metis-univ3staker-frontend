//@ts-nocheck
import check from '@/../public/check.svg'
import xIcon from '@/../public/x.svg'
import { MobileTable } from '@/components/Table/MobileTable'
import { renderFeeApr, renderRewardApr } from '@/components/Table/RenderApr'
import TokenImage from '@/components/Tokens/TokenImage'
import { TICK_WIDTH } from '@/config/constants/const'
import { IIncentive } from '@/types'
import { formatUSD } from '@/utils'
import Image from 'next/image'
import Link from 'next/link'
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
					<TokenImage address={pool.token0.id} className="z-10 h-8 w-8" />
					<TokenImage address={pool.token1.id} className="absolute left-6 top-0 h-8 w-8" />
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
			renderRewardApr(row)
		},
	},
	{
		Header: 'Fee APR',
		accessor: 'feeapr',
		Cell: ({ row: { original: row } }) => (
			<>
				<p className="text-right text-sm">{renderFeeApr(row)}</p>
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
