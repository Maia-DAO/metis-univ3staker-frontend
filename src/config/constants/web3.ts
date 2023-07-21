import { ChainID, CHAINS } from "@/types";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  coinbaseWallet,
  injectedWallet,
  metaMaskWallet,
  rabbyWallet,
  rainbowWallet,
  walletConnectWallet
} from '@rainbow-me/rainbowkit/wallets';
import { configureChains, createConfig } from "wagmi";
import { metis } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";
const { chains, publicClient, webSocketPublicClient } = configureChains(
  CHAINS,
  [publicProvider()]
);

// const { connectors } = getDefaultWallets({
//   appName: "",
//   // projectId: "YOUR_PROJECT_ID",
//   chains: chains,
// });

const appName= "Unimaia Staker"
const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      metaMaskWallet({ chains }),
      rainbowWallet({  chains }),
      rabbyWallet({ chains }),
      coinbaseWallet({appName, chains}),
      walletConnectWallet({  chains }),
      injectedWallet({ chains })
    ],
  },
]);

export const wagmiClient = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
  connectors,
});

export const DEFAULT_CHAIN_ID = ChainID.METIS;
export const DEFAULT_CHAIN = metis;
