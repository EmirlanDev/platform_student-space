import Image from "next/image";
import heroImage from "../../../assets/hero.png";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="relative text-center md:mb-12 mb-5 mt-22">
      <div className="container">
        <Image
          src={heroImage}
          alt="Hero Image"
          width={1200}
          height={500}
          className="rounded-lg mx-auto max-[600px]:h-[300px] object-cover"
        />
        <div className="absolute md:top-10 top-2 left-[50%] translate-x-[-50%]">
          <h2 className="text-[48px] max-[1024px]:text-[34px] max-[750px]:text-[25px] max-[560px]:text-[20px] font-bold mt-6 mb-[50px] max-[750px]:mb-[25px]">
            Ваш универсальный <br /> инструмент для успеха в учебе
          </h2>
          <Link
            href="/register"
            className="bg-black rounded-md hover:bg-gray-800 md:text-[24px] text-[18px] text-white px-[40px] py-[12px]"
          >
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </section>
  );
}
