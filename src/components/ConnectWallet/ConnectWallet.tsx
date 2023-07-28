import { ConnectButton } from '@rainbow-me/rainbowkit'
import Image from 'next/image'
import { Button } from '@/components'
import metis from '@/../public/tokens/metis-2.svg'
import chevron from '@/../public/chevron.svg'

export const ConnectWallet = () => {
	return (
		<ConnectButton.Custom>
			{({ account, chain, openAccountModal, openChainModal, openConnectModal, authenticationStatus, mounted }) => {
				const ready = mounted && authenticationStatus !== 'loading'
				const connected =
					ready && account && chain && (!authenticationStatus || authenticationStatus === 'authenticated')
				return (
					<div
						{...(!ready && {
							'aria-hidden': true,
							className: 'opacity-0 pointer-events-none user-select-none',
						})}>
						{(() => {
							if (!connected) {
								return (
									<Button format="big" onClick={openConnectModal} type="button">
										Connect
									</Button>
								)
							}
							if (chain.unsupported) {
								return (
									<Button format="big" onClick={openChainModal} type="button">
										Wrong network
									</Button>
								)
							}
							return (
								<div className="bg-green-charleston rounded-3xl text-white text-sm font-medium py-1.5 px-3 border-blue-tiffany/30 border-[1px] hover:border-blue-tiffany/80 flex gap-3">
									<button onClick={openChainModal} className="flex items-center" type="button">
										<div className="flex items-center gap-1.5 justify-center relative mr-1">
											<Image
												className="bg-dark-raisin rounded-full"
												alt="Metis Icon"
												src={metis}
												width={26}
												height={26}
											/>
											<Image className="rotate-90" alt="Chevron Icon" src={chevron} width={13} height={13} />
										</div>
									</button>
									<button onClick={openAccountModal} type="button">
										{account.displayName}
									</button>
								</div>
							)
						})()}
					</div>
				)
			}}
		</ConnectButton.Custom>
	)
}
