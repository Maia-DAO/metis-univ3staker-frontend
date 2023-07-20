import { ConnectButton } from '@rainbow-me/rainbowkit'
import Image from 'next/image'
import { Button } from '@/components'
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
							style: {
								opacity: 0,
								pointerEvents: 'none',
								userSelect: 'none',
							},
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
								<div style={{ display: 'flex', gap: 12 }}>
									<button onClick={openChainModal} style={{ display: 'flex', alignItems: 'center' }} type="button">
										{chain.hasIcon && (
											<div
												style={{
													background: chain.iconBackground,
													width: 12,
													height: 12,
													borderRadius: 999,
													overflow: 'hidden',
													marginRight: 4,
												}}>
												{chain.iconUrl && (
													<Image
														alt={chain.name ?? 'Chain icon'}
														src={chain.iconUrl}
														style={{ width: 12, height: 12 }}
													/>
												)}
											</div>
										)}
										{chain.name}
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
