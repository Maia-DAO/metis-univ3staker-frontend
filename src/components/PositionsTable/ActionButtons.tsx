import { useClaimRewards, useDepositStake, useStake, useUnstake, useWithdraw } from '@/hooks'
import { IIncentive, IPosition, Incentiveish } from '@/types'
import { useMemo } from 'react'
import { Button } from '../Button'

interface IProps {
	incentive?: IIncentive
	position: IPosition
	className?: string
	format?: 'big'
}

export const ActionButtons: React.FC<IProps> = ({ position, incentive, className, format }) => {
	const unstakeInput = useMemo(
		() =>
			!!incentive
				? incentive
				: (position.stakedIncentives.map((i: any) => i.incentive).filter(Boolean) as Incentiveish[]),
		[incentive, position.stakedIncentives],
	)
	const onUnstake = useUnstake(unstakeInput)
	const onClaim = useClaimRewards(unstakeInput)
	const onDepositStake = useDepositStake(incentive)
	const onStake = useStake(incentive)
	const onWithdraw = useWithdraw()
	const hasExpired = incentive?.endTime * 1000 <= Date.now()

	const isStakedInIncentive = position.stakedIncentives.find((i: any) => i.incentive?.id === incentive?.id)

	return (
		<div className={className ?? 'flex justify-center gap-4'}>
			{isStakedInIncentive ? (
				<>
					<Button format={format} onClick={() => onClaim(position.id)}>
						Claim
					</Button>
					<Button format={format} onClick={() => onUnstake(position.id)}>
						Unstake & Claim
					</Button>
				</>
			) : position.deposited ? (
				<>
					{hasExpired || (!!incentive && <Button onClick={() => onStake(position.id)}>Stake</Button>)}
					<Button format={format} onClick={() => onWithdraw(position.id)}>
						Withdraw
					</Button>
				</>
			) : hasExpired ? (
				<p>The incentive has ended</p>
			) : (
				<Button format={format} onClick={() => onDepositStake(position.id)}>
					Stake
				</Button>
			)}
		</div>
	)
}

export default ActionButtons
