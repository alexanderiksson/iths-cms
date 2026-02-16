import type { Metadata } from "next";
import Link from "next/link";
import fetchPage from "@/lib/fetchPage";
import { Document } from "@contentful/rich-text-types";
import { documentToPlainTextString } from "@contentful/rich-text-plain-text-renderer";
import TextType from "@/components/ui/TextType";
import AnimatedContent from "@/components/ui/AnimatedContent";

/* Generate metadata from contentful */
export async function generateMetadata(): Promise<Metadata> {
    const entry = await fetchPage("/");
    if (!entry) return { title: "404 - Page not found" };

    const { metatitle, metaDescription } = entry.fields as {
        metatitle: string;
        metaDescription: string;
    };

    return { title: metatitle, description: metaDescription };
}

/* Render page */
export default async function Home() {
    const pageContent = await fetchPage("/");

    const { content } = pageContent.fields as {
        content: Document;
    };

    return (
        <div className="content my-auto">
            <section className="flex flex-col gap-6">
                <AnimatedContent
                    distance={16}
                    direction="vertical"
                    reverse={false}
                    duration={1}
                    initialOpacity={0}
                    animateOpacity
                    scale={1}
                    threshold={0.1}
                    delay={0}
                >
                    <div className="sm:text-4xl text-3xl font-medium leading-normal">
                        <TextType
                            text={documentToPlainTextString(content)}
                            loop={false}
                            typingSpeed={50}
                            showCursor
                            cursorCharacter="_"
                            cursorBlinkDuration={0.5}
                        />
                    </div>
                </AnimatedContent>

                <AnimatedContent
                    distance={16}
                    direction="vertical"
                    reverse={false}
                    duration={1}
                    initialOpacity={0}
                    animateOpacity
                    scale={1}
                    threshold={0.1}
                    delay={0.2}
                >
                    <div className="flex gap-4">
                        <Link href="/projects" className="button">
                            Projects
                        </Link>
                        <Link href="/contact" className="button-2">
                            Contact me
                        </Link>
                    </div>
                </AnimatedContent>
            </section>
        </div>
    );
}
