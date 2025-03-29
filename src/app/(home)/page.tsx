import NavLink from "@/components/NavLink";
import Section from "./Section";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <Link href="/login">Вход</Link>
      <Link href="/login">Регистрация</Link>
      <Section />
    </div>
  );
}
