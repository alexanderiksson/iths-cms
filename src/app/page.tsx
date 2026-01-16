import type { Metadata } from "next";
import Link from "next/link";
import fetchPage from "@/lib/fetchPage";
import { Document } from "@contentful/rich-text-types";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";

/* Generate metadata from contentful */
export async function generateMetadata(): Promise<Metadata> {
    const entry = await fetchPage("/");
    if (!entry) return { title: "404 - Page not found" };

    const { metatitle, metaDescription } = entry.fields as {
        metatitle: string;
        metaDescription: string;
    };

    return { title: metatitle, description: metaDescription };
}

/* Render page */
export default async function Home() {
    const pageContent = await fetchPage("/");

    const { content } = pageContent.fields as {
        content: Document;
    };

    return (
        <div className="content my-auto">
            <section className="flex flex-col gap-6">
                <div className="sm:text-4xl text-3xl font-medium leading-normal">
                    {documentToReactComponents(content)}
                </div>

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
