import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Home",
};

export default async function Home() {
    return (
        <div className="content my-auto">
            <section className="flex flex-col gap-8">
                <h1 className="sm:text-4xl text-3xl font-medium">
                    <div className="flex gap-2 items-center mb-4">
                        <span className="text-neutral-500">Hello</span>
                        <span>👋</span>
                    </div>
                    I&apos;m Alexander Eriksson, Fullstack developer
                </h1>
                <div className="flex gap-4">
                    <Link href="/projects" className="button">
                        Projects
                    </Link>
                    <Link href="/contact" className="button">
                        Contact me
                    </Link>
                </div>
            </section>
        </div>
    );
}
