import client from "@/lib/contentful";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import { Document } from "@contentful/rich-text-types";

interface PageProps {
    params: Promise<{ page: string }>;
}

export default async function Page({ params }: PageProps) {
    const { page } = await params;

    const pageContent = await client.getEntries({
        content_type: "pages",
        "fields.slug": page,
        limit: 1,
    });

    const entry = pageContent.items[0];
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
