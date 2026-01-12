import { notFound } from "next/navigation";
import type { Metadata } from "next";
import client from "@/lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";

interface PageProps {
    params: Promise<{ page: string }>;
}

async function fetchPage(slug: string) {
    const pageContent = await client.getEntries({
        content_type: "pages",
        "fields.slug": slug,
        limit: 1,
    });

    return pageContent.items[0];
}

export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { page } = await params;

    const entry = await fetchPage(page);
    if (!entry) return { title: "404 - Page not found" };

    const { metatitle } = entry.fields as { metatitle: string };
    return { title: metatitle };
}

export default async function Page({ params }: PageProps) {
    const { page } = await params;
    const entry = await fetchPage(page);

    if (!entry) return notFound();

    const { title, content } = entry.fields as {
        title: string;
        content: Document;
    };

    return (
        <div className="content">
            <h1 className="heading">{title}</h1>
            <div>{documentToReactComponents(content)}</div>
        </div>
    );
}
