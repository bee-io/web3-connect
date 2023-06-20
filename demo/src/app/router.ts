export interface RouterList {
  pages: Array<{
    name: string;

    children: Array<{
      path: string;
      label: string;
      hidden: boolean;
      description: string;
    }>;

  }>;
}

export const ROUTER_LIST: RouterList = {
  pages: [
    {
      name: 'Overview',
      children: [
        {
          path: "docs/introduction",
          label: "Introduction",
          hidden: false,
          description: "Easy way to connect users to Decentralized Applications.",
        },
      ]
    },
    {
      name: 'Getting Started',
      children: [
        {
          path: "docs/installation",
          label: "Installation",
          hidden: false,
          description: "Get up and running with Web3-Connect.",
        },
        // {
        //   path: "docs/core",
        //   label: "Core",
        //   hidden: false,
        //   description: "This is the core package.",
        // },
        {
          path: "docs/theming",
          label: "Theming",
          hidden: false,
          description: "To customize the color theme of web3-connect and match it with your dApp",
        },
        {
          path: "docs/custom-styling",
          label: "Custom Styling",
          hidden: false,
          description: "You can customize web3-connect to match the look and feel of your dApp. web3-connect exposes css variables for each of its UI components.",
        },
      ]
    },
    {
      name: 'Wallets',
      children: [
        {
          path: "docs/wallets/injected",
          label: "Injected Wallets",
          hidden: false,
          description: "Wallet module for connecting Injected Wallets to web3-connect",
        },
        {
          path: "docs/wallets/coinbase",
          label: "Coinbase",
          hidden: false,
          description: "Wallet module for connecting Coinbase Wallet SDK to web3-connect",
        },
        {
          path: "docs/wallets/fortmatic",
          label: "Fortmatic",
          hidden: false,
          description: "Wallet module for connecting Fortmatic wallets to web3-connect",
        },
        {
          path: "docs/wallets/infinity-wallet",
          label: "Infinity Wallet",
          hidden: false,
          description: "Wallet module for connecting Infinity Wallet through web3-connect",
        },
        {
          path: "docs/wallets/wallet-connect",
          label: "WalletConnect",
          hidden: false,
          description: "Wallet module for connecting WalletConnect to web3-connect, currently supporting both v1 and v2.",
        },
        {
          path: "docs/wallets/ledger",
          label: "Ledger",
          hidden: false,
          description: "Wallet module for connecting Ledger hardware wallets to web3-connect",
        },
        {
          path: "docs/wallets/taho",
          label: "Taho (previously Tally Ho)",
          hidden: false,
          description: "Wallet module for connecting Taho (wallet previously named Tally Ho)",
        },
        {
          path: "docs/wallets/xdefi",
          label: "XDEFI",
          hidden: false,
          description: "Wallet module for connecting XDEFI to web3-connect",
        },
        {
          path: "docs/wallets/portis",
          label: "Portis",
          hidden: false,
          description: "Wallet module for connecting Portis wallet to web3-connect",
        },
        {
          path: "docs/wallets/sequence",
          label: "Sequence",
          hidden: false,
          description: "Wallet module for connecting Sequence wallet to web3-connect",
        },
        {
          path: "docs/wallets/trust",
          label: "Trust",
          hidden: false,
          description: "Wallet module for connecting Trust wallet to web3-connect",
        },
        {
          path: "docs/wallets/code-store",
          label: "code.store",
          hidden: false,
          description: "CEX Wallet module for connecting cede.store through web3-connect",
        },
      ]
    },
    {
      name: 'Resources',
      children: [
        {
          path: "docs/troubleshooting",
          label: "Troubleshooting",
          hidden: false,
          description: "Troubleshooting in web3-connect",
        },
      ]
    }



  //   {
  //   path: "/docs/popover",
  //   label: "Popover",
  //   order: 1,
  //   hidden: false,
  //   description: "Easy way to connect users to Decentralized Applications.",
  // },
]
};
