"use client";

import { BackgroundBeams } from "@/components/aceternity/background-beams";
import { motion } from "framer-motion";
import { IntroData } from "@/types/cms";


export function Intro({ data }: { data: IntroData }) {
    return (
        <section id="about" className="h-screen w-full rounded-md bg-neutral-950 relative flex flex-col items-center justify-center antialiased">
            <div className="max-w-2xl mx-auto p-4 placeholder-content relative z-10 text-center">
                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="relative z-10 text-lg md:text-7xl  bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-600  text-center font-sans font-bold"
                >
                    {data.greeting}
                </motion.h1>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-neutral-500 max-w-lg mx-auto my-4 text-sm md:text-lg text-center relative z-10"
                >
                    {data.description}
                </motion.p>
                {data.subDescription && (
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        className="text-neutral-400 max-w-2xl mx-auto mt-2 text-sm md:text-base text-center relative z-10 leading-relaxed"
                    >
                        {data.subDescription}
                    </motion.p>
                )}

            </div>
            <BackgroundBeams />
        </section>
    );
}
