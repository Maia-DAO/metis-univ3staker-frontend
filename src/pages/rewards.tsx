import { useUserStakedPositions } from '@/hooks'
import { NextPage } from 'next'
import dynamic from 'next/dynamic'

const PositionsTable = dynamic(() => import('@/components/PositionsTable'), {
	ssr: false,
})

const PositionMobileTable = dynamic(() => import('@/components/PositionsTable/PositionsMobileTable'), {
	ssr: false,
})

export const RewardsPage: NextPage = () => {
	const [data] = useUserStakedPositions()

	console.log('data', data)

	return (
		<>
			<PositionsTable data={data} title="My Deposited Positions" />
			<PositionMobileTable data={data} title="My Deposited Positions" />
		</>
	)
}

export default RewardsPage
