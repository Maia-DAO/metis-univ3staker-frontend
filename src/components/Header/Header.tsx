import { NAV_ITEMS, NavItem } from "@/config";
import Link from "next/link";
import Image from "next/image";
import { ConnectWallet } from "../ConnectWallet";
import logo from "../../../public/logo.png";
import Dropdown from "@/components/Header/Dropdown";

const Header = () => {

  const renderLink = (item: NavItem) => {
    return (
      <Link
        key={item.href}
        href={item.href!}
        className="text-white text-base hover:text-blue-tiffany cursor-pointer p-2">
        {item.title}
      </Link>
    );
  }

  return (
    <header className="flex justify-start items-center gap-[12px] px-9 pt-3">
      <Link href="https://maiadao.io">
        <Image src={logo} alt="Maia DAO Logo" width={70} height={70} />
      </Link>
      <nav className="flex h-full px-8 gap-[26px] justify-center items-center">
        {NAV_ITEMS.map((item) => (
          item.subItems ? <Dropdown key={item.href} parent={item} /> : renderLink(item)
        ))}
      </nav>
      <span className="ml-auto">
        <ConnectWallet />
      </span>

    </header>
  );
};

export default Header;
