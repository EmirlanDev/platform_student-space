"use client";
import Personal from "../../layout";
import { use, useEffect, useState } from "react";
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

  const [uploadImage, { isLoading }] = useUploadImageMutation();

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
      console.log("no edit");
    }
  };

  console.log(values);

  return (
    <Personal>
      <div className="py-[32px] px-[40px] ml-[370px]">
        <h1 className="text-[24px] font-[500] mb-[56px]">Профиль</h1>
        <div className="max-w-[930px] min-w-[810px]">
          {isUserLoading ? (
            <div className="w-[100%] h-[180px] bg-[#cccccc] rounded-t-[10px]"></div>
          ) : (
            <img
              className="w-[100%] h-[180px] object-cover rounded-t-[10px]"
              src={userData?.bgImage}
              alt="background"
            />
          )}
          <div className="border-[1px] border-[#00000033] rounded-b-[10px] px-[32px] pb-[85px]">
            <table className="table">
              <tbody>
                <tr>
                  <th>
                    {isUserLoading ? (
                      <div className="min-w-[160px] h-[160px] rounded-full bg-[#cccccc]"></div>
                    ) : (
                      <label>
                        <img
                          className="min-w-[160px] h-[160px] rounded-full"
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
                  <td className="align-bottom">
                    <span className="flex justify-between items-end">
                      <span className="max-w-[400px] w-[100%]">
                        <div className="text-[20px] mb-[4px] font-[500] text-[#000] flex gap-[4px]">
                          <input
                            className="border-[1px] border-[#ccc] rounded-[4px] px-[10px] w-[35%]"
                            type="text"
                            onChange={handleInput}
                            value={values.name}
                            name="name"
                            placeholder="Имя"
                          />
                          <input
                            className="border-[1px] border-[#ccc] rounded-[4px] px-[10px] w-[45%]"
                            type="text"
                            onChange={handleInput}
                            value={values.lastName}
                            name="lastName"
                            placeholder="Фамилия"
                          />
                        </div>

                        <input
                          className="border-[1px] border-[#ccc] rounded-[4px] px-[10px] w-[50%] text-[#000] text-[14px] font-[300]"
                          type="text"
                          onChange={handleInput}
                          value={values.profession}
                          name="profession"
                          placeholder="Профессия"
                        />
                      </span>
                      <button
                        onClick={handleEdit}
                        className="bg-[#1D53C5] h-[41px] text-[#fff] px-[20px] py-[8px] rounded-[6px]"
                      >
                        Сохранить
                      </button>
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
                    <textarea
                      onChange={handleInput}
                      value={values.descr}
                      name="descr"
                      className="border-[1px] border-[#ccc] rounded-[4px] px-[10px] py-[2px] w-[100%] max-h-[100px] h-[100%]"
                      placeholder="Введите Описание"
                    ></textarea>
                  </td>
                </tr>
                <tr>
                  <th className="space"></th>
                  <td className="space"></td>
                </tr>
                <tr>
                  <th>Университет:</th>
                  <td>
                    <input
                      className="border-[1px] border-[#ccc] rounded-[4px] px-[10px] py-[2px] w-[35%]"
                      type="text"
                      onChange={handleInput}
                      value={values.university}
                      name="university"
                      placeholder="Введите Университет"
                    />
                  </td>
                </tr>
                <tr>
                  <th className="space"></th>
                  <td className="space"></td>
                </tr>
                <tr>
                  <th>Дата рождения:</th>
                  <td>
                    <input
                      className="border-[1px] border-[#ccc] rounded-[4px] px-[10px] py-[2px] w-[25%]"
                      type="date"
                      onChange={handleInput}
                      value={values.dateOfBirthDay}
                      name="dateOfBirthDay"
                    />
                  </td>
                </tr>
                <tr>
                  <th className="space"></th>
                  <td className="space"></td>
                </tr>
                <tr>
                  <th>Соц. сети</th>
                  <td>
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
    </Personal>
  );
}
