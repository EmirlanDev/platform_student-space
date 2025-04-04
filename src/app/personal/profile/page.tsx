"use client";
import { useGetProfileQuery } from "@/redux/api/user/user";
import Link from "next/link";

export default function Profile() {
  const { data, isLoading, error } = useGetProfileQuery();

  const formatDate = (dateString: string): string => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      day: "2-digit",
      month: "long",
      year: "numeric",
    };
    return date.toLocaleDateString("ru-RU", options);
  };

  return (
    <div>
      <h1 className="text-[24px] font-[500] mb-[56px] max-[1024px]:mb-[25px] max-[1024px]:text-end max-[700px]:text-[20px]">
        Профиль
      </h1>
      <div className="w-[100%] flex flex-col justify-center">
        {isLoading ? (
          <div className="w-[100%] h-[180px] max-[500px]:h-[120px] bg-[#cccccc] rounded-t-[10px] animate-pulse"></div>
        ) : (
          <img
            className="w-[100%] h-[180px] max-[500px]:h-[120px] object-cover rounded-t-[10px]"
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
                    <div className="min-w-[160px] max-w-[160px] max-[800px]:min-w-[130px] max-[800px]:max-w-[130px] h-[160px] max-[800px]:h-[130px] rounded-full bg-[#cccccc] animate-pulse"></div>
                  ) : (
                    <img
                      className="min-w-[160px] max-[800px]:min-w-[130px] h-[160px] max-[800px]:h-[130px] rounded-full"
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
