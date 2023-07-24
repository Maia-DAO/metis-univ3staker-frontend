import { useState } from 'react'
import { NavItem } from '@/config'
import Link from 'next/link'

const DropdownContent = ({ subItems, open }: { subItems: NavItem[]; open: boolean }) => {
	return (
		<ul
			className={`${
				open ? 'flex' : 'hidden'
			} absolute -right-2.5 bottom-[100%] w-max flex-col gap-4 rounded border-[#551551] bg-dark-purple p-2.5 sm:-left-2.5 sm:bottom-0 sm:right-auto sm:top-[100%]`}>
			{subItems.map((item, idx) => (
				<li key={idx}>
					<Link href={item.href!} className="cursor-pointer p-2 text-base text-white hover:text-blue-tiffany">
						{item.title}
					</Link>
				</li>
			))}
		</ul>
	)
}

const Dropdown = ({ parent }: { parent: NavItem }) => {
	const [open, setOpen] = useState(false)

	const handleMouseEnter = () => {
		setOpen(true)
	}

	const handleMouseLeave = () => {
		setOpen(false)
	}

	return (
		<div className="relative z-10" onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
			<button
				type="button"
				className="flex cursor-pointer items-center gap-1 p-2 text-base text-white hover:text-blue-tiffany">
				<span className="mr-1 cursor-pointer">{parent.title}</span>
				<svg xmlns="http://www.w3.org/2000/svg" width="8" height="9" viewBox="0 0 8 9" fill="none">
					<path
						d="M4.036 7.071L0.5 3.536L1.286 2.75L4.037 5.5L6.785 2.75L7.571 3.536L4.036 7.071Z"
						fill="currentColor"
					/>
				</svg>
			</button>
			<DropdownContent subItems={parent.subItems!} open={open} />
		</div>
	)
}

export default Dropdown
