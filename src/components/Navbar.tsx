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
        <aside className="hidden fixed left-0 top-0 bottom-0 w-56 lg:flex flex-col justify-between gap-8 pt-20 pb-8 px-12">
            <Link href="/" className="inline-flex items-center">
                <Image
                    src="/logo.png"
                    alt="Logo"
                    width={40}
                    height={40}
                    priority
                />
            </Link>

            <nav>
                <ul className="flex flex-col gap-1 text-[22px] font-medium">
                    {navLinks.items.map((link, i) => {
                        const page = link.fields.page as Entry;

                        return (
                            <li key={i}>
                                <Link href={page.fields.slug as string}>
                                    {link.fields.name as string}
                                </Link>
                            </li>
                        );
                    })}
                </ul>
            </nav>

            <ul className="flex gap-6 text-white">
                {socialLinks.items.map((link, i) => {
                    const icon = link.fields.icon as Asset;

                    return (
                        <li key={i}>
                            <a href={String(link.fields.url)}>
                                <Image
                                    src={icon.fields.file?.url as string}
                                    alt={icon.fields.title as string}
                                    width={24}
                                    height={24}
                                />
                            </a>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
}
