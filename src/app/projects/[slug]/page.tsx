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
                    className="w-full sm:py-20 py-12 sm:px-10 px-6 flex flex-col justify-center gap-6 rounded-2xl"
                    style={{
                        backgroundImage: img
                            ? `url(https:${img.fields.file?.url})`
                            : "url(/portfolio-placeholder.png)",
                        backgroundColor: "rgba(0, 0, 0, 0.7)",
                        backgroundRepeat: "no-repeat",
                        backgroundSize: "cover",
                        backgroundPosition: "50% 25%",
                        backgroundBlendMode: "multiply",
                    }}
                >
                    <h1 className="text-white sm:text-4xl text-3xl font-semibold">
                        {title}
                    </h1>

                    {tags && <Tags tags={tags} />}
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
                delay={0.2}
            >
                {description && <p>{description}</p>}
            </AnimatedContent>

            {(githubLink || url) && (
                <AnimatedContent
                    distance={16}
                    direction="vertical"
                    reverse={false}
                    duration={1}
                    initialOpacity={0}
                    animateOpacity
                    scale={1}
                    threshold={0.1}
                    delay={0.3}
                >
                    <section className="flex flex-wrap gap-4">
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
                </AnimatedContent>
            )}
        </div>
    );
}
