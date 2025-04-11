"use client";

import { useGetProfileQuery } from "@/redux/api/user/user";

export default function PersonalHomePage() {
  const { data } = useGetProfileQuery();

  return (
    <div className="min-h-screen bg-white px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl sm:text-4xl font-bold text-[#1d53c5] mb-4 max-[1024px]:fixed font-[500] mb-[56px] max-[1024px]:py-[30px] max-[1024px]:top-0 max-[1024px]:text-end max-[1024px]:left-0 bg-[#ffffff] max-[1024px]:w-[100%] max-[700px]:text-[20px] pr-[90px] max-[700px]:pr-[10px]">
          Добро пожаловать, {data?.name}
        </h1>
        <p className="text-gray-700 mb-10 text-lg max-[1024px]:mt-[70px]">
          Ваш личный кабинет — быстрый доступ к основным разделам.
        </p>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <DashboardCard
            title="Профиль"
            description="Просмотрите и обновите информацию о себе."
            link="/personal/profile"
          />
          <DashboardCard
            title="Новости"
            description="Последние события и обновления платформы."
            link="/personal/news"
          />
          <DashboardCard
            title="Вопросы"
            description="Задайте вопрос или помогите другим."
            link="/personal/questions"
          />
          <DashboardCard
            title="Нетворкинг"
            description="Найдите единомышленников и экспертов."
            link="/personal/networking"
          />
          <DashboardCard
            title="Мероприятия"
            description="Вебинары, встречи и многое другое."
            link="/personal/events"
          />
          <DashboardCard
            title="Чат"
            description="Общение в реальном времени с другими пользователями."
            link="/personal/chat"
          />
          <DashboardCard
            title="Работа"
            description="Найдите интересные предложения и проекты."
            link="/personal/jobs"
          />
        </div>
      </div>
    </div>
  );
}

function DashboardCard({
  title,
  description,
  link,
}: {
  title: string;
  description: string;
  link: string;
}) {
  return (
    <a
      href={link}
      className="block bg-[#f8f9ff] p-6 rounded-2xl shadow-sm hover:shadow-lg transition-shadow duration-300 h-full border border-[#dbe3ff]"
    >
      <h2 className="text-xl font-semibold text-[#1d53c5] mb-2">{title}</h2>
      <p className="text-gray-700">{description}</p>
    </a>
  );
}
