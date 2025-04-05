"use client";
import NavLink from "@/components/NavLink";
import { ReactNode, useEffect, useState } from "react";
import Link from "next/link";
import { useCheckUserQuery, useGetProfileQuery } from "@/redux/api/user/user";
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
  const {
    data: checkData,
    isLoading: isCheckLoading,
    error: isCheckError,
  } = useCheckUserQuery();
  const [burger, setBurger] = useState<boolean>(false);

  const handleLogout = async () => {
    try {
      await logout().unwrap();
      router.push("/");
    } catch (error) {
      console.error("Ошибка выхода:", error);
    }
  };

  useEffect(() => {
    if (!checkData?.authenticated) {
      router.push("/verification");
    }
  }, [isCheckLoading, isCheckError, checkData, router]);

  return (
    <div className="min-[1024px]:flex">
      <button
        onClick={() => setBurger(true)}
        className="absolute min-[1024px]:hidden flex items-start w-[58px] max-[600px]:w-[52px] h-[50px] max-[600px]:h-[45px] p-[13px] flex flex-col justify-between hover:bg-[#1d53c520] rounded-lg mt-[20px] ml-[27px] max-[700px]:ml-[14px]"
      >
        <span className="w-[100%] h-[2.5px] bg-[#1d53c5] rounded-[2px]"></span>
        <span className="w-[100%] h-[2.5px] bg-[#1d53c5] rounded-[2px]"></span>
        <span className="w-[80%] h-[2.5px] bg-[#1d53c5] rounded-[2px]"></span>
      </button>
      <div
        onClick={() => setBurger(false)}
        className={`${
          burger ? "" : "hidden"
        } fixed w-[100%] w-[100%] h-[100vh] bg-[#ffffff80] backdrop-blur-sm z-[10]`}
      ></div>
      <aside
        className={`panel fixed overflow-y-scroll max-[800px]:overflow-hidden bg-[#1d53c5] max-w-[370px] transition-[.5s] inset-[0] w-[40%] min-w-[300px] bg-[#1D53C5] py-[50px] max-[900px]:py-[20px] px-[40px] max-[900px]:px-[20px] z-[200] max-[800px]:max-h-[700px] max-[800px]:rounded-r-[10px] ${
          burger
            ? "max-[1024px]:translate-x-[0]"
            : "max-[1024px]:translate-x-[-100%]"
        }`}
      >
        <div className="px-[15px] pt-[32px] max-[790px]:pt-[10px] pb-[20px] border-b-[1px] border-white">
          <Link
            onClick={() => setBurger(false)}
            className="flex items-center gap-[25px] max-[900px]:gap-[15px] max-[790px]:flex-col"
            href="/personal/profile"
          >
            {isLoading ? (
              <div className="w-[84px] max-[900px]:w-[64px] h-[84px] max-[900px]:h-[64px] rounded-full bg-[#4b72c4]">
                <svg
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                  className="animate-pulse w-[84px] max-[900px]:w-[64px] h-[84px] max-[900px]:h-[64px] me-3 text-gray-200 dark:text-gray-400"
                >
                  <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"></path>
                </svg>
              </div>
            ) : (
              <img
                className="w-[84px] max-[900px]:w-[64px] h-[84px] max-[900px]:h-[64px] rounded-full object-cover"
                src={data?.photoURL}
                alt="User Profile"
              />
            )}

            <div className="w-[50%] flex flex-col gap-[5px] max-[790px]:w-full max-[790px]:text-center">
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
                  {data?.university ? (
                    "Студент " + data?.university
                  ) : (
                    <span className="text-[#ffffff60]">не указана</span>
                  )}
                </h3>
              )}
            </div>
          </Link>
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className="text-start flex items-center justify-between hover:bg-[#ffffff40] border-[#ffffff40] border-[2px] py-[10px] max-[900px]:py-[5px] px-[25px] max-[900px]:px-[15px] text-[20px] max-[800px]:text-[16px] font-[500] text-white w-[100%] mt-[20px] rounded-lg"
          >
            {isLogoutLoading ? "Выход..." : "Выйти"}
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
          <ul className="flex flex-col gap-[40px] max-[800px]:gap-[18px] text-[20px] max-[800px]:text-[18px] font-[500] py-[57px] max-[800px]:py-[28px] text-white">
            {[
              { path: "/personal/news", title: "Новости" },
              { path: "/personal/questions", title: "Вопросы" },
              { path: "/personal/networking", title: "Нетворкинг" },
              { path: "/personal/training", title: "Учебные комнаты" },
              { path: "/personal/event", title: "Мероприятия" },
              { path: "/personal/chat", title: "Чат" },
              { path: "/personal/job", title: "Работа" },
            ].map((el, idx) => (
              <NavLink
                onClick={() => setBurger(false)}
                href={el.path}
                key={idx}
              >
                {el.title}
              </NavLink>
            ))}
          </ul>
        </nav>
      </aside>
      <div className="py-[32px] max-[700px]:py-[32px] px-[40px] max-[1024px]:py-[26px] max-[700px]:px-[25px] ml-[370px] max-w-[930px] max-[1024px]:ml-0 w-[67vw] max-[1200px]:w-[63vw] max-[1024px]:w-[94vw] max-[700px]:w-[100vw]">
        {children}
      </div>
    </div>
  );
}
