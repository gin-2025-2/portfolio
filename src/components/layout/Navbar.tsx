"use client";

import { useState, useEffect } from "react";
import { Link, usePathname, useRouter } from "@/i18n/routing";
import { useTranslations, useLocale } from "next-intl";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

export function Navbar() {
    const t = useTranslations("Nav");
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 20);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { href: "#about", label: t("about") }, // In real app, might use IDs or separate pages
        { href: "#skills", label: t("skills") },
        { href: "#projects", label: t("projects") },
        { href: "#contact", label: t("contact") },
    ];
    ];

    const locale = useLocale();
    const router = useRouter();
    const pathname = usePathname();

    const toggleLocale = () => {
        const nextLocale = locale === "ko" ? "en" : "ko";
        router.replace(pathname, { locale: nextLocale });
    };

    return (
        <nav
            className={cn(
                "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
                scrolled
                    ? "bg-white/80 backdrop-blur-md border-b border-gray-200 dark:bg-black/80 dark:border-gray-800 py-3"
                    : "bg-transparent py-5"
            )}
        >
            <div className="container mx-auto px-4 flex justify-between items-center">
                <Link href="/" className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                    Dev Portfolio
                </Link>

                {/* Desktop Menu */}
                <ul className="hidden md:flex gap-8">
                    {navLinks.map((link) => (
                        <li key={link.href}>
                            <a
                                href={link.href}
                                className="text-gray-600 hover:text-blue-600 transition font-medium dark:text-gray-300 dark:hover:text-blue-400"
                            >
                                {link.label}
                            </a>
                        </li>
                    ))}
                </ul>

                {/* Mobile Menu Toggle */}
                <button
                    className="md:hidden p-2 text-gray-600 dark:text-gray-300"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X /> : <Menu />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-white dark:bg-black border-b border-gray-200 dark:border-gray-800 overflow-hidden"
                    >
                        <ul className="flex flex-col p-4 gap-4">
                            {navLinks.map((link) => (
                                <li key={link.href}>
                                    <a
                                        href={link.href}
                                        className="block py-2 text-gray-600 hover:text-blue-600 dark:text-gray-300"
                                        onClick={() => setIsOpen(false)}
                                    >
                                        {link.label}
                                    </a>
                                </li>
                            ))}
                            {/* Mobile Language Toggle */}
                            <li className="pt-2 border-t border-gray-100 dark:border-gray-800">
                                <button
                                    onClick={() => {
                                        toggleLocale();
                                        setIsOpen(false);
                                    }}
                                    className="flex w-full items-center justify-between py-2 text-gray-600 hover:text-blue-600 dark:text-gray-300"
                                >
                                    <span>Language</span>
                                    <span className="font-bold bg-gray-100 dark:bg-zinc-800 px-2 py-1 rounded text-xs">
                                        {locale === "ko" ? "Korean" : "English"}
                                    </span>
                                </button>
                            </li>

                        </ul>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
}
