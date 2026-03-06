import client from "@/lib/contentful";
import { notFound } from "next/navigation";
import { Asset } from "contentful";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";
import { HiOutlineExternalLink } from "react-icons/hi";
import Tags from "@/components/Tags";
import Breadcrumbs from "@/components/Breadcrumbs";
import AnimatedContent from "@/components/ui/AnimatedContent";

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

    const imgUrl = img?.fields.file?.url
        ? `https:${img.fields.file.url}`
        : "/portfolio-placeholder.png";

    return (
        <div className="content flex flex-col gap-10">
            <Breadcrumbs
                currentPage={title}
                links={[{ name: "Projects", href: "/projects" }]}
            />

            <AnimatedContent
                distance={16}
                direction="vertical"
                reverse={false}
                duration={1}
                initialOpacity={0}
                animateOpacity
                scale={1}
                threshold={0.1}
                delay={0}
            >
                <section
                    className="w-full min-h-72 sm:min-h-96 flex flex-col justify-end gap-4 rounded-3xl p-6 sm:p-10"
                    style={{
                        backgroundImage: `linear-gradient(to top, rgba(0,0,0,0.9) 0%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0.5) 100%), url(${imgUrl})`,
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "50% 25%",
                    }}
                >
                    {tags && <Tags tags={tags} className="bg-white/15 border border-white/30 text-white backdrop-blur-sm" />}

                    <h1 className="text-white sm:text-5xl text-3xl font-semibold leading-tight">
                        {title}
                    </h1>
                </section>
            </AnimatedContent>

            <AnimatedContent
                distance={16}
                direction="vertical"
                reverse={false}
                duration={1}
                initialOpacity={0}
                animateOpacity
                scale={1}
                threshold={0.1}
                delay={0.15}
            >
                <div className="flex flex-col gap-8">
                    {description && (
                        <p className="text-lg leading-relaxed">{description}</p>
                    )}

                    {(githubLink || url) && (
                        <div className="flex flex-wrap gap-3">
                            {githubLink && (
                                <Link
                                    href={githubLink}
                                    className="button"
                                    target="_blank"
                                >
                                    <FaGithub size={18} /> GitHub
                                </Link>
                            )}
                            {url && (
                                <Link
                                    href={url}
                                    className="button-2"
                                    target="_blank"
                                >
                                    Live demo{" "}
                                    <HiOutlineExternalLink size={18} />
                                </Link>
                            )}
                        </div>
                    )}
                </div>
            </AnimatedContent>
        </div>
    );
}
