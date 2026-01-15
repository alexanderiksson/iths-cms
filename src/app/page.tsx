import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Home",
    description:
        "Welcome to my personal website where I showcase my projects and skills as a frontend developer.",
};

export default async function Home() {
    return (
        <div className="content my-auto">
            <section className="flex flex-col gap-8">
                <h1 className="sm:text-4xl text-3xl font-medium">
                    <div className="flex gap-1 items-center mb-4">
                        <span className="text-neutral-500">Hello</span>
                        <span>👋</span>
                    </div>
                    <span>I&apos;m Alexander Eriksson, frontend developer</span>
                </h1>
                <div className="flex gap-4">
                    <Link href="/projects" className="button">
                        Projects
                    </Link>
                    <Link href="/contact" className="button-2">
                        Contact me
                    </Link>
                </div>
            </section>
        </div>
    );
}
