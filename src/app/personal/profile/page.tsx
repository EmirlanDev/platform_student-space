"use client";
import { useGetProfileQuery } from "@/redux/api/user/user";
import Personal from "../layout";
import Link from "next/link";

export default function Profile() {
  const { data, isLoading, error } = useGetProfileQuery();

  console.log(data);

  return (
    <Personal>
      <div className="py-[32px] px-[40px] ml-[370px]">
        <h1 className="text-[24px] font-[500] mb-[56px]">Профиль</h1>
        <div className="max-w-[930px]">
          {isLoading ? (
            <div className="w-[100%] h-[180px] bg-[#cccccc] rounded-t-[10px]"></div>
          ) : (
            <img
              className="w-[100%] h-[180px] object-cover rounded-t-[10px]"
              src={data?.bgImage}
              alt="background"
            />
          )}
          <div className="border-[1px] border-[#00000033] rounded-b-[10px] px-[32px] pb-[85px]">
            <table className="table">
              <tbody>
                <tr>
                  <th>
                    {isLoading ? (
                      <div className="min-w-[160px] h-[160px] rounded-full bg-[#cccccc]"></div>
                    ) : (
                      <img
                        className="min-w-[160px] h-[160px] rounded-full"
                        src={data?.photoURL}
                        alt="User Profile"
                      />
                    )}
                  </th>
                  <td className="align-bottom">
                    <span className="flex justify-between items-end">
                      <span className="">
                        {isLoading ? (
                          <div className="w-[100%] mb-[4px] h-[25px] rounded-[5px] bg-[#cccccc]"></div>
                        ) : (
                          <h2 className="text-[20px] mb-[4px] font-[500] text-[#000]">
                            {data?.name + " " + data?.lastName}
                          </h2>
                        )}
                        {isLoading ? (
                          <div className="w-[60%] h-[18px] rounded-[5px] bg-[#cccccc]"></div>
                        ) : (
                          <h3 className="text-[#000] text-[14px] font-[300]">
                            {data?.profession === "Пусто"
                              ? "Профессия"
                              : data?.profession}
                          </h3>
                        )}
                      </span>
                      <Link
                        href={`/personal/edit/${data?.id}`}
                        className="bg-[#1D53C5] h-[41px] text-[#fff] px-[20px] py-[8px] rounded-[6px]"
                      >
                        Редактировать
                      </Link>
                    </span>
                  </td>
                </tr>
                <tr>
                  <th className="space pt-[50px]"></th>
                  <td className="space pt-[50px]"></td>
                </tr>
                <tr>
                  <th>Описание:</th>
                  <td>
                    {isLoading ? (
                      <div>
                        <div className="w-[100%] mb-[4px] h-[20px] rounded-[5px] bg-[#cccccc]"></div>
                        <div className="w-[100%] mb-[4px] h-[20px] rounded-[5px] bg-[#cccccc]"></div>
                        <div className="w-[100%] mb-[4px] h-[20px] rounded-[5px] bg-[#cccccc]"></div>
                      </div>
                    ) : (
                      <h2>{data?.descr}</h2>
                    )}
                  </td>
                </tr>
                <tr>
                  <th className="space"></th>
                  <td className="space"></td>
                </tr>
                <tr>
                  <th>Университет:</th>
                  <td>
                    {isLoading ? (
                      <div>
                        <div className="w-[35%] mb-[4px] h-[20px] rounded-[5px] bg-[#cccccc]"></div>
                      </div>
                    ) : (
                      <h2>{data?.university}</h2>
                    )}
                  </td>
                </tr>
                <tr>
                  <th className="space"></th>
                  <td className="space"></td>
                </tr>
                <tr>
                  <th>Дата рождения:</th>
                  <td>
                    {isLoading ? (
                      <div>
                        <div className="w-[30%] mb-[4px] h-[20px] rounded-[5px] bg-[#cccccc]"></div>
                      </div>
                    ) : (
                      <h2>{data?.dateOfBirthDay}</h2>
                    )}
                  </td>
                </tr>
                <tr>
                  <th className="space"></th>
                  <td className="space"></td>
                </tr>
                <tr>
                  <th>Соц. сети</th>
                  <td>
                    {isLoading ? (
                      <div>
                        <div className="w-[40%] mb-[4px] h-[20px] rounded-[5px] bg-[#cccccc]"></div>
                      </div>
                    ) : (
                      <h2>{data?.email}</h2>
                    )}
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </Personal>
  );
}
