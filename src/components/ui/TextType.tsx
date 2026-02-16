"use client";

import React, {
    ElementType,
    useEffect,
    useRef,
    useState,
    useMemo,
    useCallback,
} from "react";
import { gsap } from "gsap";
import { documentToReactComponents } from "@contentful/rich-text-react-renderer";
import type { Document } from "@contentful/rich-text-types";

interface TextTypeProps {
    className?: string;
    showCursor?: boolean;
    hideCursorWhileTyping?: boolean;
    cursorCharacter?: string | React.ReactNode;
    cursorBlinkDuration?: number;
    cursorClassName?: string;
    text: string | string[] | Document | React.ReactNode | React.ReactNode[];
    as?: ElementType;
    typingSpeed?: number;
    initialDelay?: number;
    pauseDuration?: number;
    deletingSpeed?: number;
    loop?: boolean;
    textColors?: string[];
    variableSpeed?: { min: number; max: number };
    onSentenceComplete?: (sentence: string, index: number) => void;
    startOnVisible?: boolean;
    reverseMode?: boolean;
}

const TextType = ({
    text,
    as: Component = "div",
    typingSpeed = 50,
    initialDelay = 0,
    pauseDuration = 2000,
    deletingSpeed = 30,
    loop = true,
    className = "",
    showCursor = true,
    hideCursorWhileTyping = false,
    cursorCharacter = "|",
    cursorClassName = "",
    cursorBlinkDuration = 0.5,
    textColors = [],
    variableSpeed,
    onSentenceComplete,
    startOnVisible = false,
    reverseMode = false,
    ...props
}: TextTypeProps & React.HTMLAttributes<HTMLElement>) => {
    const [displayedText, setDisplayedText] = useState("");
    const [currentCharIndex, setCurrentCharIndex] = useState(0);
    const [isDeleting, setIsDeleting] = useState(false);
    const [currentTextIndex, setCurrentTextIndex] = useState(0);
    const [isVisible, setIsVisible] = useState(!startOnVisible);
    const cursorRef = useRef<HTMLSpanElement>(null);
    const containerRef = useRef<HTMLElement>(null);

    const textArray = useMemo<string[]>(() => {
        if (typeof text === "string") return [text];
        if (Array.isArray(text)) {
            return (text as unknown[]).filter(
                (value): value is string => typeof value === "string",
            );
        }
        return [];
    }, [text]);

    const isContentfulDocument = (value: unknown): value is Document => {
        if (!value || typeof value !== "object") return false;

        const record = value as Record<string, unknown>;
        return (
            typeof record.nodeType === "string" && Array.isArray(record.content)
        );
    };

    const richReactNodes = useMemo<React.ReactNode | null>(() => {
        if (isContentfulDocument(text)) {
            return documentToReactComponents(text);
        }

        if (React.isValidElement(text)) {
            return text;
        }

        if (
            Array.isArray(text) &&
            text.some((item) => typeof item !== "string")
        ) {
            return text as React.ReactNode[];
        }

        return null;
    }, [text]);

    const countChars = useCallback((node: React.ReactNode): number => {
        if (node == null || typeof node === "boolean") return 0;
        if (typeof node === "string" || typeof node === "number") {
            return String(node).length;
        }
        if (Array.isArray(node)) {
            return node.reduce((sum, child) => sum + countChars(child), 0);
        }
        if (React.isValidElement(node)) {
            const element = node as React.ReactElement<{
                children?: React.ReactNode;
            }>;
            return countChars(element.props.children);
        }
        return 0;
    }, []);

    const totalRichChars = useMemo(() => {
        if (!richReactNodes) return 0;
        return countChars(richReactNodes);
    }, [richReactNodes, countChars]);

    const renderRichNodes = useCallback(
        (node: React.ReactNode, visibleChars: number): React.ReactNode => {
            let charCursor = 0;

            const walk = (child: React.ReactNode): React.ReactNode => {
                if (child == null || typeof child === "boolean") return null;

                if (typeof child === "string" || typeof child === "number") {
                    const str = String(child);
                    return str.split("").map((character) => {
                        const currentIndex = charCursor++;
                        const isVisible = currentIndex < visibleChars;

                        return (
                            <span
                                key={`ch-${currentIndex}`}
                                className={isVisible ? "" : "hidden"}
                                aria-hidden={!isVisible}
                            >
                                {character}
                            </span>
                        );
                    });
                }

                if (Array.isArray(child)) {
                    return child.map((nodeChild, index) => (
                        <React.Fragment key={index}>
                            {walk(nodeChild)}
                        </React.Fragment>
                    ));
                }

                if (React.isValidElement(child)) {
                    const element = child as React.ReactElement<{
                        children?: React.ReactNode;
                    }>;
                    return React.cloneElement(
                        element,
                        undefined,
                        walk(element.props.children),
                    );
                }

                return null;
            };

            return walk(node);
        },
        [],
    );

    const getRandomSpeed = useCallback(() => {
        if (!variableSpeed) return typingSpeed;
        const { min, max } = variableSpeed;
        return Math.random() * (max - min) + min;
    }, [variableSpeed, typingSpeed]);

    const getCurrentTextColor = () => {
        if (textColors.length === 0) return "inherit";
        return textColors[currentTextIndex % textColors.length];
    };

    useEffect(() => {
        if (!startOnVisible || !containerRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        setIsVisible(true);
                    }
                });
            },
            { threshold: 0.1 },
        );

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, [startOnVisible]);

    useEffect(() => {
        if (showCursor && cursorRef.current) {
            gsap.set(cursorRef.current, { opacity: 1 });
            gsap.to(cursorRef.current, {
                opacity: 0,
                duration: cursorBlinkDuration,
                repeat: -1,
                yoyo: true,
                ease: "power2.inOut",
            });
        }
    }, [showCursor, cursorBlinkDuration]);

    useEffect(() => {
        if (!isVisible) return;

        let timeout: ReturnType<typeof setTimeout>;

        const isRichMode = richReactNodes !== null;
        const currentText: string = textArray[currentTextIndex] ?? "";
        const processedText =
            reverseMode && !isRichMode
                ? currentText.split("").reverse().join("")
                : currentText;
        const currentLength = isRichMode
            ? totalRichChars
            : processedText.length;

        const executeTypingAnimation = () => {
            if (isDeleting) {
                if (currentCharIndex === 0) {
                    setIsDeleting(false);

                    if (
                        !isRichMode &&
                        currentTextIndex === textArray.length - 1 &&
                        !loop
                    ) {
                        return;
                    }

                    if (
                        onSentenceComplete &&
                        !isRichMode &&
                        textArray.length > 0
                    ) {
                        onSentenceComplete(
                            textArray[currentTextIndex],
                            currentTextIndex,
                        );
                    }

                    if (!isRichMode && textArray.length > 0) {
                        setCurrentTextIndex(
                            (prev) => (prev + 1) % textArray.length,
                        );
                    }

                    setCurrentCharIndex(0);
                    if (!isRichMode) {
                        setDisplayedText("");
                    }
                    timeout = setTimeout(() => {}, pauseDuration);
                } else {
                    timeout = setTimeout(() => {
                        setCurrentCharIndex((prev) => Math.max(0, prev - 1));
                        if (!isRichMode) {
                            setDisplayedText((prev) => prev.slice(0, -1));
                        }
                    }, deletingSpeed);
                }
            } else {
                if (currentCharIndex < currentLength) {
                    timeout = setTimeout(
                        () => {
                            setCurrentCharIndex((prev) => prev + 1);
                            if (!isRichMode) {
                                setDisplayedText(
                                    (prev) =>
                                        prev +
                                        (processedText[currentCharIndex] ?? ""),
                                );
                            }
                        },
                        variableSpeed ? getRandomSpeed() : typingSpeed,
                    );
                } else if (isRichMode || textArray.length >= 1) {
                    if (
                        !isRichMode &&
                        !loop &&
                        currentTextIndex === textArray.length - 1
                    )
                        return;
                    timeout = setTimeout(() => {
                        setIsDeleting(true);
                    }, pauseDuration);
                }
            }
        };

        if (
            currentCharIndex === 0 &&
            !isDeleting &&
            (isRichMode || displayedText === "")
        ) {
            timeout = setTimeout(executeTypingAnimation, initialDelay);
        } else {
            executeTypingAnimation();
        }

        return () => clearTimeout(timeout);
    }, [
        currentCharIndex,
        displayedText,
        isDeleting,
        typingSpeed,
        deletingSpeed,
        pauseDuration,
        textArray,
        currentTextIndex,
        loop,
        initialDelay,
        isVisible,
        reverseMode,
        variableSpeed,
        onSentenceComplete,
        getRandomSpeed,
        richReactNodes,
        totalRichChars,
    ]);

    const isRichMode = richReactNodes !== null;
    const currentLength = isRichMode
        ? totalRichChars
        : (textArray[currentTextIndex] ?? "").length;
    const shouldHideCursor =
        hideCursorWhileTyping &&
        (currentCharIndex < currentLength || isDeleting);

    return (
        <Component
            ref={containerRef}
            className={`inline-block whitespace-pre-wrap tracking-tight ${className}`}
            {...props}
        >
            <span
                className="inline"
                style={{ color: getCurrentTextColor() || "inherit" }}
            >
                {richReactNodes
                    ? renderRichNodes(richReactNodes, currentCharIndex)
                    : displayedText}
            </span>
            {showCursor && (
                <span
                    ref={cursorRef}
                    className={`ml-1 inline-block opacity-100 ${shouldHideCursor ? "hidden" : ""} ${cursorClassName}`}
                >
                    {cursorCharacter}
                </span>
            )}
        </Component>
    );
};

export default TextType;
