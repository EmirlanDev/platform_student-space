export default function Info() {
  return (
    <section className="py-6">
      <div className="w-full">
        <div className="w-full rounded-xl border-[3px] border-solid border-[#0000003d] max-[600px]:px-[25px] px-[51px] max-[600px]:py-[20px] py-[30px]">
          <p className="font-normal text-black md:text-2xl text-xl max-[600px]:text-[18px]">
            Модель подписки и размещение рекламы предоставляют потенциальные
            источники дохода для проекта. На основе анализа рынка можно сделать
            вывод, что &#34;Students Space&#34; имеет потенциал привлечь
          </p>
          <p className="md:h-[73px] h-[35px]"></p>
        </div>
      </div>
      <div className="md:mt-[-73px] mt-[-35px] grid grid-cols-1 md:grid-cols-3 md:gap-[72px] gap-[25px] max-[600px]:px-[15px] px-[42px]">
        {[1, 2, 3].map((num) => (
          <div
            key={num}
            className="bg-white p-4 rounded-lg shadow-[0px_4px_14.8px_#00000026]"
          >
            <h3 className="md:text-3xl text-2xl font-semibold leading-10">
              <span className="text-[#00000050]">0{num}.</span>
              <br className="hidden md:block" /> Текст
            </h3>
            <p className="text-gray-600 mt-[10px] md:text-[18px]">
              Модель подписки и размещение рекламы предоставляют потенциальные
              источники дохода на основе анализа рынка.
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
