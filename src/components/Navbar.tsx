"use client";

import Link from "next/link";
import Image from "next/image";
import { FaSquareGithub, FaLinkedin } from "react-icons/fa6";

const navLinks = [
    { label: "Home", href: "/" },
    { label: "Projects", href: "/projects" },
    { label: "Contact", href: "/contact" },
];

export default function Navbar() {
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
                    {navLinks.map((link) => (
                        <li key={link.label}>
                            <Link className="hover:underline" href={link.href}>
                                {link.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            </nav>

            <ul className="flex gap-6 text-white">
                <li>
                    <a
                        href="https://github.com/alexanderiksson"
                        title="Visit my GitHub"
                        aria-label="Visit my GitHub profile"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="transition-opacity hover:opacity-80"
                    >
                        <FaSquareGithub size={24} />
                    </a>
                </li>
                <li>
                    <a
                        href="https://www.linkedin.com/in/alexander-eriksson-302bb8237/"
                        title="Visit my LinkedIn"
                        aria-label="Visit my LinkedIn profile"
                        target="_blank"
                        rel="noreferrer noopener"
                        className="transition-opacity hover:opacity-80"
                    >
                        <FaLinkedin size={24} />
                    </a>
                </li>
            </ul>
        </aside>
    );
}
