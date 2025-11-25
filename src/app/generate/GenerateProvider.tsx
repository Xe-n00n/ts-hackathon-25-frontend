"use client";
import { StoryGenerationProvider } from "@/lib/StoryGenerationContext";
import React from "react";
import { useStoryGeneration } from "@/lib/StoryGenerationContext";
import StoryGenerationLoading from "@/components/StoryGenerationLoading";

interface GenerateProviderProps {
    children: React.ReactNode;
}

function GenerateProviderWithLoading({ children }: GenerateProviderProps) {
    const { isLoading } = useStoryGeneration();

    return (
        <>
            {children}
            {isLoading && <StoryGenerationLoading />}
        </>
    );
}

export function GenerateProvider({ children }: GenerateProviderProps) {
    return (
        <StoryGenerationProvider>
            <GenerateProviderWithLoading>
                {children}
            </GenerateProviderWithLoading>
        </StoryGenerationProvider>
    );
}
