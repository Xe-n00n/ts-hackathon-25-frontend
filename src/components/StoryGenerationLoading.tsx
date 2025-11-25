"use client";
import React from "react";
import { baloo2 } from "@/lib/fonts";

interface StoryGenerationLoadingProps {
    className?: string;
}

export default function StoryGenerationLoading({ className = "" }: StoryGenerationLoadingProps) {
    return (
        <div className={`fixed inset-0 bg-dark-red w-screen h-screen flex items-center justify-center z-50 ${className}`}>
            <div className="text-center">
                <div className="mx-auto w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-6"></div>
                <p className={`text-2xl text-white font-extrabold ${baloo2.className}`}>Your story now is in the oven</p>
            </div>
        </div>
    );
}
