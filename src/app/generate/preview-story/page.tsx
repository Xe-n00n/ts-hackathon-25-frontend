"use client";
import { useState, useMemo, useCallback, useEffect } from "react";
import { baloo2 } from "@/lib/fonts";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";

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
    const [generatedStory, setGeneratedStory] = useState<GeneratedStory | null>(() => {
        if (typeof window === "undefined") return null; // avoid SSR issues
        const storyDataString = sessionStorage.getItem("generatedStory");
        try {
            return storyDataString ? JSON.parse(storyDataString) : null;
        } catch {
            return null;
        }
    });

    useEffect(() => {
        // Delay the initial state update to avoid cascading render
        const storyDataString = sessionStorage.getItem("generatedStory");
        if (storyDataString) {
            try {
                const story = JSON.parse(storyDataString);
                queueMicrotask(() => setGeneratedStory(story));
            } catch (error) {
                console.error(error);
            }
        }

        const handleStorageChange = (event: StorageEvent) => {
            if (event.key === "generatedStory" && event.newValue) {
                try {
                    setGeneratedStory(JSON.parse(event.newValue));
                    setSelectedIndex(0);
                } catch (error) {
                    console.error(error);
                }
            }
        };

        window.addEventListener("storage", handleStorageChange);
        return () => window.removeEventListener("storage", handleStorageChange);
    }, []);

    // Split story into pages
    const story = useMemo(() => {
        if (!generatedStory) return [];

        const content = generatedStory.content;
        const paragraphs = content
            .split("\n\n")
            .filter((p: string) => p.trim().length > 0);

        const pages: StoryPage[] = paragraphs.map((paragraph, index) => ({
            pageContent: paragraph.trim(),
            pageNumber: index + 1,
        }));

        return pages;
    }, [generatedStory]);

    // Prevent errors on empty story
    const currentPage = story.length
        ? story[Math.min(selectedIndex, story.length - 1)]
        : { pageContent: "Loading story...", pageNumber: 1 };

    const handlePageSelect = useCallback((index: number) => {
        setSelectedIndex(index);
    }, []);

    const carouselItems = useMemo(() => {
        if (!story.length) return null;

        return story.map((page, index) => (
            <CarouselItem key={index} className="flex justify-start items-center basis-1/4">
                <div
                    className={`bg-white rounded-xl p-3 w-64 h-36 flex flex-col justify-between cursor-pointer transition shadow-xl border-2
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

    // If title doesn't exist, fallback to child's name
    const storyTitle = generatedStory?.title

    return (
        <div
            className={`h-screen max-h-screen overflow-hidden container mx-auto flex flex-col ${baloo2.className}`}
            style={{
                backgroundImage: "url('/story-background.svg')",
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "repeat",
            }}
        >
            <div className="flex flex-col items-center h-full space-y-16">
                <div className="w-full bg-dark-red py-2 flex justify-between items-center px-6">
                    <p className="text-2xl text-white font-semibold">{storyTitle}</p>
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
                    <Carousel opts={{ align: "center", slidesToScroll: 2 }} className="w-full mb-4">
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
