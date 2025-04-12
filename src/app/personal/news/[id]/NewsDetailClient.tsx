"use client";

import { use } from "react";
import { useGetNewsByIdQuery } from "@/redux/api/news/news";
import formatDate from "@/helpers/date";

export default function NewsDetailClient({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolveParams = use(params);
  const { id } = resolveParams;

  const {
    data: newsData,
    isLoading: isNewsLoading,
    error: isNewsError,
  } = useGetNewsByIdQuery(id);

  if (isNewsLoading) {
    return (
      <div className="flex items-center justify-center h-[100vh]">
        <div className="flex flex-row gap-3">
          <div className="w-5 h-5 rounded-full bg-[#1D53C5] animate-bounce [animation-delay:.7s]"></div>
          <div className="w-5 h-5 rounded-full bg-[#1D53C5] animate-bounce [animation-delay:.3s]"></div>
          <div className="w-5 h-5 rounded-full bg-[#1D53C5] animate-bounce [animation-delay:.7s]"></div>
        </div>
      </div>
    );
  }

  return (
    <main className="flex justify-center">
      <div className="w-full h-[90px] fixed bg-white top-0 left-0 hidden max-[1024px]:flex"></div>
      <div className="max-w-2xl w-full bg-white md:p-10 text-center max-[1024px]:mt-[60px]">
        <h1 className="text-2xl md:text-3xl font-semibold mb-2">
          {newsData?.title}
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          {formatDate(newsData?.createdAt as string)}
        </p>
        <img
          src={newsData?.image}
          alt="ChatGPT"
          className="mx-auto mb-6 rounded-lg"
        />
        {newsData?.descriptions.map((item, idx) => (
          <div key={idx} className="space-y-4 text-start text-gray-700 ">
            <p className="my-2">
              <span className="ml-4"></span>
              {item}
            </p>
          </div>
        ))}
      </div>
    </main>
  );
}
