import Footer from "./components/Footer";
import Header from "./components/Header";
import ImageComponent from "./components/Image";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="relative min-h-screen flex flex-col font-sans text-black">
        {/* พื้นหลัง + ความโปร่งแสง */}
        <div className="absolute inset-0 -z-10">
          <ImageComponent
            src="/Homepage/แผ่นดินไหว.jpg"
            alt="Background"
            classNames="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-white/40" /> {/* ความโปร่งแสง */}
        </div>

        {/* Content */}
        <Header />
        <main className="flex-grow">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
