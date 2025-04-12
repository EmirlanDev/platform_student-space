"use client";

import formatDate from "@/helpers/date";
import {
  useDeleteNewsMutation,
  useGetAllNewsQuery,
} from "@/redux/api/news/news";
import { useNewsModal } from "@/zustand/allState";
import { Trash2, ExternalLink, PencilIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import AddNewsModal from "./AddNewsModal";

export default function AddNewsClient() {
  const router = useRouter();
  //? RTK query
  const [deleteNews, { isLoading: isDelLoading, isSuccess, error }] =
    useDeleteNewsMutation();
  const { data, isLoading, refetch } = useGetAllNewsQuery();

  //? Zustand
  const { open, isOpen, setSelectedNews } = useNewsModal();

  const handleDeleteNews = async (id: string) => {
    try {
      if (confirm("Удалить новость")) {
        await deleteNews({ id }).unwrap();
        refetch();
      }
      return;
    } catch (error: any) {
      alert("Ошибка при удалении:");
    }
  };

  return (
    <div>
      <h1 className="max-[1024px]:fixed text-[24px] font-[500] mb-[56px] max-[1024px]:py-[20px] max-[1024px]:top-0 max-[1024px]:text-end max-[1024px]:left-0 bg-[#ffffff] max-[1024px]:w-[100%] max-[700px]:text-[20px] pr-[90px] max-[700px]:pr-[10px]">
        Список Новостей
      </h1>
      <div className="flex justify-end items-center mb-4 max-[1024px]:mt-[100px]">
        <button
          onClick={open}
          className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
        >
          Добавить новость
        </button>
      </div>

      <div className="overflow-x-auto rounded-md">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-200 hidden sm:table-header-group">
            <tr>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                img
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Тема
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Дата
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Описания
              </th>
              <th className="px-4 py-3 text-left text-sm font-medium text-gray-700">
                Управление
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {isLoading
              ? [1, 2, 3, 4, 5, 6, 7, 8, 9].map((item, idx) => (
                  <tr
                    key={idx}
                    className="bg-white flex flex-col sm:table-row sm:flex-none px-4 py-4 sm:px-0 sm:py-0"
                  >
                    <td className="py-2 sm:px-0 text-sm text-gray-800 max-[640px]:flex justify-between items-center">
                      <div className="sm:hidden font-semibold text-gray-500">
                        img:
                      </div>
                      <div className="w-[60px] h-[40px] bg-[#cccccc] animate-pulse rounded-lg"></div>
                    </td>
                    <td className="py-2 sm:py-4 sm:px-4 text-sm text-gray-800 max-[640px]:flex justify-between items-center">
                      <div className="sm:hidden font-semibold text-gray-500">
                        Тема:
                      </div>
                      <div className="w-[200px] h-[15px] bg-[#cccccc] animate-pulse rounded-lg"></div>
                    </td>
                    <td className="py-2 sm:py-4 sm:px-4 text-sm text-gray-800 max-[640px]:flex justify-between items-center">
                      <div className="sm:hidden font-semibold text-gray-500">
                        Дата:
                      </div>
                      <div className="w-[100px] h-[15px] bg-[#cccccc] animate-pulse rounded-lg"></div>
                    </td>
                    <td className="py-2 sm:py-4 sm:px-4 text-sm text-gray-800 max-[640px]:flex justify-between items-center">
                      <div className="sm:hidden font-semibold text-gray-500">
                        Описания:
                      </div>
                      <div className="w-[130px] h-[15px] bg-[#cccccc] animate-pulse rounded-lg"></div>
                    </td>
                    <td className="py-2 sm:py-4 sm:px-4 text-sm text-blue-600 flex items-center gap-3 max-[640px]:justify-end">
                      <PencilIcon className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-700" />
                      <ExternalLink className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-700" />
                      <Trash2 className="w-4 h-4 text-gray-500 cursor-pointer hover:text-red-600" />
                    </td>
                  </tr>
                ))
              : data &&
                data.map((article, idx) => (
                  <tr
                    key={idx}
                    className="bg-white flex flex-col sm:table-row sm:flex-none px-4 py-4 sm:px-0 sm:py-0"
                  >
                    <td className="py-2 sm:px-0 text-sm text-gray-800 max-[640px]:flex justify-between items-center">
                      <div className="sm:hidden font-semibold text-gray-500">
                        img:
                      </div>
                      <img
                        className="w-[60px] h-[40px] object-cover rounded-lg"
                        src={article.image}
                        alt="newsImage"
                      />
                    </td>
                    <td className="py-2 sm:py-4 sm:px-4 text-sm text-gray-800 max-[640px]:flex justify-between items-center">
                      <div className="sm:hidden font-semibold text-gray-500">
                        Тема:
                      </div>
                      {article.title}
                    </td>
                    <td className="py-2 sm:py-4 sm:px-4 text-sm text-gray-800 max-[640px]:flex justify-between items-center">
                      <div className="sm:hidden font-semibold text-gray-500">
                        Дата:
                      </div>
                      {formatDate(article.createdAt)}
                    </td>
                    <td className="py-2 sm:py-4 sm:px-4 text-sm text-gray-800 max-[640px]:flex justify-between items-center">
                      <div className="sm:hidden font-semibold text-gray-500">
                        Описания:
                      </div>
                      {article.descriptions
                        .slice(0, 1)
                        .map((item, id) => item.slice(0, 18))}
                      ...
                    </td>
                    <td className="py-2 sm:py-4 sm:px-4 text-sm text-blue-600 flex items-center gap-3 max-[640px]:justify-end">
                      <PencilIcon
                        onClick={() => {
                          setSelectedNews(article);
                          open();
                        }}
                        className="w-4 h-4 text-gray-500 cursor-pointer hover:text-green-700"
                      />
                      <ExternalLink
                        onClick={() =>
                          router.push(`/personal/news/${article.id}`)
                        }
                        className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-700"
                      />
                      <Trash2
                        onClick={() => handleDeleteNews(article.id)}
                        className="w-4 h-4 text-gray-500 cursor-pointer hover:text-red-600"
                      />
                    </td>
                  </tr>
                ))}
          </tbody>
        </table>
      </div>
      {isOpen ? <AddNewsModal /> : null}
    </div>
  );
}
