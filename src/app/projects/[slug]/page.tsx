import client from "@/lib/contentful";
import { notFound } from "next/navigation";
import Image from "next/image";
import { Asset } from "contentful";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
    const { slug } = await params;

    const entry = await client.getEntries({
        content_type: "portfolio",
        "fields.slug": slug,
        limit: 1,
    });

    const project = entry.items[0];

    if (!project) return notFound();

    const img = project.fields.image as Asset;

    return (
        <div className="content">
            <h1 className="heading">{project.fields.title as string}</h1>
            <p>{project.fields.description as string}</p>

            <div className="relative w-full overflow-hidden aspect-4/3">
                <Image
                    src={`https:${img.fields.file?.url}`}
                    alt={img.fields.title as string}
                    fill
                    className="object-contain"
                />
            </div>
        </div>
    );
}
