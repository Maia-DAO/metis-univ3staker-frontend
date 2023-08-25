export type NavItem = {
	title: string
	href?: string
	subItems?: NavItem[]
}

export const NAV_ITEMS: NavItem[] = [
	{
		title: 'Incentives',
		href: '/',
	},
	{
		title: 'Positions',
		href: '/rewards',
	},
	{
		title: 'More',
		href: '/',
		subItems: [
			{
				title: 'Relevant links',
				href: 'https://linktr.ee/maiadao',
			},
			{
				title: 'Trade on UniMaia',
				href: 'https://v3.maiadao.io/#/swap',
			},
			{
				title: 'Trade on Hermes',
				href: 'https://hermes.maiadao.io/',
			},
			{
				title: 'Stake on Maia',
				href: 'https://maiadao.io/',
			},
		],
	},
]
