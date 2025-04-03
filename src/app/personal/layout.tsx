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
    <div className="min-[1024px]:flex">
      <button className="absolute min-[1024px]:hidden flex items-start w-[58px] max-[600px]:w-[52px] h-[50px] max-[600px]:h-[45px] p-[13px] flex flex-col justify-between hover:bg-[#1d53c520] rounded-lg mt-[20px] ml-[27px] max-[700px]:ml-[14px]">
        <span className="w-[100%] h-[2.5px] bg-[#1d53c5] rounded-[2px]"></span>
        <span className="w-[100%] h-[2.5px] bg-[#1d53c5] rounded-[2px]"></span>
        <span className="w-[80%] h-[2.5px] bg-[#1d53c5] rounded-[2px]"></span>
      </button>
      <aside className="panel fixed overflow-y-scroll inset-[0] w-[40%] min-w-[300px] bg-[#1D53C5] py-[50px] px-[40px] z-[100] max-[1024px]:hidden">
        <div className="px-[15px] pt-[32px] pb-[20px] border-b-[1px] border-white">
          <Link
            className="flex items-center gap-[25px] "
            href="/personal/profile"
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
                  {data?.university
                    ? "Студент " + data?.university
                    : "Университет"}
                </h3>
              )}
            </div>
          </Link>
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="text-start flex items-center justify-between hover:bg-[#ffffff40] border-[#ffffff40] border-[2px] py-[10px] px-[25px] text-[20px] font-[500] text-white w-[100%] mt-[20px] rounded-lg"
          >
            {isLoading ? "Выход..." : "Выйти"}
            <svg
              className="w-6 h-6 text-gray-800 dark:text-white"
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              viewBox="0 0 24 24"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M20 12H8m12 0-4 4m4-4-4-4M9 4H7a3 3 0 0 0-3 3v10a3 3 0 0 0 3 3h2"
              />
            </svg>
          </button>
        </div>
        <nav>
          <ul className="flex flex-col gap-[40px] text-[20px] font-[500] py-[57px] text-white">
            <NavLink href="/personal/news">Новости</NavLink>
            <NavLink href="/personal/questions">Вопросы</NavLink>
            <NavLink href="/personal/">Нетворкинг</NavLink>
            <NavLink href="/personal/">Учебные комнаты</NavLink>
            <NavLink href="/personal/">Мероприятия</NavLink>
            <NavLink href="/personal/">Чаты</NavLink>
            <NavLink href="/personal/ ">Работа</NavLink>
          </ul>
        </nav>
      </aside>
      <div className="py-[32px] max-[700px]:py-[32px] px-[40px] max-[1024px]:py-[26px] max-[700px]:px-[25px] ml-[370px] max-w-[930px] max-[1024px]:ml-0 w-[67vw] max-[1200px]:w-[63vw] max-[1024px]:w-[94vw] max-[700px]:w-[100vw]">
        {children}
      </div>
    </div>
  );
}
