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
        <div className="flex flex-col sm:flex-row gap-6 sm:gap-8 bg-(--secondary) rounded-3xl p-6 sm:p-8">
            <div className="relative w-full sm:w-2/5 aspect-video rounded-xl overflow-hidden shrink-0">
                <Image src={img} alt={imgAlt} fill className="object-cover" />
            </div>

            <div className="flex flex-col gap-3 flex-1">
                <h2 className="text-2xl font-medium">{title}</h2>

                {tags && <Tags tags={tags} />}

                {description && (
                    <p className="text-sm leading-relaxed opacity-75">
                        {description}
                    </p>
                )}

                <div className="mt-auto pt-2">
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
