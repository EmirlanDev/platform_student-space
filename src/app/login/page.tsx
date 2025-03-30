"use client";
import { useLoginMutation } from "@/redux/api/auth/auth";
import { useFormLogin } from "@/zustand/authState";
import Image from "next/image";
import loginImage from "../../assets/login.png";
import { useRouter } from "next/navigation";
import { useGetProfileQuery } from "@/redux/api/user/user";

export default function Login() {
  const { form, setField, resetForm } = useFormLogin();
  const [login, { data, isLoading, error }] = useLoginMutation();
  const router = useRouter();

  const { refetch } = useGetProfileQuery();

  const handleLogin = async () => {
    try {
      await login(form).unwrap();
      resetForm();
      refetch();
      router.push("/personal/profile");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex">
      <Image src={loginImage} alt="bg" />
      <div className="flex items-center justify-center flex-col gap-[23px] py-[120px] w-[50%]">
        <h1 className="text-[40px] font-[500]">Добро пожаловать</h1>
        <label className="flex flex-col max-w-[502px] w-[100%] gap-[10px]">
          Почта
          <input
            className="max-w-[502px] w-[100%] h-[58px] border-[1px] border-[#00000066] rounded-[6.7px] px-[16px] text-[16.78px]"
            type="text"
            placeholder="Введите свою почту"
            onChange={(e) => setField("email", e.target.value)}
            value={form.email}
          />
        </label>
        <label className="flex flex-col max-w-[502px] w-[100%] gap-[10px]">
          Пароль*
          <input
            className="max-w-[502px] w-[100%] h-[58px] border-[1px] border-[#00000066] rounded-[6.7px] px-[16px] text-[16.78px]"
            type="text"
            placeholder="Введите свой пароль"
            onChange={(e) => setField("password", e.target.value)}
            value={form.password}
          />
        </label>
        <button
          onClick={handleLogin}
          className="bg-[#1D53C5] text-white text-[23px] max-w-[502px] w-[100%] py-[16px] rounded-[12px]"
        >
          {isLoading ? (
            <span className="flex justify-center items-center gap-[10px]">
              Вход
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
            </span>
          ) : (
            "Войти"
          )}
        </button>
        <div className="relative max-w-[502px] w-[100%] flex items-center justify-center py-[10px]">
          <div className="w-[100%] h-[2px] bg-[#00000080]"></div>
          <span className="absolute bg-white px-[14px] text-[20px] font-[500] text-[#00000080]">
            Или
          </span>
        </div>
        <div className="flex max-w-[502px] w-[100%] justify-between gap-[25px]">
          <button
            onClick={() =>
              router.push(
                "https://platform-back-qgul.onrender.com/platform/auth/google"
              )
            }
            className="flex border-[1px] border-[#1D53C5] rounded-[6px] h-[51px] items-center w-[50%] justify-center gap-[10px] text-[20px] font-[500]"
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
                  xlinkHref="data:image/png;base64,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"
                />
              </defs>
            </svg>
            Google
          </button>
          <button className="flex border-[1px] border-[#1D53C5] rounded-[6px] h-[51px] items-center w-[50%] justify-center gap-[10px] text-[20px] font-[500]">
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
                  xlinkHref="data:image/png;base64,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"
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
