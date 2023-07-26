import RewardsWarning from '@/components/RewardsWarning/RewardsWarning'
import { wagmiClient } from '@/config'
import { useUniswapClient } from '@/hooks/web3'
import '@/styles/globals.scss'
import { CHAINS } from '@/types'
import { ApolloProvider } from '@apollo/client'
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit'
import '@rainbow-me/rainbowkit/styles.css'
import type { AppProps } from 'next/app'
import dynamic from 'next/dynamic'
import { PropsWithChildren } from 'react'
import { WagmiConfig } from 'wagmi'

import coin from '../../public/coin.png'

const Header = dynamic(() => import('@/components/Header'), { ssr: false })

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
	const client = useUniswapClient()
	return (
		<ApolloProvider client={client}>
			<Header />
			<RewardsWarning />
			<main className="flex flex-col items-center pb-16 pt-8 lg:py-12">
				<div className="container max-w-screen-xl px-4 xl:px-0">{children}</div>
				<div
					className={`absolute left-0 top-[calc(95vh)] -z-10 h-[286px] w-[336px] -translate-y-full bg-center bg-no-repeat opacity-90 mix-blend-lighten`}
					style={{ backgroundImage: `url(${coin.src})` }}
				/>
			</main>
		</ApolloProvider>
	)
}

export default function App({ Component, pageProps }: AppProps) {
	return (
		<WagmiConfig config={wagmiClient}>
			<RainbowKitProvider chains={CHAINS} showRecentTransactions theme={darkTheme()}>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</RainbowKitProvider>
		</WagmiConfig>
	)
}
