"use client";
import React, { useState, useMemo, useCallback } from "react";
import { baloo2 } from "@/lib/fonts";
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

// Move story data outside component
const DEFAULT_STORY_DATA: StoryPage[] = [
    {
        pageContent: "Once upon a time, in a land far, far away, there lived a brave little knight named Leo. Leo was known throughout the kingdom for his courage and kindness. One sunny morning, Leo decided to embark on an adventure to find the legendary Golden Dragon, said to grant wishes to those pure of heart.",
        pageNumber: 1
    },
    {
        pageContent: "Page 2: As Leo journeyed through enchanted forests and crossed sparkling rivers, he encountered a wise old owl perched on a branch. The owl spoke, 'To find the Golden Dragon, you must first prove your bravery by helping those in need.' Leo nodded eagerly, ready for the challenge.",
        pageNumber: 2
    },
    {
        pageContent: "Page 3: As Leo journeyed through enchanted forests and crossed sparkling rivers, he encountered a wise old owl perched on a branch. The owl spoke, 'To find the Golden Dragon, you must first prove your bravery by helping those in need.' Leo nodded eagerly, ready for the challenge.",
        pageNumber: 3
    },
    {
        pageContent: "Page 4: As Leo journeyed through enchanted forests and crossed sparkling rivers, he encountered a wise old owl perched on a branch. The owl spoke, 'To find the Golden Dragon, you must first prove your bravery by helping those in need.' Leo nodded eagerly, ready for the challenge.",
        pageNumber: 4
    },
    {
        pageContent: "Page 5: As Leo journeyed through enchanted forests and crossed sparkling rivers, he encountered a wise old owl perched on a branch. The owl spoke, 'To find the Golden Dragon, you must first prove your bravery by helping those in need.' Leo nodded eagerly, ready for the challenge.",
        pageNumber: 5
    },
    {
        pageContent: "Page 6: As Leo journeyed through enchanted forests and crossed sparkling rivers, he encountered a wise old owl perched on a branch. The owl spoke, 'To find the Golden Dragon, you must first prove your bravery by helping those in need.' Leo nodded eagerly, ready for the challenge.",
        pageNumber: 6
    }
];

interface PreviewStoryProps {
    storyData?: StoryPage[];
}

export default function PreviewStory({ storyData }: PreviewStoryProps = {}) {
    const [selectedIndex, setSelectedIndex] = useState(0);

    const story = useMemo(() => storyData || DEFAULT_STORY_DATA, [storyData]);

    const currentPage = useMemo(() => {
        if (!story || story.length === 0) return { pageContent: '', pageNumber: 0 };
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
                    <p className="text-2xl text-white font-semibold ml-6">Title</p>
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
