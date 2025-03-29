import NavLink from "@/components/NavLink";
import Section from "./Section";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <div className="flex gap-[50px]">
        <Link href="/login">Вход</Link>
        <Link href="/register">Регистрация</Link>
      </div>
      <Section />
    </div>
  );
}
