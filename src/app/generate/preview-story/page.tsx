"use client";
import React, { useState, useMemo, useCallback, useEffect } from "react";
import { baloo2 } from "@/lib/fonts";
import { useStoryGeneration } from "@/lib/StoryGenerationContext";
import StoryGenerationLoading from "@/components/StoryGenerationLoading";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel"

interface StoryPage {
    pageContent: string;
    pageNumber: number;
}

interface GeneratedStory {
    title: string;
    content: string;
    format: string;
}

export default function PreviewStory() {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [generatedStory, setGeneratedStory] = useState<GeneratedStory | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const { storyData } = useStoryGeneration();

    useEffect(() => {
        // Load the generated story from sessionStorage
        const loadStoryData = () => {
            const storyDataString = sessionStorage.getItem('generatedStory');
            if (storyDataString) {
                try {
                    const parsedStory = JSON.parse(storyDataString);
                    // Use setTimeout to avoid synchronous setState in effect
                    setTimeout(() => {
                        setGeneratedStory(parsedStory);
                        setIsLoading(false);
                    }, 0);
                    return;
                } catch (error) {
                    console.error('Error parsing story data:', error);
                }
            }
            setIsLoading(false);
        };

        loadStoryData();
    }, []);

    const story = useMemo(() => {
        // First check if there's a generated story from sessionStorage
        if (generatedStory) {
            // Split the generated story content into pages
            const content = generatedStory.content;
            const sentences = content.split(/[.!?]+/).filter((s: string) => s.trim().length > 0);

            const pages: StoryPage[] = [];
            const sentencesPerPage = Math.max(1, Math.ceil(sentences.length / 4)); // Roughly 4 pages max

            for (let i = 0; i < sentences.length; i += sentencesPerPage) {
                const pageContent = sentences.slice(i, i + sentencesPerPage).join('. ') + '.';
                pages.push({
                    pageContent: pageContent.trim(),
                    pageNumber: pages.length + 1
                });
            }

            return pages;
        }

        // Fallback to creating a story object from the context data
        const storyTitle = storyData.childInfo.name
            ? `A Story About ${storyData.childInfo.name}`
            : "Your Magical Story";

        // Generate sample content based on the story data
        let content = `Welcome to ${storyTitle}! `;

        if (storyData.childInfo.name) {
            content += `This story is about ${storyData.childInfo.name}`;
            if (storyData.childInfo.age) {
                content += `, who is ${storyData.childInfo.age} years old`;
            }
            content += ". ";
        }

        if (storyData.customDescription.personalDescription) {
            content += `${storyData.customDescription.personalDescription} `;
        }

        if (storyData.storyValues.goal) {
            content += `Through this adventure, ${storyData.childInfo.name || 'our hero'} will learn about ${storyData.storyValues.goal}. `;
        }

        if (storyData.storyStyle.islamicTeaching) {
            content += "This story incorporates Islamic values and teachings. ";
        }

        content += "Join us on this wonderful journey filled with adventure, learning, and fun!";

        // Split the content into pages
        const sentences = content.split(/[.!?]+/).filter((s: string) => s.trim().length > 0);

        const pages: StoryPage[] = [];
        const sentencesPerPage = Math.max(1, Math.ceil(sentences.length / 4)); // Roughly 4 pages max

        for (let i = 0; i < sentences.length; i += sentencesPerPage) {
            const pageContent = sentences.slice(i, i + sentencesPerPage).join('. ') + '.';
            pages.push({
                pageContent: pageContent.trim(),
                pageNumber: pages.length + 1
            });
        }

        return pages.length > 0 ? pages : [{
            pageContent: "Loading story...",
            pageNumber: 1
        }];
    }, [generatedStory, storyData]);

    const currentPage = useMemo(() => {
        if (!story || story.length === 0) return { pageContent: 'Loading story...', pageNumber: 1 };
        const safeIndex = Math.max(0, Math.min(selectedIndex, story.length - 1));
        return story[safeIndex];
    }, [story, selectedIndex]);

    const handlePageSelect = useCallback((index: number) => {
        setSelectedIndex(index);
    }, []);

    const carouselItems = useMemo(() => {
        return story.map((page, index) => (
            <CarouselItem key={index} className="flex justify-start items-center basis-1/4">
                <div className={`bg-white rounded-xl p-3 w-64 h-48 flex flex-col justify-between cursor-pointer transition shadow-xl border-2
                    ${selectedIndex === index ? "border-dark-red" : "border-transparent"}`}
                    onClick={() => handlePageSelect(index)}
                >
                    <div className="text-xs overflow-hidden flex-1">
                        <p className="break-words whitespace-pre-wrap leading-tight">
                            {page.pageContent}
                        </p>
                    </div>
                    <div className="text-dark-red text-md font-bold text-right">
                        {page.pageNumber}
                    </div>
                </div>
            </CarouselItem>
        ));
    }, [story, selectedIndex, handlePageSelect]);

    const storyTitle = generatedStory?.title || (storyData.childInfo.name
        ? `A Story About ${storyData.childInfo.name}`
        : "Your Magical Story");

    if (isLoading) {
        return <StoryGenerationLoading />;
    }

    return (
        <div
            className={`h-screen max-h-screen overflow-hidden container mx-auto flex flex-col ${baloo2.className}`}
            style={{
                backgroundImage: "url('/story-background.svg')",
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "repeat"
            }}
        >
            <div className="flex flex-col items-center h-full space-y-16">
                <div className="w-full bg-dark-red py-2 ">
                    <p className="text-2xl text-white font-semibold ml-6">{storyTitle}</p>
                </div>

                <div className="flex flex-col items-center justify-between bg-white w-2/4 mx-auto h-3/4 shadow-xl/20 p-4 rounded-xl text-xl">
                    <div className="flex-1 overflow-y-auto">
                        <p className="text-xl leading-relaxed break-words whitespace-pre-wrap">
                            {currentPage.pageContent}
                        </p>
                    </div>
                    <div>
                        <p className="text-2xl text-dark-red font-bold">
                            {currentPage.pageNumber}
                        </p>
                    </div>
                </div>

                <div className="w-full max-w-5xl mx-auto">
                    <Carousel
                        opts={{ align: "center", slidesToScroll: 2 }}
                        className="w-full mb-4"
                    >
                        <CarouselContent className="flex gap-x-2 justify-center items-center m-0">
                            {carouselItems}
                        </CarouselContent>
                        <CarouselPrevious />
                        <CarouselNext />
                    </Carousel>
                </div>
            </div>
        </div>
    );
}
