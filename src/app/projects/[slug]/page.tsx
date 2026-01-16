import client from "@/lib/contentful";
import { notFound } from "next/navigation";
import { Asset } from "contentful";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";
import Tags from "@/components/Tags";
import Breadcrumbs from "@/components/Breadcrumbs";

interface PageProps {
    params: Promise<{ slug: string }>;
}

export default async function ProjectPage({ params }: PageProps) {
    const { slug } = await params;

    const portfolioEntry = await client.getEntries({
        content_type: "portfolio",
        "fields.slug": slug,
        limit: 1,
    });

    const project = portfolioEntry.items[0];

    if (!project) return notFound();

    const title = project.fields.title as string;
    const img = project.fields.image as Asset;
    const tags = project.fields.tags as Array<string> | undefined;
    const description = project.fields.description as string | undefined;
    const githubLink = project.fields.githubLink as string | undefined;
    const url = project.fields.url as string | undefined;

    return (
        <div className="content flex flex-col gap-10">
            <Breadcrumbs
                currentPage={title}
                links={[
                    {
                        name: "Projects",
                        href: "/projects",
                    },
                ]}
            />

            <section
                className="w-full sm:py-20 py-12 sm:px-10 px-6 flex flex-col justify-center gap-6 rounded-2xl"
                style={{
                    backgroundImage: img
                        ? `url(https:${img.fields.file?.url})`
                        : "url(/placeholder.png)",
                    backgroundColor: "rgba(0, 0, 0, 0.6)",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundBlendMode: "multiply",
                }}
            >
                <h1 className="text-white sm:text-4xl text-3xl font-semibold">
                    {title}
                </h1>

                {tags && <Tags tags={tags} />}
            </section>

            {description && <p>{description}</p>}

            {(githubLink || url) && (
                <section className="flex gap-4">
                    {githubLink && (
                        <Link
                            href={githubLink}
                            className="button"
                            target="_blank"
                        >
                            Show on Github <FaGithub size={20} />
                        </Link>
                    )}

                    {url && (
                        <Link href={url} className="button" target="_blank">
                            Live demo <HiOutlineExternalLink size={20} />
                        </Link>
                    )}
                </section>
            )}
        </div>
    );
}
