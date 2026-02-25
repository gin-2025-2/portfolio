"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Skill } from "@/types/cms";

export function TechStack({ skills }: { skills: Skill[] }) {
    const t = useTranslations("TechStack");

    return (
        <section id="skills" className="py-20 bg-white dark:bg-black">
            <div className="container mx-auto px-4">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold text-center mb-12 text-gray-900 dark:text-white"
                >
                    {t("title")}
                </motion.h2>

                <div className="space-y-12">
                    {skills.map((category, catIndex) => (
                        <div key={category.category}>
                            <motion.h3
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: catIndex * 0.1 }}
                                className="text-2xl font-bold mb-6 text-gray-800 dark:text-gray-200 border-l-4 border-blue-500 pl-4"
                            >
                                {category.category}
                            </motion.h3>
                            <div className="flex flex-wrap gap-4">
                                {category.items.map((item, itemIndex) => (
                                    <motion.div
                                        key={item}
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: (catIndex * 0.1) + (itemIndex * 0.05) }}
                                        whileHover={{ scale: 1.05 }}
                                        className="px-6 py-3 rounded-full bg-gray-50 dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 shadow-sm hover:shadow-md transition-all text-gray-700 dark:text-gray-300 font-medium"
                                    >
                                        {item}
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
