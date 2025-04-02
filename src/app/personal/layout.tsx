"use client";
import NavLink from "@/components/NavLink";
import { ReactNode } from "react";
import Link from "next/link";
import { useGetProfileQuery } from "@/redux/api/user/user";
import { useLogoutMutation } from "@/redux/api/auth/auth";
import { useRouter } from "next/navigation";

interface PersonalProps {
  children: ReactNode;
}

export default function Personal({ children }: PersonalProps) {
  const { data, isLoading, error } = useGetProfileQuery();
  const router = useRouter();
  const [logout, { isLoading: isLogoutLoading, isError, isSuccess }] =
    useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      router.push("/");
    } catch (error) {
      console.error("Ошибка выхода:", error);
    }
  };

  return (
    <div className="flex">
      <div className="panel fixed overflow-y-scroll inset-[0] max-w-[370px] w-[100%] bg-[#1D53C5] py-[18px] px-[40px] z-[100]">
        <Link
          href="/personal/profile"
          className="flex items-center gap-[25px] px-[15px] py-[32px] border-b-[1px] border-white"
        >
          {isLoading ? (
            <div className="w-[84px] h-[84px] rounded-full bg-[#4b72c4] animate-pulse"></div>
          ) : (
            <img
              className="w-[84px] h-[84px] rounded-full"
              src={data?.photoURL}
              alt="User Profile"
            />
          )}

          <div className="w-[50%] flex flex-col gap-[5px]">
            {isLoading ? (
              <div className="w-[100%] h-[25px] rounded-[5px] bg-[#4b72c4] animate-pulse"></div>
            ) : (
              <h2 className="text-[20px] font-[500] text-white">
                {data?.name +
                  " " +
                  (data?.lastName ? data?.lastName[0] + "." : "")}
              </h2>
            )}
            {isLoading ? (
              <div className="w-[80%] h-[22px] rounded-[5px] bg-[#4b72c4] animate-pulse"></div>
            ) : (
              <h3 className="text-[#fff] font-[400]">
                {data?.university === "Пусто"
                  ? "Университет"
                  : data?.university}
              </h3>
            )}
          </div>
        </Link>
        <nav>
          <ul className="flex flex-col gap-[40px] text-[20px] font-[500] py-[57px] text-white">
            <NavLink href="/personal/news">Новости</NavLink>
            <NavLink href="/personal/questions">Вопросы</NavLink>
            <NavLink href="/personal/">Нетворкинг</NavLink>
            <NavLink href="/personal/">Учебные комнаты</NavLink>
            <NavLink href="/personal/">Мероприятия</NavLink>
            <NavLink href="/personal/">Чаты</NavLink>
            <NavLink href="/personal/ ">Работа</NavLink>
            <button
              onClick={handleLogout}
              disabled={isLoading}
              className="text-start py-[10px] px-[40px]"
            >
              {isLoading ? "Выход..." : "Выйти"}
            </button>
          </ul>
        </nav>
      </div>
      <div>{children}</div>
    </div>
  );
}
