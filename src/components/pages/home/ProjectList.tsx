"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import Image from "next/image";
import { Project } from "@/types/cms";

export function ProjectList({ projects }: { projects: Project[] }) {
    const t = useTranslations("Projects");

    return (
        <section id="projects" className="py-20 bg-white dark:bg-black">
            <div className="container mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold text-center mb-12 text-gray-900 dark:text-white"
                >
                    {t("title")}
                </motion.h2>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {projects.map((project, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            whileHover={{ y: -10 }}
                            className="group rounded-xl overflow-hidden bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 shadow-sm hover:shadow-xl transition-all duration-300"
                        >
                            <div className="relative h-48 w-full bg-gray-200 dark:bg-gray-800">
                                {/* Image Placeholder */}
                                <div className="flex items-center justify-center h-full text-gray-400">
                                    <span className="text-sm">Project Image Placeholder</span>
                                </div>
                            </div>
                            <div className="p-8">
                                <div className="mb-6">
                                    {project.subtitle && (
                                        <span className="inline-block px-3 py-1 mb-3 text-xs font-bold tracking-wide text-blue-600 uppercase bg-blue-50 dark:bg-blue-900/30 rounded-full">
                                            {project.subtitle}
                                        </span>
                                    )}
                                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">
                                        {project.title}
                                    </h3>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm">
                                        {project.description}
                                    </p>
                                </div>

                                {/* Achievements List */}
                                {project.achievements && (
                                    <div className="mb-6 bg-gray-50 dark:bg-black/40 rounded-lg p-4">
                                        <h4 className="text-sm font-bold text-gray-900 dark:text-white mb-2 flex items-center gap-2">
                                            <span>🏆</span> Key Achievements
                                        </h4>
                                        <ul className="space-y-2">
                                            {project.achievements.map((item, i) => (
                                                <li key={i} className="text-sm text-gray-600 dark:text-gray-400 pl-4 relative before:content-['•'] before:absolute before:left-0 before:text-blue-400">
                                                    {item}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                <div className="flex flex-wrap gap-2 pt-4 border-t border-gray-100 dark:border-zinc-800">
                                    {project.tags.map((tag) => (
                                        <span key={tag} className="px-3 py-1 text-xs font-medium rounded-md bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>

                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
