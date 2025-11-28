"use client";

import { useState, useMemo, useCallback } from "react";
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
import { AudioPlayer } from "@/components/audio/audio-player";
import { generateAudioAction } from "@/app/generate/actions";
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { Download, Loader2 } from "lucide-react";
import { jsPDF } from "jspdf";

const splitStoryIntoPages = (content: string): string[] => {
    return content
        .split("\n\n")
        .map(paragraph => paragraph.trim())
        .filter(Boolean);
};

export default function PreviewStoryClient() {
    const { currentStory, updateCurrentStoryContent } = useStoryGeneration();
    const storyKey = currentStory?.title || "empty-story";

    return (
        <StoryViewer
            key={storyKey}
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
    const [isEditing, setIsEditing] = useState(false);
    const [isPdfExporting, setIsPdfExporting] = useState(false);
    const [isAudioExporting, setIsAudioExporting] = useState(false);
    const { getCachedAudioUrl, cacheAudioForStory } = useStoryGeneration();
    const cachedAudioUrl = story ? getCachedAudioUrl(story.title, story.content) : null;

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
        if (!isEditing) {
            return;
        }

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
    }, [isEditing, selectedIndex]);

    const handleSaveChanges = useCallback(() => {
        if (!story || !pageContents.length) {
            return;
        }

        onSaveContent(pageContents.join("\n\n"));
        cacheAudioForStory(story.title, story.content, null);
        setHasUnsavedChanges(false);
        setIsEditing(false);
    }, [story, pageContents, onSaveContent, cacheAudioForStory]);

    const handleResetChanges = useCallback(() => {
        if (!story) {
            return;
        }

        const resetPages = splitStoryIntoPages(story.content);
        setPageContents(resetPages);
        setSelectedIndex(prev => {
            if (!resetPages.length) {
                return 0;
            }
            return Math.min(prev, resetPages.length - 1);
        });
        setHasUnsavedChanges(false);
        setIsEditing(false);
    }, [story]);

    const handleStartEditing = useCallback(() => {
        if (!hasEditablePage) {
            return;
        }
        setIsEditing(true);
    }, [hasEditablePage]);

    const carouselItems = useMemo(() => {
        if (!pages.length) return null;

        return pages.map((page, index) => (
            <CarouselItem key={index} className="flex justify-start items-center basis-1/1 lg:basis-1/5 max-w-[12rem]">
                <div
                    className={`relative bg-white rounded-xl p-2.5 w-48 h-32 flex flex-col justify-between cursor-pointer transition shadow-xl border-2
                        ${selectedIndex === index ? "border-dark-red" : "border-transparent"}`}
                    onClick={() => handlePageSelect(index)}
                >
                    <div className="text-xs overflow-hidden flex-1">
                        <p className="break-words whitespace-pre-wrap leading-tight">
                            {page.pageContent}
                        </p>
                    </div>
                    <div className="absolute bottom-2 right-2 text-dark-red text-sm font-semibold bg-white/70 px-1 py-0.5 rounded">
                        {page.pageNumber}
                    </div>
                </div>
            </CarouselItem>
        ));
    }, [pages, selectedIndex, handlePageSelect]);

    const storyTitle = story?.title;
    const showAudioPlayer = Boolean(
        story &&
        Array.isArray(story.format) &&
        story.format.includes("audio-version")
    );
    const formatSelections = story?.format ?? [];
    const hasTextOnlySelection = formatSelections.length === 1 && formatSelections[0] === "text-only";
    const hasTextAndAudioSelection = formatSelections.includes("text-only") && formatSelections.includes("audio-version");
    const safeTitle = useMemo(() => (story?.title || "hikaya-story").replace(/[\\/:*?"<>|]/g, "_"), [story?.title]);

    const handleExportPdf = useCallback(async () => {
        if (!story) {
            return;
        }
        setIsPdfExporting(true);
        try {
            const doc = new jsPDF({ orientation: "landscape", unit: "pt", format: "a4" });
            const margin = 48;
            const pageWidth = doc.internal.pageSize.getWidth() - margin * 2;
            const pageHeight = doc.internal.pageSize.getHeight() - margin;

            const addPageHeader = () => {
                doc.setFont("helvetica", "bold");
                doc.setFontSize(22);
                doc.setTextColor("#CB3B48");
                doc.text(story.title, margin, margin);

                doc.setFont("helvetica", "normal");
                doc.setFontSize(12);
                doc.setTextColor(31, 31, 31);
            };

            const paragraphs = story.content
                .split("\n\n")
                .map(paragraph => paragraph.trim())
                .filter(Boolean);

            paragraphs.forEach((paragraph, index) => {
                if (index > 0) {
                    doc.addPage("a4", "landscape");
                }
                addPageHeader();

                let cursorY = margin + 30;
                const lines = doc.splitTextToSize(paragraph.replace(/\n/g, " "), pageWidth);
                lines.forEach((line: string) => {
                    if (cursorY > pageHeight) {
                        doc.addPage("a4", "landscape");
                        addPageHeader();
                        cursorY = margin + 30;
                    }
                    doc.text(line, margin, cursorY);
                    cursorY += 18;
                });
            });

            doc.save(`${safeTitle}.pdf`);
        } catch (error) {
            console.error("Failed to export PDF", error);
        } finally {
            setIsPdfExporting(false);
        }
    }, [safeTitle, story]);

    const handleExportAudio = useCallback(async () => {
        if (!story) {
            return;
        }
        setIsAudioExporting(true);
        try {
            let audioUrl = cachedAudioUrl;
            if (!audioUrl) {
                const result = await generateAudioAction({
                    title: story.title,
                    content: story.content,
                });

                if (!result.success || !result.audioUrl) {
                    throw new Error(result.error || "Failed to export audio");
                }
                audioUrl = result.audioUrl;
                cacheAudioForStory(story.title, story.content, audioUrl);
            }

            const link = document.createElement("a");
            link.href = audioUrl;
            link.download = `${safeTitle}.mp3`;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);
        } catch (error) {
            console.error("Failed to export audio", error);
        } finally {
            setIsAudioExporting(false);
        }
    }, [cacheAudioForStory, cachedAudioUrl, safeTitle, story]);

    const handleExportBoth = useCallback(async () => {
        await handleExportAudio();
        await handleExportPdf();
    }, [handleExportAudio, handleExportPdf]);

    return (
        <div
            className={`h-screen container mx-auto flex flex-col overflow-hidden md:overflow-auto overflow-y-auto ${baloo2.className}`}
            style={{
                backgroundImage: "url('/story-background.svg')",
                backgroundSize: "contain",
                backgroundPosition: "center",
                backgroundRepeat: "repeat",
            }}
        >
            <div className="flex flex-col items-center justify-between h-10/12 md:h-full space-y-8">
                <div className="w-full bg-dark-red py-2 flex flex-wrap items-center gap-3 justify-between px-4 md:px-6">
                    <p className="text-xl md:text-2xl text-white font-semibold truncate">
                        {storyTitle || "Your Story Preview"}
                    </p>
                    {hasTextOnlySelection && (
                        <Button
                            type="button"
                            variant="outline"
                            size="sm"
                            className="bg-white text-dark-red hover:bg-white/90 flex items-center gap-2 text-lg"
                            onClick={handleExportPdf}
                            disabled={isPdfExporting}
                        >
                            {isPdfExporting ? (
                                <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                                <Download className="h-4 w-4" />
                            )}
                            Export PDF
                        </Button>
                    )}
                    {hasTextAndAudioSelection && (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    type="button"
                                    variant="outline"
                                    size="sm"
                                    className="bg-white text-dark-red hover:bg-white/90 flex items-center gap-2 text-xl"
                                    disabled={isAudioExporting}
                                >
                                    {isAudioExporting ? (
                                        <Loader2 className="h-4 w-4 animate-spin" />
                                    ) : (
                                        <Download className="h-4 w-4" />
                                    )}
                                    Export
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuItem onSelect={() => { void handleExportPdf(); }}>
                                    Export PDF
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => { void handleExportAudio(); }} disabled={isAudioExporting}>
                                    Export Audio
                                </DropdownMenuItem>
                                <DropdownMenuItem onSelect={() => { void handleExportBoth(); }} disabled={isAudioExporting}>
                                    Export Both
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    )}
                </div>
                <div className="flex flex-col items-center justify-between bg-white w-2/4 mx-auto h-3/4 md:h-1/2 w-3/4 shadow-xl/20 p-4 rounded-xl text-xl">
                    <div className="flex-1 w-full">
                        <Textarea
                            className="w-full h-full resize-none border border-dark-red/30 rounded-lg p-4 text-xl md:text-2xl leading-relaxed break-words whitespace-pre-wrap "
                            value={currentPage.pageContent}
                            onChange={(event) => handlePageTextChange(event.target.value)}
                            readOnly={!hasEditablePage || !isEditing}
                            aria-readonly={!hasEditablePage || !isEditing}
                        />
                    </div>
                    <div className="flex w-full items-center justify-between mt-4">
                        <p className="text-2xl text-dark-red font-bold">
                            {currentPage.pageNumber}
                        </p>
                        <div className="flex gap-3">
                            {!isEditing ? (
                                <Button
                                    variant="darkRed"
                                    size="sm"
                                    onClick={handleStartEditing}
                                    disabled={!hasEditablePage}
                                >
                                    Edit
                                </Button>
                            ) : (
                                <>
                                    <Button
                                        variant="outline"
                                        size="sm"
                                        onClick={handleResetChanges}
                                        disabled={!hasUnsavedChanges || !hasEditablePage}
                                    >
                                        Reset
                                    </Button>
                                    <Button
                                        variant="darkRed"
                                        size="sm"
                                        onClick={handleSaveChanges}
                                        disabled={!hasUnsavedChanges || !hasEditablePage}
                                    >
                                        Save
                                    </Button>
                                </>
                            )}
                        </div>
                    </div>
                </div>

                {showAudioPlayer && story && (
                    <div className="w-full px-2 md:w-2/4 md:px-0 mx-auto">
                        <AudioPlayer
                            storyTitle={story.title}
                            storyContent={story.content}
                            cachedAudioUrl={cachedAudioUrl}
                            onAudioCached={(url) => {
                                if (!story) {
                                    return;
                                }
                                cacheAudioForStory(story.title, story.content, url);
                            }}
                        />
                    </div>
                )}

                <div className="w-1/2 md:w-4/6 lg:w-full max-w-5xl mx-auto">
                    <Carousel opts={{ align: "start", slidesToScroll: 1 }} className="w-full mb-0 md:mb-4">
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
