export interface RouterList {
  intro: Array<{
    path: string;
    label: string;
    order: number;
    hidden: boolean;
    description: string;
  }>;
}

export const ROUTER_LIST: RouterList = {
  intro: [
  {
    path: "docs/introduction",
    label: "Introduction",
    order: 0,
    hidden: false,
    description: "Easy way to connect users to Decentralized Applications.",
  }, {
    path: "docs/installation",
    label: "Installation",
    order: 1,
    hidden: false,
    description: "Get up and running with Web3-Connect.",
  }, {
    path: "docs/theming",
    label: "Theming",
    order: 2,
    hidden: false,
    description: "To customize the color theme of web3-connect and match it with your dApp",
  }, {
    path: "docs/custom-styling",
    label: "Custom Styling",
    order: 3,
    hidden: false,
    description: "You can customize web3-connect to match the look and feel of your dApp. web3-connect exposes css variables for each of its UI components.",
  },
  //   {
  //   path: "/docs/popover",
  //   label: "Popover",
  //   order: 1,
  //   hidden: false,
  //   description: "Easy way to connect users to Decentralized Applications.",
  // },
]
};
