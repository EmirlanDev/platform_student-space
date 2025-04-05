// ./src/components/NavLink.tsx
"use client"; // Убедитесь, что компонент работает только на клиенте

import Link from "next/link";
import { usePathname } from "next/navigation"; // Используем usePathname из next/navigation
import clsx from "clsx";

const NavLink = ({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick: () => void;
}) => {
  const pathname = usePathname(); // Получаем текущий путь с помощью usePathname

  const isActive = pathname === href;

  return (
    <Link
      onClick={onClick}
      href={href}
      className={clsx(
        "nav-link max-w-[290px] py-[10px] px-[40px] max-[800px]:px-[20px] max-[800px]:py-[5px] rounded-lg",
        {
          active: isActive,
        }
      )}
    >
      {children}
    </Link>
  );
};

export default NavLink;
