"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function ContactArea() {
    const t = useTranslations("Contact");

    return (
        <section id="contact" className="py-20 bg-gray-900 text-white">
            <div className="container mx-auto px-4 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-5xl font-bold mb-8"
                >
                    {t("title")}
                </motion.h2>
                <p className="text-gray-400 mb-12 max-w-xl mx-auto">
                    {t("description")}
                </p>

                <motion.form
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    className="max-w-md mx-auto space-y-4"
                    onSubmit={(e) => e.preventDefault()}
                >
                    <div>
                        <input
                            type="email"
                            placeholder={t("emailPlaceholder")}
                            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors"
                        />
                    </div>
                    <div>
                        <textarea
                            rows={4}
                            placeholder={t("messagePlaceholder")}
                            className="w-full px-4 py-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:border-blue-500 transition-colors resize-none"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full py-3 px-6 rounded-lg bg-blue-600 hover:bg-blue-700 transition font-medium"
                    >
                        {t("sendButton")}
                    </button>
                </motion.form>
            </div>
        </section>
    );
}
