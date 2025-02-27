import Footer from "@/components/footer/Footer";
import Navbar from "@/components/navbar/Navbar";
import "../globals.css";

export const metadata = {
  title: "TMDBxHUB",
  description:
    "A Next.js project utilizing the TMDb API for movies and TV shows.",
};

export default function MovieLayout({ children }) {
  return (
    <>
      <Navbar />
      <div>{children}</div>
      <Footer />
    </>
  );
}
