import type { Metadata } from "next";
import client from "@/lib/contentful";
import ProjectCard from "@/components/ProjectCard";
import { Asset } from "contentful";
import fetchPage from "@/lib/fetchPage";

/* Generate metadata from contentful */
export async function generateMetadata(): Promise<Metadata> {
    const entry = await fetchPage("projects");
    if (!entry) return { title: "404 - Page not found" };

    const { metatitle, metaDescription } = entry.fields as {
        metatitle: string;
        metaDescription: string;
    };

    return { title: metatitle, description: metaDescription };
}

/* Render page */
export default async function Projects() {
    const pageContent = await fetchPage("projects");

    const { title } = pageContent.fields as {
        title: string;
    };

    const portfolioEntries = await client.getEntries({
        content_type: "portfolio",
        order: ["-sys.createdAt"],
    });

    const projects = portfolioEntries.items;

    return (
        <div className="content">
            <h1 className="heading">{title}</h1>

            <section className="flex flex-col gap-10">
                {projects.length <= 0 ? (
                    <p>No projects found</p>
                ) : (
                    projects.map((project, i) => {
                        const slug = project.fields.slug as string;
                        const title = project.fields.title as string;
                        const tags = project.fields.tags as
                            | Array<string>
                            | undefined;
                        const desc = project.fields.description as
                            | string
                            | undefined;
                        const img = project.fields.image as Asset | undefined;
                        const imgURL = img?.fields.file?.url as string;
                        const imgAlt = img?.fields.title as string;

                        return (
                            <ProjectCard
                                key={i}
                                slug={slug}
                                title={title}
                                tags={tags}
                                description={
                                    desc && desc.length > 150
                                        ? desc.substring(0, 150) + "..."
                                        : desc
                                }
                                img={
                                    imgURL
                                        ? `https:${imgURL}`
                                        : "/portfolio-placeholder.png"
                                }
                                imgAlt={imgAlt ?? "Placeholder image"}
                            />
                        );
                    })
                )}
            </section>
        </div>
    );
}
