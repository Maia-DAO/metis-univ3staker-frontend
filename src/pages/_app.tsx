//import Footer from "@/components/Footer/Footer";
import RewardsWarning from "@/components/RewardsWarning/RewardsWarning";
import { wagmiClient } from "@/config";
import { useUniswapClient } from "@/hooks/web3";
import "@/styles/globals.css";
import { CHAINS } from "@/types";
import { ApolloProvider } from "@apollo/client";
import { RainbowKitProvider, darkTheme } from "@rainbow-me/rainbowkit";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import dynamic from "next/dynamic";
import { PropsWithChildren } from "react";
import { WagmiConfig } from "wagmi";
import Image from "next/image";

import coin from '../../public/coin.png';

const Header = dynamic(() => import("@/components/Header"), { ssr: false });

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  const client = useUniswapClient();
  return (
    <ApolloProvider client={client}>
      <Header />
      <RewardsWarning />
      <main className="flex flex-col items-center py-12">
        {children}
        <div className={`w-[336px] h-[286px] bg-[#D3D3D3 / 50] bg-center bg-no-repeat opacity-90 absolute left-0 bottom-8 -z-10 mix-blend-lighten`} style={{backgroundImage: `url(${coin.src})`}} />
      </main>
      {/*<Footer />*/}
    </ApolloProvider>
  );
};

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiClient}>
      <RainbowKitProvider
        chains={CHAINS}
        showRecentTransactions
        theme={darkTheme()}
      >
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
