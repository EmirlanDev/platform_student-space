import Link from "next/link";

export default function Header() {
  return (
    <header className="fixed top-0 bg-[white] z-10 w-[100%] py-4">
      <div className="container">
        <div className="mx-auto flex justify-between items-center">
          <h1 className="text-[20px] max-w-[77px] leading-6 font-bold">
            Student Space
          </h1>
          <div className="flex items-center gap-[20px]">
            <nav className="hidden md:flex space-x-6">
              <Link href="#" className="text-gray-700 hover:text-black">
                Консультация
              </Link>
              <Link href="#" className="text-gray-700 hover:text-black">
                Контакты
              </Link>
            </nav>
            <Link
              href="/login"
              className="bg-black text-white px-4 py-2 rounded-md hover:bg-gray-800"
            >
              Войти
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
