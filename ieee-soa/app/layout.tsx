import type { Metadata } from "next";
import "../styles/globals.css";
import Cursor from "@/components/Cursor";
import BackgroundCanvas from "@/components/BackgroundCanvas";
import Navbar from "@/components/Navbar";
import { Toast } from "@/components/UI";

export const metadata: Metadata = {
  title: "IEEE SOA Student Branch",
  description: "IEEE Siksha 'O' Anusandhan Student Branch — advancing technology for humanity at SOA University, Bhubaneswar.",
  keywords: "IEEE, SOA, Student Branch, Computer Society, Bhubaneswar, Odisha",
  openGraph: { title:"IEEE SOA Student Branch", description:"Advancing technology for humanity at SOA University.", type:"website" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Cursor />
        <BackgroundCanvas />
        <Toast>
          <Navbar />
          <main style={{ position:"relative", zIndex:10 }}>{children}</main>
        </Toast>
      </body>
    </html>
  );
}
