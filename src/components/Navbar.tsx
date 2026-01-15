import Link from "next/link";
import Image from "next/image";
import client from "../lib/contentful";
import { Asset, Entry } from "contentful";

export default async function Navbar() {
    const navLinks = await client.getEntries({
        content_type: "navigation",
        order: ["fields.order"],
    });

    const socialLinks = await client.getEntries({
        content_type: "socialLinks",
        order: ["sys.createdAt"],
    });

    return (
        <aside className="hidden fixed left-0 top-0 bottom-0 w-56 lg:flex flex-col justify-between gap-8 py-8 px-12">
            <Link
                href="/"
                className="inline-flex items-center font-medium text-2xl"
            >
                Alex
            </Link>

            <nav>
                <ul className="flex flex-col gap-1 text-2xl">
                    {navLinks.items.map((link, i) => {
                        const name = link.fields.name as string;
                        const page = link.fields.page as Entry;
                        const slug = page.fields.slug as string;

                        return (
                            <li key={i}>
                                <Link href={"/" + slug}>{name}</Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <ul className="flex items-center gap-6 text-white">
                {socialLinks.items.map((link, i) => {
                    const url = link.fields.url as string;
                    const icon = link.fields.icon as Asset;
                    const iconURL = icon.fields.file?.url as string;
                    const iconAlt = icon.fields.title as string;

                    return (
                        <li key={i}>
                            <a href={url}>
                                <Image
                                    src={"https://" + iconURL}
                                    alt={iconAlt}
                                    width={20}
                                    height={20}
                                />
                            </a>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
}
