"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Career } from "@/types/cms";

export function CareerSummary({ careers }: { careers: Career[] }) {
    const t = useTranslations("Career");

    return (
        <section id="career" className="py-20 bg-blue-50 dark:bg-zinc-900">
            <div className="container mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold text-center mb-12 text-gray-900 dark:text-white"
                >
                    {t("title")}
                </motion.h2>

                <div className="max-w-4xl mx-auto space-y-8">
                    {careers.map((career, index) => (
                        <motion.div
                            key={career.id || index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.2 }}
                            className="flex flex-col md:flex-row gap-4 md:gap-8 p-8 bg-white dark:bg-neutral-950 rounded-xl shadow-sm border border-gray-100 dark:border-neutral-800 hover:border-blue-200 dark:hover:border-blue-900 transition-colors"
                        >
                            <div className="md:w-1/3 flex flex-col gap-2">
                                <h3 className="text-xl font-bold text-gray-900 dark:text-white">{career.company}</h3>
                                <p className="text-gray-500 dark:text-gray-400 font-medium text-sm">{career.period}</p>
                                <div className="flex flex-wrap gap-2 mt-2">
                                    <span className="px-2 py-1 rounded bg-gray-100 dark:bg-zinc-800 text-xs text-gray-600 dark:text-gray-300 font-semibold">{career.type}</span>
                                </div>
                            </div>
                            <div className="md:w-2/3 border-l md:border-l-2 border-gray-100 dark:border-zinc-800 md:pl-8 pt-4 md:pt-0">
                                <h4 className="text-lg font-semibold text-blue-600 dark:text-blue-400 mb-2">{career.role}</h4>
                                <p className="text-gray-600 dark:text-gray-300 leading-relaxed text-sm mb-4">{career.description}</p>

                                <div className="space-y-2">
                                    <h5 className="text-xs font-bold text-gray-500 dark:text-neutral-500 uppercase tracking-wider">Tech Stack</h5>
                                    <div className="flex flex-wrap gap-2">
                                        {career.techStack.map((tech) => (
                                            <span key={tech} className="px-2 py-1 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 text-xs rounded font-medium">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                    ))}
                </div>
            </div>
        </section>
    );
}
