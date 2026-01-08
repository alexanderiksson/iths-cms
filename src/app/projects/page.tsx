import client from "@/lib/contentful";
import ProjectCard from "@/components/ProjectCard";

export default async function Projects() {
    const projects = await client.getEntries({
        content_type: "portfolio",
        order: ["-sys.createdAt"],
    });

    return (
        <div className="content">
            <h1 className="heading">Projects</h1>
            <div className="flex flex-col gap-4">
                {projects.items.map((project, i) => (
                    <ProjectCard
                        key={i}
                        title={project.fields.title as string}
                        description={project.fields.description as string}
                    />
                ))}
            </div>
        </div>
    );
}
