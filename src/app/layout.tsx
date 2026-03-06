import type { Metadata } from "next";
import { Albert_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";
import MobileNav from "@/components/MobileNav";

const albertSans = Albert_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
    title: "Portfolio",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                <script dangerouslySetInnerHTML={{ __html: `(function(){var s=localStorage.getItem('theme');if(s==='dark'||(s===null&&window.matchMedia('(prefers-color-scheme: dark)').matches))document.documentElement.classList.add('dark')})()` }} />
            </head>
            <body className={albertSans.className}>
                <Navbar />
                <MobileNav />
                <main className="lg:ml-56 lg:mt-8 mt-24 mb-8 flex flex-col">
                    {children}
                </main>
            </body>
        </html>
    );
}
