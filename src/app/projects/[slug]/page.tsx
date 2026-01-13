import client from "@/lib/contentful";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function Page({ params }: PageProps) {
    const { slug } = await params;

    const data = await client.getEntries({
        content_type: "portfolio",
        "fields.slug": slug,
        limit: 1,
    });

    const project = data.items[0].fields;

    return (
        <div className="content">
            <h1 className="heading">{project.title as string}</h1>
            <p>{project.description as string}</p>
        </div>
    );
}
