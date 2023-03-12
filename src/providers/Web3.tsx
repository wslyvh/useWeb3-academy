import { configureChains, createClient, WagmiConfig } from 'wagmi'
import { publicProvider } from 'wagmi/providers/public'
import { jsonRpcProvider } from '@wagmi/core/providers/jsonRpc'
import { infuraProvider } from '@wagmi/core/providers/infura'
import { alchemyProvider } from '@wagmi/core/providers/alchemy'
import { ConnectKitProvider, getDefaultClient } from 'connectkit'
import { ETH_CHAINS, SITE_NAME } from 'utils/config'
import { useColorMode } from '@chakra-ui/react'
import { ReactNode } from 'react'

interface Props {
  children: ReactNode
}

const providers = [
  jsonRpcProvider({
    rpc: (chain) => {
      if (chain.id === 10) {
        return {
          http: 'https://optimism-mainnet.public.blastapi.io',
        }
      }

      return null
    },
  }),
  publicProvider(),
]

if (process.env.NEXT_PUBLIC_INFURA_KEY) {
  providers.push(infuraProvider({ apiKey: process.env.NEXT_PUBLIC_INFURA_KEY }))
}
if (process.env.NEXT_PUBLIC_ALCHEMY_KEY) {
  providers.push(alchemyProvider({ apiKey: process.env.NEXT_PUBLIC_ALCHEMY_KEY }))
}

const { provider, webSocketProvider } = configureChains(ETH_CHAINS, providers)

const client = createClient(
  getDefaultClient({
    appName: SITE_NAME,
    autoConnect: true,
    chains: ETH_CHAINS,
    provider,
    webSocketProvider,
  })
)

export function Web3Provider(props: Props) {
  const { colorMode } = useColorMode()

  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider mode={colorMode}>{props.children}</ConnectKitProvider>
    </WagmiConfig>
  )
}
