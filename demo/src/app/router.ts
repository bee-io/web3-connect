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
    {
    path: "/docs/popover",
    label: "Popover",
    order: 1,
    hidden: false,
    description: "Easy way to connect users to Decentralized Applications.",
  },
]
};
