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
  },
  //   {
  //   path: "docs/contribution-guide",
  //   label: "Contribution Guide",
  //   order: 1,
  //   hidden: false,
  //   description: "How can I contribute to Web3-Connect",
  // }
]
};
export const DEMO_ROUTES = [
  // {'path': 'components/affix', 'loadChildren': () => import('./affix/index.module').then(m => m.NzDemoAffixModule)},
];
