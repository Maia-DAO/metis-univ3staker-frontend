
export type NavItem = {
  title: string;
  href?: string;
  subItems?: NavItem[];
}

export const NAV_ITEMS: NavItem[] = [
  {
    title: "Incentives",
    href: "/",
  },
  {
    title: "Positions",
    href: "/rewards",
  },
  {
    title: "More",
    href: "/",
    subItems: [
      {
        title: "Relevant links",
        href: "https://linktr.ee/maiadao",
      },
      {
        title: "Trade on UniMaia",
        href: "https://uni.maiadao.io/#/swap",
      },
      {
        title: "Trade on Hermes",
        href: "https://hermes.maiadao.io/",
      },
      {
        title: "Stake on Maia",
        href: "https://maiadao.io/",
      }
    ]
  }
];
/*
    <nav className="flex px-8 gap-12 text-white">
          <a href="https://linktr.ee/maiadao" color="#ffffff">
            Relevant Links
          </a>
          <Link href="https://uni.maiadao.io/#/swap">Trade on UniMaia</Link>
          <Link href="https://hermes.maiadao.io/">Trade on Hermes</Link>
          <Link href="https://maiadao.io/">Stake on Maia</Link>
        </nav>
* */