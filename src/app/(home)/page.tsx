import Header from "./Header";
import Hero from "./Hero";
import Info from "./Info";
import Images from "./Images";
import Footer from "./Footer";

export default function Home() {
  return (
    <div className="container">
      <Header />
      <Hero />
      <Info />
      <Images />
      <Footer />
    </div>
  );
}
