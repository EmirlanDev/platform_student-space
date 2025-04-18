"use client";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRegisterMutation } from "@/redux/api/auth/auth";
import { useGetProfileQuery } from "@/redux/api/user/user";
import { useFormRegister, useValidRegisterState } from "@/zustand/authState";
import {
  useAdminPassword,
  useAgreement,
  useRegisterEyes,
} from "@/zustand/allState";

export default function RegisterClient() {
  const router = useRouter();

  //! RTK query
  const { refetch } = useGetProfileQuery();
  const [register, { isLoading }] = useRegisterMutation();

  //! Zustand
  const { form, setField, resetForm } = useFormRegister();
  const { errors, setErrors, clearError, resetErrors } =
    useValidRegisterState();
  const { openEyes, closeEyes, isOpenEyes } = useRegisterEyes();
  const { isAgreed, toggleAgreement } = useAgreement();
  const { isAdminPassword, toggleAdminPassword } = useAdminPassword();

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.shiftKey && event.key === "M") {
        event.preventDefault();
        toggleAdminPassword();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  const validateForm = () => {
    const errors: any = {};

    if (!form.name) errors.name = "Имя обязательно";
    if (!form.email) {
      errors.email = "Почта обязательна";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errors.email = "Введите корректную почту";
    }
    if (!form.password) {
      errors.password = "Пароль обязателен";
    } else if (form.password.length < 6) {
      errors.password = "Пароль должен быть не менее 6 символов";
    }
    if (!isAgreed) {
      errors.agreement = "Вы должны согласиться с условиями";
    }

    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  useEffect(() => {
    clearError("name");
  }, [form.name]);

  useEffect(() => {
    clearError("email");
  }, [form.email]);

  useEffect(() => {
    clearError("password");
  }, [form.password]);

  useEffect(() => {
    clearError("agreement");
  }, [isAgreed]);

  const handleRegister = async () => {
    if (!validateForm()) return;

    try {
      await register(form).unwrap();
      resetForm();
      resetErrors();
      refetch();
      router.push("/personal");
    } catch (err: any) {
      const errors: any = {};
      errors.email = err.data.message;
      setErrors(errors);
    }
  };

  function openGoogleLogin() {
    const w = 500,
      h = 600;
    const left = screen.width / 2 - w / 2;
    const top = screen.height / 2 - h / 2;

    const popup = window.open(
      "https://platform-student-space.vercel.app/api/auth/google",
      "google-login",
      `width=${w},height=${h},top=${top},left=${left}`
    );

    window.addEventListener("message", function (event) {
      const user = event.data;
      console.log("Пользователь залогинен:", user);
    });
  }

  return (
    <div className="container">
      <div className="flex items-center justify-center flex-col gap-[23px] max-[600px]:gap-[14px] py-[70px] max-[600px]:py-[40px]">
        <h1 className="text-[40px] font-[500] max-[600px]:text-[35px]">
          Регистрация
        </h1>
        <label className=" max-w-[502px] w-[100%]">
          <span className={`${errors.name ? "text-red-500" : ""}`}>Имя</span>
          <input
            className={`${
              errors.name
                ? "border-red-500 border-[2px]"
                : "border-gray-300 dark:border-gray-600"
            } w-full mt-[10px] max-[600px]:mt-[4px] px-4 py-4 max-[600px]:py-3 bg-white dark:bg-white border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500 text-[#000] dark:text-[#000]  shadow-sm`}
            type="text"
            placeholder="Введите свое имя"
            onChange={(e) => {
              setField("name", e.target.value);
            }}
            value={form.name}
          />
          {errors.name && (
            <span className="text-red-500 text-sm ml-[10px] font-[500]">
              {errors.name}
            </span>
          )}
        </label>
        <label className="max-w-[502px] w-[100%]">
          Фамилие
          <input
            className="w-full mt-[10px] max-[600px]:mt-[4px] px-4 py-4 max-[600px]:py-3 bg-white dark:bg-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500 text-[#000] dark:text-[#000] hover:border-gray-400 dark:hover:border-gray-500 shadow-sm"
            type="text"
            placeholder="Введите свое фамилие"
            onChange={(e) => setField("lastName", e.target.value)}
            value={form.lastName}
          />
        </label>
        <label className="flex flex-col max-w-[502px] w-[100%]">
          <span className={`${errors.email ? "text-red-500" : ""}`}>Почта</span>
          <div className="relative mt-[10px] max-[600px]:mt-[4px]">
            <input
              className={`${
                errors.email
                  ? "border-red-500 border-[2px]"
                  : "border-gray-300 dark:border-gray-600"
              } w-full px-4 py-4 max-[600px]:py-3 bg-white dark:bg-white border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500 text-[#000] dark:text-[#000] shadow-sm`}
              type="email"
              placeholder="Введите свою почту"
              onChange={(e) => setField("email", e.target.value)}
              value={form.email}
            />
            <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
              <svg
                stroke="currentColor"
                viewBox="0 0 24 24"
                fill="none"
                className={`h-6 w-6 ${
                  errors.email ? "text-red-500" : "text-gray-400"
                } `}
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                  strokeWidth="2"
                  strokeLinejoin="round"
                  strokeLinecap="round"
                ></path>
              </svg>
            </span>
          </div>
          {errors.email && (
            <span className="text-red-500 text-sm ml-[10px] font-[500]">
              {errors.email}
            </span>
          )}
        </label>
        <label className="flex flex-col max-w-[502px] w-[100%]">
          <span className={`${errors.password ? "text-red-500" : ""}`}>
            Пароль*
          </span>
          <div className="relative mt-[10px] max-[600px]:mt-[4px]">
            <input
              className={`${
                errors.password
                  ? "border-red-500 border-[2px]"
                  : "border-gray-300 dark:border-gray-600"
              } w-full px-4 py-4 max-[600px]:py-3 bg-white dark:bg-white border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500 text-[#000] dark:text-[#000] shadow-sm`}
              type={isOpenEyes ? "text" : "password"}
              placeholder="Введите свой пароль"
              onChange={(e) => setField("password", e.target.value)}
              value={form.password}
            />
            {isOpenEyes ? (
              <span
                onClick={closeEyes}
                className="absolute inset-y-0 end-0 grid place-content-center px-4"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                  className={`h-6 w-6 ${
                    errors.password ? "text-red-500" : "text-gray-400"
                  } `}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.542-7a9.956 9.956 0 012.397-3.882m3.107-2.21A9.955 9.955 0 0112 5c4.478 0 8.268 2.943 9.542 7a9.966 9.966 0 01-4.293 5.147M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3l18 18"
                  />
                </svg>
              </span>
            ) : (
              <span
                onClick={openEyes}
                className="absolute inset-y-0 end-0 grid place-content-center px-4"
              >
                <svg
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  fill="none"
                  className={`h-6 w-6 ${
                    errors.password ? "text-red-500" : "text-gray-400"
                  } `}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  ></path>
                  <path
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                    strokeWidth="2"
                    strokeLinejoin="round"
                    strokeLinecap="round"
                  ></path>
                </svg>
              </span>
            )}
          </div>
          {errors.password && (
            <span className="text-red-500 text-sm ml-[10px] font-[500]">
              {errors.password}
            </span>
          )}
        </label>
        {/* Другие поля формы */}
        {isAdminPassword ? (
          <label className="max-w-[502px] w-[100%]">
            Админский пароль
            <input
              className="w-full mt-[10px] max-[600px]:mt-[4px] px-4 py-4 max-[600px]:py-3 bg-white dark:bg-white border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:focus:ring-blue-400 dark:focus:border-blue-400 transition-all duration-200 placeholder-gray-400 dark:placeholder-gray-500 text-[#000] dark:text-[#000] hover:border-gray-400 dark:hover:border-gray-500 shadow-sm"
              type="text"
              placeholder="Введите пароль"
              onChange={(e) => setField("adminCode", e.target.value)}
              value={form.adminCode}
            />
          </label>
        ) : null}
        {/* Другие элементы формы */}
        <label
          onClick={toggleAgreement}
          className={`${
            errors.agreement && !isAgreed ? "text-red-500" : ""
          } max-w-[502px] w-[100%]`}
        >
          <span className="flex items-center gap-[12px]">
            <span
              className={`${isAgreed ? "bg-[#348BCA]" : ""} ${
                errors.agreement && !isAgreed ? "border-red-500" : ""
              } w-[21px] h-[21px] rounded-[5px] flex items-center justify-center border-[1px] border-[#348BCA]`}
            >
              <svg
                width="14"
                height="11"
                viewBox="0 0 14 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M4.95582 7.40485L2.00059 4.56584L0.185547 6.31749L4.95839 10.9007L13.5786 2.60513L11.7609 0.855957L4.95582 7.40485Z"
                  fill="white"
                />
              </svg>
            </span>
            Согласен с Условиями
          </span>
        </label>
        {isLoading ? (
          <button
            type="submit"
            className="cursor-wait flex justify-center items-center gap-[10px] bg-[#1D53C5] max-[600px]:py-3 hover:bg-[#2d6aea] transition-[.3s] text-white text-[23px] max-[600px]:text-[20px] max-w-[502px] w-[100%] py-[16px] rounded-[12px]"
          >
            Регистрация
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid"
              width="25"
              height="25"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <g>
                <circle
                  strokeDasharray="164.93361431346415 56.97787143782138"
                  r="35"
                  strokeWidth="10"
                  stroke="#5bc4e1"
                  fill="none"
                  cy="50"
                  cx="50"
                >
                  <animateTransform
                    keyTimes="0;1"
                    values="0 50 50;360 50 50"
                    dur="1s"
                    repeatCount="indefinite"
                    type="rotate"
                    attributeName="transform"
                  ></animateTransform>
                </circle>
                <g></g>
              </g>
            </svg>
          </button>
        ) : (
          <button
            onClick={handleRegister}
            type="submit"
            className="cursor-pointer flex justify-center items-center gap-[10px] bg-[#1D53C5] max-[600px]:py-3 hover:bg-[#2d6aea] transition-[.3s] text-white text-[23px] max-[600px]:text-[20px] max-w-[502px] w-[100%] py-[16px] rounded-[12px]"
          >
            Зарегистрироваться
          </button>
        )}
        <div className="flex items-center justify-between mb-[3px]">
          <p className="text-[20px] max-[600px]:text-[16px] text-gray-600">
            У вас уже eсть аккаунт?{" "}
            <Link href="/login" className="underline text-[#1D53C5]">
              Войти
            </Link>
          </p>
        </div>
        <div className="relative max-w-[502px] w-[100%] flex items-center justify-center py-[10px]">
          <div className="w-[100%] h-[2px] bg-[#00000080]"></div>
          <span className="absolute bg-white px-[14px] text-[20px] font-[500] text-[#00000080]">
            Или
          </span>
        </div>
        <div className="flex max-w-[502px] w-[100%] justify-between gap-[25px]">
          <button
            // onClick={() =>
            //   router.push(
            //     "https://platform-student-space.vercel.app/api/auth/google"
            //   )
            // }
            className="cursor-not-allowed flex border-[1px] border-[#1D53C5] rounded-[6px] h-[51px] items-center w-[50%] justify-center gap-[10px] text-[20px] font-[500]"
          >
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <rect
                x="0.801758"
                y="0.500732"
                width="20.0895"
                height="20.0895"
                fill="url(#pattern0_779_65)"
              />
              <defs>
                <pattern
                  id="pattern0_779_65"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    xlinkHref="#image0_779_65"
                    transform="scale(0.0078125)"
                  />
                </pattern>
                <image
                  id="image0_779_65"
                  width="128"
                  height="128"
                  preserveAspectRatio="none"
                  xlinkHref="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c1/Google_%22G%22_logo.svg/768px-Google_%22G%22_logo.svg.png"
                />
              </defs>
            </svg>
            Google
          </button>
          <button className="cursor-not-allowed flex border-[1px] border-[#1D53C5] rounded-[6px] h-[51px] items-center w-[50%] justify-center gap-[10px] text-[20px] font-[500]">
            <svg
              width="21"
              height="21"
              viewBox="0 0 21 21"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <rect
                x="0.134766"
                y="0.337891"
                width="20.0895"
                height="20.0895"
                fill="url(#pattern0_779_68)"
              />
              <defs>
                <pattern
                  id="pattern0_779_68"
                  patternContentUnits="objectBoundingBox"
                  width="1"
                  height="1"
                >
                  <use
                    xlinkHref="#image0_779_68"
                    transform="scale(0.0078125)"
                  />
                </pattern>
                <image
                  id="image0_779_68"
                  width="128"
                  height="128"
                  preserveAspectRatio="none"
                  xlinkHref="https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1200px-Facebook_Logo_%282019%29.png"
                />
              </defs>
            </svg>
            Fasebook
          </button>
        </div>
      </div>
    </div>
  );
}
