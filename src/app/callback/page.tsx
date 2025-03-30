"use client";
import { useCheckUserQuery } from "@/redux/api/user/user";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Callback() {
  const { data, isLoading, isError } = useCheckUserQuery();
  const router = useRouter();

  useEffect(() => {
    if (data?.authenticated) {
      router.push("/personal/profile"); // если токен есть — на главную
    } else if (data && !data.authenticated) {
      router.push("/login"); // если токена нет — на логин
    } else if (isError) {
      console.error("Ошибка при проверке авторизации:", isError);
      router.push("/login");
    }
  }, [data, isError, router]);

  return (
    <div className="flex items-center justify-center h-[100vh]">
      <div className="flex flex-row gap-3">
        <div className="w-5 h-5 rounded-full bg-[#1D53C5] animate-bounce [animation-delay:.7s]"></div>
        <div className="w-5 h-5 rounded-full bg-[#1D53C5] animate-bounce [animation-delay:.3s]"></div>
        <div className="w-5 h-5 rounded-full bg-[#1D53C5] animate-bounce [animation-delay:.7s]"></div>
      </div>
    </div>
  );
}
