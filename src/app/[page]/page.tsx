import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { BLOCKS } from "@contentful/rich-text-types";
import type { Document } from "@contentful/rich-text-types";
import fetchPage from "@/lib/fetchPage";
import Image from "next/image";

interface PageProps {
    params: Promise<{ page: string }>;
}

/* Generate metadata from contentful */
export async function generateMetadata({
    params,
}: PageProps): Promise<Metadata> {
    const { page } = await params;

    const entry = await fetchPage(page);
    if (!entry) return { title: "404 - Page not found" };

    const { metatitle, metaDescription } = entry.fields as {
        metatitle: string;
        metaDescription: string;
    };

    return { title: metatitle, description: metaDescription };
}

/* Render page */
export default async function Page({ params }: PageProps) {
    const { page } = await params;

    const pageContent = await fetchPage(page);

    if (!pageContent) return notFound();

    const { title, content } = pageContent.fields as {
        title: string;
        content: Document;
    };

    return (
        <div className="content">
            <h1 className="heading">{title}</h1>
            <section className="rich-text">
                {documentToReactComponents(content, {
                    renderNode: {
                        [BLOCKS.EMBEDDED_ASSET]: (node) => {
                            const { file, title } = node.data.target.fields;
                            return (
                                <Image
                                    src={`https:${file.url}`}
                                    alt={title}
                                    width={file.details?.image?.width}
                                    height={file.details?.image?.height}
                                />
                            );
                        },
                    },
                })}
            </section>
        </div>
    );
}
