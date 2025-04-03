"use client";
import React, { use, useEffect, useState } from "react";
import { useGetProfileQuery, useGetUserByIdQuery } from "@/redux/api/user/user";
import { useEditUserMutation } from "@/redux/api/auth/auth";
import { useRouter } from "next/navigation";
import { useUploadImageMutation } from "@/redux/api/upload/upload";

export default function Edit({ params }: { params: Promise<{ id: string }> }) {
  const resolveParams = use(params);
  const { id } = resolveParams;
  const router = useRouter();
  const [image, setImage] = useState<File | string>("");
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

  //? Get RTK query запрос

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
    }

    if (!image) return;

    const formData = new FormData();
    formData.append("image", image);

    try {
      const response = await uploadImage(formData).unwrap();
      setValues((prevData) => ({
        ...prevData,
        photoURL: response.processedImagePath,
      }));

      console.log(response.processedImagePath);

      console.log(response.processedImagePath);
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
          <div className="w-[100%] h-[180px] max-[500px]:h-[120px] bg-[#cccccc] rounded-t-[10px]"></div>
        ) : (
          <img
            className="w-[100%] h-[180px] max-[500px]:h-[120px] object-cover rounded-t-[10px]"
            src={userData?.bgImage}
            alt="background"
          />
        )}
        <div className="border-[1px] border-[#00000033] rounded-b-[10px] px-[32px] max-[700px]:px-[22px] pb-[85px] max-[700px]:pb-[30px]">
          <table className="mt-[-69px] max-[800px]:mt-[-45px] translate-y-0 w-full">
            <tbody>
              <tr className="max-[700px]:flex max-[700px]:flex-col max-[700px]:items-center">
                <th className="max-[700px]:mb-[15px]">
                  {isUserLoading ? (
                    <div className="min-w-[160px] max-w-[160px] max-[800px]:min-w-[130px] max-[800px]:max-w-[130px] h-[160px] max-[800px]:h-[130px] rounded-full bg-[#cccccc]"></div>
                  ) : isUploadLoading ? (
                    <div className="min-w-[160px] h-[160px] rounded-full bg-[red] flex items-center justify-center">
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
                    </div>
                  ) : (
                    <label>
                      <img
                        className="min-w-[160px] max-[800px]:min-w-[130px] h-[160px] max-[800px]:h-[130px] rounded-full"
                        src={userData?.photoURL}
                        alt="User Profile"
                      />
                      <input
                        className="hidden"
                        type="file"
                        onChange={handleFileChange}
                      />
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
                      <div className="w-[40%] mb-[4px] h-[20px] rounded-[5px] bg-[#cccccc]"></div>
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
