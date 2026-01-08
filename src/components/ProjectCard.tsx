interface ProjectCardProps {
    title: string;
    description: string;
}

export default function ProjectCard({ title, description }: ProjectCardProps) {
    return (
        <div className="w-full p-6 bg-(--secondary) flex flex-col gap-4 rounded-2xl">
            <h2>{title}</h2>
            <p>{description}</p>
        </div>
    );
}
