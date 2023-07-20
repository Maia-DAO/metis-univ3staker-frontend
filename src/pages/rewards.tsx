import { useUserStakedPositions } from '@/hooks'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'

const PositionsTable = dynamic(() => import('@/components/PositionsTable'), {
	ssr: false,
})

export const RewardsPage: NextPage = () => {
	const [data] = useUserStakedPositions()

	return (
		<div className="container max-w-screen-xl">
			<PositionsTable data={data} title="My Deposited Positions" />
		</div>
	)
}

export default RewardsPage
