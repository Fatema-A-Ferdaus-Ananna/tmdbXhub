import "./globals.css";
import AuthProvider from "./providers/AuthProvider";

export const metadata = {
  title: "TMDBxHUB",
  description:
    "A Next.js project utilizing the TMDb API for movies and TV shows.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-black text-white">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
