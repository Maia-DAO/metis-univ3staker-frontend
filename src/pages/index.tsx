import { IncentivesTable } from '@/components'
import { useIncentives } from '@/hooks'
import MonthlyRewards from '@/components/MonthlyRewards/MonthlyRewards'

export default function Home() {
	const [data] = useIncentives()
	return (
		<div className="container max-w-screen-xl">
			<MonthlyRewards data={data} />
			<IncentivesTable data={data} />
		</div>
	)
}
