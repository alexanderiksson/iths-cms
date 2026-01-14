import client from "@/lib/contentful";
import { notFound } from "next/navigation";
import { Asset } from "contentful";
import Link from "next/link";

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
    const tags = project.fields.tags as Array<string>;

    return (
        <div className="content flex flex-col gap-10">
            <div
                className="w-full sm:py-32 py-16 sm:px-10 px-6 flex flex-col justify-center gap-4 rounded-2xl"
                style={{
                    backgroundImage: `url(https:${img.fields.file?.url})`,
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "120%",
                    backgroundPosition: "center",
                    backgroundBlendMode: "multiply",
                }}
            >
                <h1 className="text-white sm:text-5xl text-4xl font-semibold">
                    {project.fields.title as string}
                </h1>
            </div>

            <div className="flex items-center flex-wrap gap-4">
                {tags &&
                    tags.map((tag, i) => (
                        <span
                            key={i}
                            className="bg-neutral-200 py-1 px-4 rounded-full"
                        >
                            {tag}
                        </span>
                    ))}
            </div>

            <p>{project.fields.description as string}</p>

            <div className="flex">
                <Link
                    href={project.fields.githubLink as string}
                    className="button"
                    target="_blank"
                >
                    Show on Github
                </Link>
            </div>
        </div>
    );
}
