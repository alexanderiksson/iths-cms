import type { Metadata } from "next";
import client from "@/lib/contentful";
import ProjectCard from "@/components/ProjectCard";
import { Asset } from "contentful";

export const metadata: Metadata = {
    title: "Projects",
};

export default async function Projects() {
    const projects = await client.getEntries({
        content_type: "portfolio",
        order: ["-sys.createdAt"],
    });

    return (
        <div className="content">
            <h1 className="heading">Projects</h1>
            <div className="flex flex-col gap-8">
                {projects.items.map((project, i) => {
                    const img = project.fields.image as Asset;

                    return (
                        <ProjectCard
                            key={i}
                            slug={project.fields.slug as string}
                            title={project.fields.title as string}
                            description={project.fields.description as string}
                            img={img.fields.file?.url as string}
                            imgAlt={img.fields.title as string}
                        />
                    );
                })}
            </div>
        </div>
    );
}
