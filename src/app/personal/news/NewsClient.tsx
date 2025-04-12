"use client";
import { useGetAllNewsQuery } from "@/redux/api/news/news";
import formatDate from "@/helpers/date";
import { useRouter } from "next/navigation";

export default function NewsClient() {
  const router = useRouter();
  const { data, isLoading, error } = useGetAllNewsQuery();

  return (
    <article className="w-full">
      <h1 className="max-[1024px]:fixed text-[24px] font-[500] mb-[56px] max-[1024px]:py-[20px] max-[1024px]:top-0 max-[1024px]:text-end max-[1024px]:left-0 bg-[#ffffff] max-[1024px]:w-[100%] max-[700px]:text-[20px] pr-[90px] max-[700px]:pr-[10px]">
        Новости
      </h1>

      <div className="space-y-[41px] pb-[40px] max-[769px]:space-y-[45px] max-[1024px]:mt-[100px]">
        {isLoading
          ? [1, 2, 3, 4, 5].map((item, idx) => (
              <div
                key={idx}
                className="flex flex-col md:flex-row md:gap-[40px] rounded-md overflow-hidden bg-[#00000010] md:bg-white rounded-lg"
              >
                <div className="flex-shrink-0 w-full md:w-[357px]">
                  <div className="w-full h-[206px] rounded-sm bg-[#cccccc] animate-pulse"></div>
                </div>

                <div className="flex flex-col justify-between flex-grow p-4 md:p-0">
                  <div>
                    <h2 className="text-[24px] font-semibold mb-2">
                      <div className="w-[300px] h-[25px] rounded-full bg-[#cccccc] animate-pulse"></div>
                    </h2>
                    <h2 className="text-[12px] text-gray-500 mb-2">
                      <div className="w-[140px] h-[15px] rounded-full bg-[#cccccc] animate-pulse"></div>
                    </h2>
                    <h2 className="text-gray-700 text-[14px] leading-[1.5]">
                      <div className="w-full h-[15px] rounded-full bg-[#cccccc] animate-pulse"></div>
                      <div className="w-full h-[15px] rounded-full bg-[#cccccc] animate-pulse mt-2"></div>
                      <div className="w-full h-[15px] rounded-full bg-[#cccccc] animate-pulse mt-2"></div>
                      <div className="w-full h-[15px] rounded-full bg-[#cccccc] animate-pulse mt-2"></div>
                    </h2>
                  </div>
                </div>
              </div>
            ))
          : data &&
            data?.map((article, idx) => (
              <div
                onClick={() => router.push(`/personal/news/${article.id}`)}
                key={idx}
                className="flex flex-col md:flex-row md:gap-[40px] rounded-md overflow-hidden bg-[#00000010] md:bg-white rounded-lg"
              >
                <div className="flex-shrink-0 w-full md:w-[357px]">
                  <img
                    src={article.image}
                    alt="News image"
                    className="w-full h-[206px] object-cover rounded-sm"
                  />
                </div>

                <div className="flex flex-col justify-between flex-grow p-4 md:p-0">
                  <div>
                    <h2 className="text-[24px] font-semibold mb-2 leading-6">
                      {article.title}
                    </h2>
                    <p className="text-[12px] text-gray-500 mb-2">
                      {formatDate(article.createdAt)}
                    </p>
                    <p className="text-gray-700 text-[14px] leading-[1.5]">
                      {article.descriptions?.[0]?.slice(0, 250)}
                      {article.descriptions?.[0]?.length > 250 && "..."}
                    </p>
                  </div>
                </div>
              </div>
            ))}
      </div>
    </article>
  );
}
