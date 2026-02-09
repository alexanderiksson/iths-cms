"use client";

import Link from "next/link";
import { LuMenu } from "react-icons/lu";
import { IoClose } from "react-icons/io5";
import { useState } from "react";

import Image from "next/image";

interface NavLinkFields {
    name: string;
    page: {
        fields: {
            slug: string;
        };
    };
}

interface SocialLinkFields {
    url: string;
    icon: {
        fields: {
            file: {
                url: string;
            };
            title: string;
        };
    };
}

interface MobileNavMenuProps {
    navLinks: Array<{
        fields?: NavLinkFields;
        sys?: Record<string, unknown>;
    }>;
    socialLinks: Array<{
        fields?: SocialLinkFields;
        sys?: Record<string, unknown>;
    }>;
}

export default function MobileNavMenu({
    navLinks,
    socialLinks,
}: MobileNavMenuProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <>
            <header className="lg:hidden py-4 fixed w-full top-0 bg-(--background)/80 backdrop-blur-xl z-20 border-b border-neutral-500/20">
                <div className="content flex justify-between items-center">
                    <Link
                        href="/"
                        className="inline-flex items-center font-medium text-2xl"
                    >
                        Alex
                    </Link>
                    <button
                        className="cursor-pointer"
                        aria-label="Open navigation menu"
                        onClick={() => setIsOpen(true)}
                    >
                        <LuMenu size={28} />
                    </button>
                </div>
            </header>

            <div
                className="fixed top-0 h-screen w-screen bg-(--background)/70 backdrop-blur-2xl z-30 py-4 transition-all duration-400 ease-in-out"
                style={{
                    left: isOpen ? "0" : "-120%",
                }}
            >
                <div className="content">
                    <div className="flex justify-end">
                        <button
                            className="cursor-pointer mb-8 z-30"
                            aria-label="Close navigation menu"
                            onClick={() => setIsOpen(false)}
                        >
                            <IoClose size={28} />
                        </button>
                    </div>
                    <nav className="absolute top-0 left-0 w-full h-screen flex items-center">
                        <ul className="content flex flex-col gap-4 text-2xl font-medium">
                            {navLinks.map((link, i) => {
                                const name = link.fields?.name;
                                const slug = link.fields?.page?.fields?.slug;

                                return (
                                    <li key={i}>
                                        <Link
                                            href={"/" + (slug || "")}
                                            onClick={() => setIsOpen(false)}
                                        >
                                            {name}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </nav>
                    <div className="absolute bottom-4">
                        <ul className="flex items-center gap-6">
                            {socialLinks.map((link, i) => {
                                const url = link.fields?.url;
                                const iconURL =
                                    link.fields?.icon?.fields?.file?.url;
                                const iconAlt =
                                    link.fields?.icon?.fields?.title || "";

                                return (
                                    <li key={i}>
                                        <a href={url || "#"}>
                                            <Image
                                                src={
                                                    "https://" + (iconURL || "")
                                                }
                                                alt={iconAlt}
                                                width={20}
                                                height={20}
                                            />
                                        </a>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>
                </div>
            </div>
        </>
    );
}
