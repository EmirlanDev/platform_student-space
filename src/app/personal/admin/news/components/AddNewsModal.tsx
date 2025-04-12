"use client";

import { useEffect } from "react";
import { Minus, Plus, X } from "lucide-react";
import {
  useAddNewsMutation,
  useEditNewsMutation,
  useGetAllNewsQuery,
} from "@/redux/api/news/news";
import { useNewsModal } from "@/zustand/allState";
import { useFormNews, useNewsDescr } from "@/zustand/newsState";
import { useUploadNewsImageMutation } from "@/redux/api/upload/upload";

export default function AddNewsModal() {
  //? RTK query
  const [addNews, { isLoading }] = useAddNewsMutation();
  const [uploadNewsImage, { isLoading: imageLoading }] =
    useUploadNewsImageMutation();
  const { refetch } = useGetAllNewsQuery();
  const [editNews, { isLoading: isEditLoading }] = useEditNewsMutation();

  //? ZUSTAND
  const { form, setField, addDescription, removeDescription, resetForm } =
    useFormNews();
  const { description, setDescr, resetDescr } = useNewsDescr();
  const { close, selectedNews } = useNewsModal();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    try {
      const response = await uploadNewsImage(formData).unwrap();
      setField("image", response.url);
    } catch (error) {
      console.error("Error uploading image:", error);
    }
  };

  const addDescriptionToArray = () => {
    if (description.trim() === "") return;

    addDescription(description);
    resetDescr();
  };

  useEffect(() => {
    if (selectedNews) {
      setField("title", selectedNews.title);
      setField("image", selectedNews.image);
      // selectedNews.descriptions.forEach((desc: string) => addDescription(desc));
      setField("descriptions", selectedNews.descriptions);
    }
  }, [selectedNews]);

  const addNewsForm = async () => {
    try {
      await addNews(form);
      resetForm();
      refetch();
      close();
    } catch (error) {
      console.error(error);
    }
  };

  console.log(selectedNews);
  console.log(form);

  const editNewsForm = async () => {
    try {
      const id = selectedNews?.id as string;
      await editNews({ id, form }).unwrap();
      resetForm();
      refetch();
      close();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div
      onClick={() => {
        close();
        resetForm();
      }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 backdrop-blur-sm"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg bg-white rounded-2xl shadow-xl p-6 h-[450px] overflow-y-auto min-[1024px]:ml-[300px]"
      >
        <button
          onClick={() => {
            close();
            resetForm();
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition"
        >
          <X className="w-6 h-6" />
        </button>

        <h2 className="text-2xl font-semibold mb-6 text-center">
          {selectedNews ? "Изменить новость" : "Добавить новость"}
        </h2>

        <form className="space-y-4">
          <label className="inline-flex items-center cursor-pointer">
            <div className="flex items-center gap-[5px] bg-blue-100 text-blue-700 font-medium py-2 px-4 rounded-lg hover:bg-blue-200 transition">
              Загрузить изображение
              {imageLoading ? (
                <span className="flex justify-center items-center gap-[10px]">
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
                        stroke="blue"
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
              ) : null}
            </div>
            <input
              onChange={handleFileChange}
              type="file"
              accept="image/*"
              className="hidden"
            />
          </label>

          {form.image && (
            <div className="mt-2">
              <img
                src={form.image}
                alt="preview"
                className="rounded-lg max-h-[200px] object-cover w-full"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Тема
            </label>
            <input
              type="text"
              placeholder="Введите заголовок"
              value={form.title}
              onChange={(e) => setField("title", e.target.value)}
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 ring-blue-500 transition"
            />
          </div>

          <div>
            {form.descriptions.map((item, idx) => (
              <h1 className="flex justify-between my-2" key={idx}>
                {item}
                <Minus
                  onClick={() => removeDescription(idx)}
                  className="hover:bg-[#1d53c5] hover:text-white rounded-sm min-w-[24px]"
                />
              </h1>
            ))}
          </div>

          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Описание
            </label>
            <textarea
              placeholder="Краткое описание"
              value={description}
              onChange={(e) => setDescr(e.target.value)}
              rows={4}
              className="w-full border rounded-lg px-4 py-2 outline-none focus:ring-2 ring-blue-500 transition resize-none"
            />
            <Plus
              onClick={addDescriptionToArray}
              className="absolute top-8 right-2 hover:bg-[#1d53c5] hover:text-white rounded-sm"
            />
          </div>

          {selectedNews ? (
            <button
              onClick={editNewsForm}
              type="submit"
              disabled={isEditLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              {isEditLoading ? "Сохранение..." : "Сохранить"}
            </button>
          ) : (
            <button
              onClick={addNewsForm}
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition"
            >
              {isLoading ? "Сохраняем..." : "Сохранить"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
}
