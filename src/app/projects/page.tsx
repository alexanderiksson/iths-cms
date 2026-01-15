import type { Metadata } from "next";
import client from "@/lib/contentful";
import ProjectCard from "@/components/ProjectCard";
import { Asset } from "contentful";

export const metadata: Metadata = {
    title: "Projects",
    description:
        "Browse through my portfolio of projects showcasing my skills and expertise.",
};

export default async function Projects() {
    const entries = await client.getEntries({
        content_type: "portfolio",
        order: ["-sys.createdAt"],
    });

    const projects = entries.items;

    return (
        <div className="content">
            <h1 className="heading">Projects</h1>

            <div className="flex flex-col gap-8">
                {projects.length <= 0 ? (
                    <p>No projects found</p>
                ) : (
                    projects.map((project, i) => {
                        const slug = project.fields.slug as string;
                        const title = project.fields.title as string;
                        const desc = project.fields.description as string;
                        const img = project.fields.image as Asset | undefined;
                        const imgURL = img?.fields.file?.url as string;
                        const imgAlt = img?.fields.title as string;

                        return (
                            <ProjectCard
                                key={i}
                                slug={slug}
                                title={title}
                                description={
                                    desc.length > 150
                                        ? desc.substring(0, 150) + "..."
                                        : desc
                                }
                                img={
                                    imgURL
                                        ? `https:${imgURL}`
                                        : "/placeholder.png"
                                }
                                imgAlt={imgAlt ?? "Placeholder image"}
                            />
                        );
                    })
                )}
            </div>
        </div>
    );
}
