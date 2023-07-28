import { IncentivesTable, IncentivesTableMobile } from '@/components'
import { useIncentives } from '@/hooks'
import MonthlyRewards from '@/components/MonthlyRewards/MonthlyRewards'

export default function Home() {
	const [data] = useIncentives()
	return (
		<>
			<MonthlyRewards data={data} />
			<div className="hidden lg:block">
				<IncentivesTable data={data} />
			</div>

			<div className="lg:hidden">
				<IncentivesTableMobile data={data} />
			</div>
		</>
	)
}
