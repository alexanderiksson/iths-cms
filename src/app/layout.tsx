import type { Metadata } from "next";
import { Albert_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "../components/Navbar";

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
        <html lang="en">
            <body className={albertSans.className}>
                <Navbar />
                <main className="lg:ml-56 lg:mt-20 mt-32 mb-12 flex flex-col">
                    {children}
                </main>
            </body>
        </html>
    );
}
