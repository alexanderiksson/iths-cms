import Image from "next/image";
import Link from "next/link";

interface ProjectCardProps {
    slug: string;
    title: string;
    tags: Array<string>;
    description: string;
    img: string;
    imgAlt: string;
}

export default function ProjectCard({
    slug,
    title,
    tags,
    description,
    img,
    imgAlt,
}: ProjectCardProps) {
    return (
        <div className="p-6 sm:p-8 flex flex-col sm:flex-row gap-12 sm:gap-16 bg-(--secondary) rounded-4xl border border-neutral-500/5">
            <div className="relative w-full sm:w-1/2 aspect-4/3 overflow-hidden rounded-2xl">
                <Image src={img} alt={imgAlt} fill className="object-contain" />
            </div>

            <div className="flex flex-col gap-4 sm:w-1/2 relative pt-8">
                <h2 className="text-2xl font-medium text-center sm:text-left truncate">
                    {title}
                </h2>

                <div className="flex items-center flex-wrap gap-2">
                    {tags.map((tag, i) => (
                        <span
                            key={i}
                            className="bg-neutral-200 py-1 px-3 rounded-full text-sm"
                        >
                            {tag}
                        </span>
                    ))}
                </div>

                <p className="mb-24">{description}</p>

                <div className="absolute bottom-6 w-full">
                    <Link
                        href={`/projects/${slug}`}
                        className="button"
                        aria-label={`Read more about ${title}`}
                    >
                        Read more
                    </Link>
                </div>
            </div>
        </div>
    );
}
