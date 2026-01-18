import Image from "next/image";
import Link from "next/link";
import Tags from "./Tags";

interface ProjectCardProps {
    slug: string;
    title: string;
    tags: Array<string> | undefined;
    description: string | undefined;
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
        <div className="p-6 sm:p-10 flex flex-col sm:flex-row gap-4 sm:gap-12 bg-(--secondary) rounded-4xl">
            <div className="relative w-full sm:w-1/2 aspect-4/3 overflow-hidden flex items-center justify-center">
                <Image src={img} alt={imgAlt} fill className="object-contain" />
            </div>

            <div className="flex flex-col gap-4 sm:w-1/2 relative min-h-64">
                <h2 className="text-2xl font-medium truncate">{title}</h2>

                {tags && <Tags tags={tags} />}

                {description && <p className="mb-24">{description}</p>}

                <div className="absolute bottom-0 w-full">
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
