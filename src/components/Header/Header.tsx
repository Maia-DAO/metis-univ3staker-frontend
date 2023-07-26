import { NAV_ITEMS, NavItem } from '@/config'
import Link from 'next/link'
import Image from 'next/image'
import { ConnectWallet } from '@/components'
import logo from '../../../public/logo.png'
import Dropdown from '@/components/Header/Dropdown'

const Header = () => {
	const renderLink = (item: NavItem) => {
		return (
			<Link
				key={item.href}
				href={item.href!}
				className="cursor-pointer p-2 text-base text-white hover:text-blue-tiffany">
				{item.title}
			</Link>
		)
	}

	return (
		<header className="flex items-center justify-start px-4 pt-3 sm:px-9">
			<Link className="flex h-[55px] w-[55px] sm:h-[70px] sm:w-[70px]" href="https://uni.maiadao.io/">
				<Image src={logo} alt="Maia DAO Logo" width={70} height={70} />
			</Link>
			<nav className="fixed bottom-0 left-0 z-50 flex w-full items-center justify-evenly gap-[12px] border-t-[1px] border-blue-tiffany/40 bg-dark-gunmetal py-2 sm:relative sm:flex sm:h-full sm:w-auto sm:justify-start sm:gap-[26px] sm:border-0 sm:bg-transparent sm:px-8 sm:py-0">
				{NAV_ITEMS.map((item) =>
					item.subItems ? <Dropdown key={`dropdown-${item.href}`} parent={item} /> : renderLink(item),
				)}
			</nav>
			<span className="ml-auto">
				<ConnectWallet />
			</span>
		</header>
	)
}

export default Header
