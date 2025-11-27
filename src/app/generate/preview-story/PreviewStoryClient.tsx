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
import { useStoryGeneration } from "@/lib/StoryGenerationContext";
import { GeneratedStory } from "@/lib/story-types";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

const splitStoryIntoPages = (content: string): string[] => {
    return content
        .split("\n\n")
        .map(paragraph => paragraph.trim())
        .filter(Boolean);
};

export default function PreviewStoryClient() {
    const { currentStory, updateCurrentStoryContent } = useStoryGeneration();

    return (
        <StoryViewer
            story={currentStory}
            onSaveContent={updateCurrentStoryContent}
        />
    );
}

interface StoryViewerProps {
    story: GeneratedStory | null;
    onSaveContent: (content: string) => void;
}

function StoryViewer({ story, onSaveContent }: StoryViewerProps) {
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [pageContents, setPageContents] = useState<string[]>(() =>
        story ? splitStoryIntoPages(story.content) : []
    );
    const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

    useEffect(() => {
        if (!story) {
            setPageContents([]);
            setSelectedIndex(0);
            setHasUnsavedChanges(false);
            return;
        }

        setPageContents(splitStoryIntoPages(story.content));
        setSelectedIndex(0);
        setHasUnsavedChanges(false);
    }, [story]);

    const pages = useMemo(() => {
        return pageContents.map((pageContent, index) => ({
            pageContent,
            pageNumber: index + 1,
        }));
    }, [pageContents]);

    const currentPage = pages.length
        ? pages[Math.min(selectedIndex, pages.length - 1)]
        : { pageContent: "Loading story...", pageNumber: 1 };

    const hasEditablePage = Boolean(story && pages.length);

    const handlePageSelect = useCallback((index: number) => {
        setSelectedIndex(index);
    }, []);

    const handlePageTextChange = useCallback((value: string) => {
        setPageContents(prev => {
            if (!prev.length) {
                return prev;
            }

            const next = [...prev];
            const boundedIndex = Math.min(selectedIndex, prev.length - 1);
            next[boundedIndex] = value;
            return next;
        });
        setHasUnsavedChanges(true);
    }, [selectedIndex]);

    const handleSaveChanges = useCallback(() => {
        if (!story || !pageContents.length) {
            return;
        }

        onSaveContent(pageContents.join("\n\n"));
        setHasUnsavedChanges(false);
    }, [story, pageContents, onSaveContent]);

    const handleResetChanges = useCallback(() => {
        if (!story) {
            return;
        }

        setPageContents(splitStoryIntoPages(story.content));
        setSelectedIndex(0);
        setHasUnsavedChanges(false);
    }, [story]);

    const carouselItems = useMemo(() => {
        if (!pages.length) return null;

        return pages.map((page, index) => (
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
    }, [pages, selectedIndex, handlePageSelect]);

    const storyTitle = story?.title;

    return (
        <div
            className={`h-screen min-h-screen container mx-auto flex flex-col overflow-y-auto ${baloo2.className}`}
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
                    <div className="flex-1 w-full">
                        <Textarea
                            className="w-full h-full resize-none border border-dark-red/30 rounded-lg p-4 text-3xl leading-relaxed break-words whitespace-pre-wrap focus:outline-none focus:ring-2 focus:ring-dark-red"
                            value={currentPage.pageContent}
                            onChange={(event) => handlePageTextChange(event.target.value)}
                            disabled={!hasEditablePage}
                        />
                    </div>
                    <div className="flex w-full items-center justify-between mt-4">
                        <p className="text-2xl text-dark-red font-bold">
                            {currentPage.pageNumber}
                        </p>
                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                onClick={handleResetChanges}
                                disabled={!hasUnsavedChanges || !hasEditablePage}
                            >
                                Reset
                            </Button>
                            <Button
                                variant="darkRed"
                                onClick={handleSaveChanges}
                                disabled={!hasUnsavedChanges || !hasEditablePage}
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </div>

                <div className="w-full max-w-5xl mx-auto">
                    <Carousel opts={{ align: "start", slidesToScroll: 1 }} className="w-full mb-4">
                        <CarouselContent className="flex gap-x-2 justify-start items-center m-0">
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
