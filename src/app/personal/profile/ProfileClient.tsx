"use client";
import formatDate from "@/helpers/date";
import { useGetProfileQuery } from "@/redux/api/user/user";
import Link from "next/link";

export default function ProfileClient() {
  const { data, isLoading, error } = useGetProfileQuery();

  return (
    <div>
      <h1 className="max-[1024px]:fixed text-[24px] z-2 font-[500] mb-[56px] max-[1024px]:py-[30px] max-[1024px]:top-0 max-[1024px]:text-end max-[1024px]:left-0 bg-[#ffffff] max-[1024px]:w-[100%] max-[700px]:text-[20px] pr-[90px] max-[700px]:pr-[10px]">
        Профиль
      </h1>
      <div className="w-[100%] flex flex-col justify-center max-[1024px]:mt-[100px]">
        {isLoading ? (
          <div className="flex items-center justify-center w-[100%] h-[180px] max-[500px]:h-[120px] bg-[#cccccc] rounded-t-[10px] animate-pulse">
            <svg
              viewBox="0 0 16 20"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              className="w-10 h-10 text-gray-200 dark:text-gray-600"
            >
              <path d="M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z"></path>
              <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z"></path>
            </svg>
          </div>
        ) : (
          <img
            className="w-[100%] h-[180px] object-cover rounded-t-[10px]"
            src={data?.bgImage}
            alt="background"
          />
        )}
        <div className="border-[1px] border-[#00000033] border-t-0 rounded-b-[10px] px-[32px] max-[700px]:px-[22px] pb-[85px] max-[700px]:pb-[30px]">
          <table className="mt-[-69px] max-[800px]:mt-[-45px] translate-y-0 w-full">
            <tbody>
              <tr className="max-[700px]:flex max-[700px]:flex-col max-[700px]:items-center">
                <th className="max-[700px]:mb-[15px]">
                  {isLoading ? (
                    <div className="min-w-[160px] max-w-[160px] max-[800px]:min-w-[130px] max-[800px]:max-w-[130px] h-[160px] max-[800px]:h-[130px] rounded-full bg-[#cccccc]">
                      <svg
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-hidden="true"
                        className="animate-pulse min-w-[160px] max-w-[160px] max-[800px]:min-w-[130px] max-[800px]:max-w-[130px] h-[160px] max-[800px]:h-[130px] me-3 text-gray-200 dark:text-gray-400"
                      >
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"></path>
                      </svg>
                    </div>
                  ) : (
                    <img
                      className="min-w-[160px] max-w-[160px] max-[800px]:min-w-[130px] max-[800px]:max-w-[130px] h-[160px] max-[800px]:h-[130px] rounded-full object-cover"
                      src={data?.photoURL}
                      alt="User Profile"
                    />
                  )}
                </th>
                <td className="align-bottom pl-[37px] max-[800px]:pl-[17px] max-[700px]:pl-0 max-[700px]:text-center w-[100%]">
                  <span className="flex max-[700px]:flex-col max-[700px]:items-center justify-between items-end ">
                    <span className="max-[700px]:mb-[10px] pr-[20%] w-[80%] max-[700px]:pr-0">
                      {isLoading ? (
                        <div className="flex  gap-[5px]">
                          <div className="w-[45%] mb-[4px] h-[25px] rounded-[20px] bg-[#cccccc] animate-pulse"></div>
                          <div className="w-[55%] mb-[4px] h-[25px] rounded-[20px] bg-[#cccccc] animate-pulse"></div>
                        </div>
                      ) : (
                        <h2 className="text-[20px] mb-[4px] font-[500] text-[#000]">
                          {data?.name}{" "}
                          {data?.lastName ? (
                            data?.lastName
                          ) : (
                            <span className="text-[#00000030]">
                              Фамилия не указана
                            </span>
                          )}
                        </h2>
                      )}
                      {isLoading ? (
                        <div className="w-[60%] h-[18px] rounded-[10px] bg-[#cccccc] animate-pulse"></div>
                      ) : (
                        <h3 className="text-[#000] text-[14px] font-[300]">
                          {data?.profession ? (
                            data.profession
                          ) : (
                            <span className="text-[#00000030]">
                              Укажите вашу профессию
                            </span>
                          )}
                        </h3>
                      )}
                    </span>
                    <Link
                      href={`/personal/edit/${data?.id}`}
                      className="bg-[#1D53C5] h-[41px] text-[#fff] px-[20px] py-[8px] rounded-[6px] max-[700px]:w-[70%] text-center"
                    >
                      Редактировать
                    </Link>
                  </span>
                </td>
              </tr>

              <tr>
                <th className="pt-[50px] max-[800px]:pt-[30px]"></th>
                <td className="pt-[50px] max-[800px]:pt-[30px]"></td>
              </tr>

              <tr className="max-[700px]:flex max-[700px]:flex-col max-[700px]:items-start max-[700px]:w-full">
                <th className="text-[20px] max-[800px]:text-[17px] max-[700px]:mb-[5px]">
                  Описание:
                </th>
                <td className="pl-[37px] max-[800px]:pl-[17px] max-[700px]:pl-0 max-[700px]:text-left w-full">
                  {isLoading ? (
                    <div className="flex flex-col gap-[5px]">
                      <div className="w-[100%] h-[20px] rounded-[10px] bg-[#cccccc] animate-pulse"></div>
                      <div className="w-[100%] h-[20px] rounded-[10px] bg-[#cccccc] animate-pulse"></div>
                      <div className="w-[70%] h-[20px] rounded-[10px] bg-[#cccccc] animate-pulse"></div>
                    </div>
                  ) : (
                    <h2 className="max-[800px]:text-[16px]">
                      {data?.descr ? (
                        data.descr
                      ) : (
                        <span className="text-[#00000030]">
                          Добавьте информацию о себе
                        </span>
                      )}
                    </h2>
                  )}
                </td>
              </tr>

              <tr>
                <th className="pt-[32px] max-[800px]:pt-[14px]"></th>
                <td className="pt-[32px] max-[800px]:pt-[14px]"></td>
              </tr>

              <tr className="max-[700px]:flex max-[700px]:flex-col max-[700px]:items-start max-[700px]:w-full">
                <th className="text-[20px] max-[800px]:text-[17px] max-[700px]:mb-[5px]">
                  Университет:
                </th>
                <td className="pl-[37px] max-[800px]:pl-[17px] max-[700px]:pl-0 max-[700px]:text-left w-full">
                  {isLoading ? (
                    <div className="w-[35%] mb-[4px] h-[20px] rounded-[10px] bg-[#cccccc] animate-pulse"></div>
                  ) : (
                    <h2 className="max-[800px]:text-[16px]">
                      {data?.university ? (
                        data.university
                      ) : (
                        <span className="text-[#00000030]">
                          Учебное заведение не выбрано
                        </span>
                      )}
                    </h2>
                  )}
                </td>
              </tr>

              <tr>
                <th className="pt-[32px] max-[800px]:pt-[14px]"></th>
                <td className="pt-[32px] max-[800px]:pt-[14px]"></td>
              </tr>

              <tr className="max-[700px]:flex max-[700px]:flex-col max-[700px]:items-start max-[700px]:w-full">
                <th className="text-[20px] max-[800px]:text-[17px] max-[700px]:mb-[5px]">
                  Дата рождения:
                </th>
                <td className="pl-[37px] max-[800px]:pl-[17px] max-[700px]:pl-0 max-[700px]:text-left w-full">
                  {isLoading ? (
                    <div className="w-[30%] mb-[4px] h-[20px] rounded-[10px] bg-[#cccccc] animate-pulse"></div>
                  ) : (
                    <h2 className="max-[800px]:text-[16px]">
                      {data?.dateOfBirthDay ? (
                        formatDate(data.dateOfBirthDay as string)
                      ) : (
                        <span className="text-[#00000030]">
                          Дата рождения отсутствует
                        </span>
                      )}
                    </h2>
                  )}
                </td>
              </tr>

              <tr>
                <th className="pt-[32px] max-[800px]:pt-[14px]"></th>
                <td className="pt-[32px] max-[800px]:pt-[14px]"></td>
              </tr>

              <tr className="max-[700px]:flex max-[700px]:flex-col max-[700px]:items-start max-[700px]:w-full">
                <th className="text-[20px] max-[800px]:text-[17px] max-[700px]:mb-[5px]">
                  Соц. сети:
                </th>
                <td className="pl-[37px] max-[800px]:pl-[17px] max-[700px]:pl-0 max-[700px]:text-left w-full">
                  {isLoading ? (
                    <div className="w-[40%] mb-[4px] h-[20px] rounded-[10px] bg-[#cccccc] animate-pulse"></div>
                  ) : (
                    <h2 className="max-[800px]:text-[16px]">{data?.email}</h2>
                  )}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
