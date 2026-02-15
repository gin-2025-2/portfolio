"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export const BackgroundBeams = ({ className }: { className?: string }) => {
    return (
        <div
            className={cn(
                "absolute h-full w-full inset-0 bg-neutral-950",
                className
            )}
        >
            <div className="absolute h-full w-full inset-0 bg-neutral-950 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
            <div className="absolute inset-0 bg-fixed bg-center [mask-image:linear-gradient(to_bottom,transparent,black)] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 32 32' width='32' height='32' fill='none' stroke='%23262626'%3e%3cpath d='M0 .5H31.5V32'/%3e%3c/svg%3e")`
                }}
            ></div>
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                {/* Simple animated beams effect simulation for now to avoid complex canvas setup complexity in one go */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.5, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-blue-500/20 blur-[100px] rounded-full"
                />
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.3, 0] }}
                    transition={{ duration: 7, repeat: Infinity, ease: "linear", delay: 2 }}
                    className="absolute top-1/3 left-1/3 w-[400px] h-[400px] bg-purple-500/20 blur-[100px] rounded-full"
                />
            </div>
        </div>
    );
};
