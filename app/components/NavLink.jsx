import Link from "next/link";

const NavLink = ({ href, title }) => {
  return (
    <Link
      href={href}
      className=" py-2 pl-3 pr-3 text-stone-50 sm:text-xl"
    >
      {title}
    </Link>
  );
};

export default NavLink;
