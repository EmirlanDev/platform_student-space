"use client";
import { use, useEffect, useState } from "react";
import { useGetProfileQuery, useGetUserByIdQuery } from "@/redux/api/user/user";
import { useEditUserMutation } from "@/redux/api/auth/auth";
import { useRouter } from "next/navigation";
import {
  useUploadBgImageMutation,
  useUploadImageMutation,
} from "@/redux/api/upload/upload";

export default function EditUserClient({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolveParams = use(params);
  const { id } = resolveParams;
  const router = useRouter();
  const [values, setValues] = useState({
    bgImage: "",
    photoURL: "",
    name: "",
    lastName: "",
    profession: "",
    descr: "",
    university: "",
    dateOfBirthDay: "",
    email: "",
  });

  //? Get RTK query запрос
  const {
    data: userData,
    isLoading: isUserLoading,
    error: userError,
  } = useGetUserByIdQuery(id);

  const [editUser, { isLoading: isEditLoading, error: editError }] =
    useEditUserMutation();

  const { refetch } = useGetProfileQuery();

  const [uploadImage, { isLoading: isUploadLoading }] =
    useUploadImageMutation();

  const [uploadBgImage, { isLoading: isUploadBgLoading }] =
    useUploadBgImageMutation();

  //? Get RTK query запрос

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await uploadImage(formData).unwrap();
      setValues((prevData) => ({
        ...prevData,
        photoURL: response.url,
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const handleBgFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await uploadBgImage(formData).unwrap();
      setValues((prevData) => ({
        ...prevData,
        bgImage: response.url,
      }));
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  useEffect(() => {
    if (userData) {
      setValues({
        bgImage: userData.bgImage || "",
        photoURL: userData.photoURL || "",
        name: userData.name || "",
        lastName: userData.lastName || "",
        profession: userData.profession || "",
        descr: userData.descr || "",
        university: userData.university || "",
        dateOfBirthDay: userData.dateOfBirthDay || "",
        email: userData.email,
      });
    }
  }, [userData]);

  const handleInput = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setValues((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleEdit = async () => {
    try {
      await editUser({ id, values }).unwrap();
      refetch();
      router.push("/personal/profile");
    } catch (error) {
      console.log("dont edit");
    }
  };

  return (
    <div>
      <h1 className="text-[24px] font-[500] mb-[56px] max-[1024px]:mb-[25px] max-[1024px]:text-end max-[700px]:text-[20px]">
        Редактировать Профиль
      </h1>
      <div className="w-[100%] flex flex-col justify-center">
        {isUserLoading ? (
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
        ) : isUploadBgLoading ? (
          <div className="relative flex items-center justify-center w-[100%] h-[180px] max-[500px]:h-[120px] rounded-t-[10px]">
            <img
              src={values.bgImage || userData?.bgImage}
              alt="background"
              className="w-full h-[180px] object-cover rounded-t-[10px]"
            />
            <svg
              className="absolute"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid"
              width="100"
              height="100"
              xmlnsXlink="http://www.w3.org/1999/xlink"
            >
              <g>
                <circle
                  strokeDasharray="164.93361431346415 56.97787143782138"
                  r="35"
                  strokeWidth="5"
                  stroke="#1d53c580"
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
          </div>
        ) : (
          <div className="relative">
            <img
              src={values.bgImage || userData?.bgImage}
              alt="background"
              className="w-full h-[180px] object-cover rounded-t-[10px]"
            />

            <label className="absolute md:bottom-4 max-[767]:top-4 right-4 z-2 pointer-events-auto flex items-center gap-2 cursor-pointer bg-[#1d53c590] hover:bg-[#1d53c5] text-white text-sm font-semibold px-4 py-1.5 rounded-full transition">
              <input
                onChange={handleBgFileChange}
                type="file"
                className="hidden"
              />
              <svg
                className="w-5 h-5"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 18V8a1 1 0 011-1h1.5l1.707-1.707A1 1 0 018.914 5h6.172a1 1 0 01.707.293L17.5 7H19a1 1 0 011 1v10a1 1 0 01-1 1H5a1 1 0 01-1-1Z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0Z"
                />
              </svg>
              Изменить
            </label>
          </div>
        )}
        <div className="border-[1px] border-[#00000033] rounded-b-[10px] px-[32px] max-[700px]:px-[22px] pb-[85px] max-[700px]:pb-[30px]">
          <table className="mt-[-69px] max-[800px]:mt-[-45px] translate-y-0 w-full">
            <tbody>
              <tr className="max-[700px]:flex max-[700px]:flex-col max-[700px]:items-center">
                <th className="max-[700px]:mb-[15px]">
                  {isUserLoading ? (
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
                  ) : isUploadLoading ? (
                    <div className="relative flex items-center justify-center min-w-[160px] max-w-[160px] max-[800px]:min-w-[130px] max-[800px]:max-w-[130px] h-[160px] max-[800px]:h-[130px] rounded-full">
                      <img
                        className="w-[160px] min-w-[160px] h-[160px] max-[800px]:w-[130px] max-[800px]:min-w-[130px] max-[800px]:h-[130px] rounded-full object-cover"
                        src={values.photoURL || userData?.photoURL}
                        alt="User Profile"
                      />
                      <div className="absolute top-0 left-0 w-[160px] h-[160px] max-[800px]:w-[130px] max-[800px]:h-[130px] flex items-center justify-center rounded-full bg-[#00000060]">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 100 100"
                          preserveAspectRatio="xMidYMid"
                          width="100"
                          height="100"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                        >
                          <g>
                            <circle
                              strokeDasharray="164.93361431346415 56.97787143782138"
                              r="35"
                              strokeWidth="5"
                              stroke="#1d53c580"
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
                      </div>
                    </div>
                  ) : (
                    <label className="relative block w-fit mx-auto">
                      <img
                        className="w-[160px] min-w-[160px] h-[160px] max-[800px]:w-[130px] max-[800px]:min-w-[130px] max-[800px]:h-[130px] rounded-full object-cover"
                        src={values.photoURL || userData?.photoURL}
                        alt="User Profile"
                      />
                      <input
                        className="hidden"
                        type="file"
                        onChange={handleFileChange}
                      />
                      <div className="absolute top-0 left-0 w-[160px] h-[160px] max-[800px]:w-[130px] max-[800px]:h-[130px] flex items-center justify-center rounded-full bg-[#00000060]">
                        <svg
                          className="w-10 h-10 text-gray-800 dark:text-white"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            fillRule="evenodd"
                            d="M7.5 4.586A2 2 0 0 1 8.914 4h6.172a2 2 0 0 1 1.414.586L17.914 6H19a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h1.086L7.5 4.586ZM10 12a2 2 0 1 1 4 0 2 2 0 0 1-4 0Zm2-4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </label>
                  )}
                </th>
                <td className="align-bottom pl-[37px] max-[800px]:pl-[17px] max-[700px]:pl-0 max-[700px]:text-center">
                  <span className="flex max-[700px]:flex-col max-[700px]:items-center justify-between items-end">
                    <span className="max-[700px]:mb-[10px]">
                      <div className=" mb-[4px] text-[#000] flex gap-[4px]">
                        <input
                          className="border-[1px] border-[#ccc] rounded-[4px] px-[10px] w-[35%] max-[700]:w-[45%]"
                          type="text"
                          onChange={handleInput}
                          value={values.name}
                          name="name"
                          placeholder="Имя"
                        />
                        <input
                          className="border-[1px] border-[#ccc] rounded-[4px] px-[10px] w-[45%] max-[700]:w-[55%]"
                          type="text"
                          onChange={handleInput}
                          value={values.lastName}
                          name="lastName"
                          placeholder="Фамилия"
                        />
                      </div>

                      <input
                        className="border-[1px] border-[#ccc] rounded-[4px] px-[10px] w-[50%] text-[#000] text-[14px] font-[300]  max-[700]:w-[100%]"
                        type="text"
                        onChange={handleInput}
                        value={values.profession}
                        name="profession"
                        placeholder="Профессия"
                      />
                    </span>
                    <button
                      onClick={handleEdit}
                      className="bg-[#1D53C5] h-[41px] text-[#fff] px-[20px] py-[8px] rounded-[6px] max-[700px]:w-[70%] text-center"
                    >
                      {isEditLoading ? (
                        <span className="flex justify-center gap-[10px]">
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
                          Сохранение
                        </span>
                      ) : (
                        "Сохранить"
                      )}
                    </button>
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
                <td className="pl-[37px] max-[800px]:pl-[17px] max-[700px]:pl-0 max-[700px]:text-left w-[100%]">
                  <textarea
                    onChange={handleInput}
                    value={values.descr}
                    name="descr"
                    className="border-[1px] border-[#ccc] rounded-[4px] px-[10px] py-[2px] w-[100%] min-h-[100px] max-h-[200px] h-[100%] max-[700px]:w-[100%]"
                    placeholder="Введите Описание"
                  ></textarea>
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
                <td className="pl-[37px] max-[800px]:pl-[17px] max-[700px]:pl-0 max-[700px]:text-left w-[100%]">
                  <input
                    className="border-[1px] border-[#ccc] rounded-[4px] px-[10px] py-[2px] w-[35%] max-[700px]:w-[60%]"
                    type="text"
                    onChange={handleInput}
                    value={values.university}
                    name="university"
                    placeholder="Введите Университет"
                  />
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
                <td className="pl-[37px] max-[800px]:pl-[17px] max-[700px]:pl-0 max-[700px]:text-left w-[100%]">
                  <input
                    className="border-[1px] border-[#ccc] rounded-[4px] px-[10px] py-[2px] w-[25%] max-[700px]:w-[55%]"
                    type="date"
                    onChange={handleInput}
                    value={values.dateOfBirthDay}
                    name="dateOfBirthDay"
                  />
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
                <td className="pl-[37px] max-[800px]:pl-[17px] max-[700px]:pl-0 max-[700px]:text-left">
                  {isUserLoading ? (
                    <div>
                      <div className="w-[40%] mb-[4px] h-[20px] rounded-[10px] bg-[#cccccc] animate-pulse"></div>
                    </div>
                  ) : (
                    <h2>{userData?.email}</h2>
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
