"use client";
import { useState, useCallback } from "react";
import { Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/lib/AuthContext";
import { baloo2 } from "@/lib/fonts";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useStoryGeneration } from "@/lib/StoryGenerationContext";

export default function Navbar() {
    const { user, isAuthenticated } = useAuth();
    const [open, setOpen] = useState(false);
    const { resetStoryData, getLatestStoryTitle, selectRecentStory, recentStories } = useStoryGeneration();

    // Get latest story title
    const latestStoryTitle = getLatestStoryTitle();

    // Handle creating a new story
    const handleNewStory = useCallback(() => {
        setOpen(false);
        resetStoryData();
        sessionStorage.removeItem('generatedStory');
    }, [resetStoryData]);

    // Handle clicking on recent story
    const handleRecentStoryClick = useCallback((story: any) => {
        selectRecentStory(story);
        setOpen(false);
    }, [selectRecentStory]);

    // Render recent stories section
    const renderRecentStories = () => {
        if (recentStories.length > 0) {
            return (
                <>
                    <p className={`text-xl font-semibold text-purple ${baloo2.className}`}>Recent</p>
                    {recentStories.slice(0, 5).map((story, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleRecentStoryClick(story)}
                            className={`text-left text-base font-medium text-gray hover:text-purple transition-colors ${baloo2.className}`}
                        >
                            {story.title}
                        </button>
                    ))}
                </>
            );
        }

        return (
            <>
                <p className={`text-xl font-semibold text-purple ${baloo2.className}`}>Recent</p>
                <p className={`text-base font-medium text-gray ${baloo2.className}`}>
                    No stories yet
                </p>
            </>
        );
    };

    return (
        <>
            <nav className="hidden lg:flex h-screen w-64 bg-background border-r border-[#4645406B] shadow-2xl flex flex-col">
                {/* Logo */}
                <div className="pt-4 px-4 mb-2">
                    <Link href="/" className="flex items-center gap-3">
                        <Image src="/Main Logo.svg" alt="Hikaya Logo" width={40} height={40} className="mb-1" />
                        <Image src="/App Name.svg" alt="Hikaya Title" width={100} height={100} />
                    </Link>
                </div>

                {/* Menu Links */}
                <div className="flex flex-col pt-4 px-4 flex-1 justify-between">
                    <div>
                        <div className="flex items-center pb-2">
                            <Image src="/icons/generate-icon.svg" alt="Generate Icon" width={14} height={14} />
                            <Link
                                href="/generate"
                                onClick={handleNewStory}
                                className={`text-xl px-2  font-semibold text-secondary ${baloo2.className}`}
                            >
                                New Story
                            </Link>
                        </div>
                        <div className="flex items-center pb-2">
                            <Image src="/icons/draft-icon.svg" alt="Draft Icon" width={14} height={14} />
                            <Link
                                href=""
                                className={`text-xl px-2 font-semibold text-secondary ${baloo2.className}`}
                            >
                                Draft
                            </Link>
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center pb-2">
                            <Image src="/icons/search-icon.svg" alt="Search Icon" width={14} height={14} />
                            <Link
                                href=""
                                className={`text-xl px-2 font-semibold text-secondary ${baloo2.className}`}
                            >
                                Search
                            </Link>
                        </div>
                        <div className="flex items-center pb-2">
                            <Image src="/icons/library-icon.svg" alt="Library Icon" width={14} height={14} />
                            <Link
                                href=""
                                className={`text-xl px-2 font-semibold text-secondary ${baloo2.className}`}
                            >
                                Library
                            </Link>
                        </div>
                        <div className="flex items-center pb-2">
                            <Image src="/icons/community-icon.svg" alt="Community Icon" width={14} height={14} />
                            <Link
                                href=""
                                className={`text-xl px-2 font-semibold text-secondary ${baloo2.className}`}
                            >
                                Community
                            </Link>
                        </div>
                    </div>
                    <div>
                        <div className="flex flex-col items-start space-y-2">
                            {renderRecentStories()}
                        </div>
                    </div>
                    <div>
                        <div className="flex items-center pb-2">
                            <Image src="/icons/trash-icon.svg" alt="Trash Icon" width={14} height={14} />
                            <Link
                                href=""
                                className={`text-xl px-2 font-semibold text-secondary ${baloo2.className}`}
                            >
                                Trash
                            </Link>
                        </div>
                        <div className="flex items-center pb-2">
                            <Image src="/icons/settings-icon.svg" alt="Settings Icon" width={14} height={14} />
                            <Link
                                href=""
                                className={`text-xl px-2 font-semibold text-secondary ${baloo2.className}`}
                            >
                                Settings
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="lg:hidden fixed top-0 left-0 p-4 z-50">
                <Button size="lg" onClick={() => setOpen(true)}>
                    <Menu />
                </Button>
            </div>

            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="left" className="w-64 flex flex-col h-full">
                    <span className="sr-only">
                        <SheetTitle>Hikaya</SheetTitle>
                        <SheetDescription>Navigation menu</SheetDescription>
                    </span>

                    <div className="p-4 border-b">
                        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                            <Image src="/Main Logo.svg" alt="Hikaya Logo" width={32} height={32} />
                            <Image src="/App Name.svg" alt="Hikaya Title" width={70} height={70} />
                        </Link>
                    </div>

                    <div className="flex flex-col gap-2 p-4 flex-1">
                        <div className="flex flex-col gap-2 p-4 flex-1 justify-between gap-8">
                            <div>
                                <div className="flex items-center pb-2">
                                    <Image src="/icons/generate-icon.svg" alt="Generate Icon" width={14} height={14} />
                                    <Link
                                        href="/generate"
                                        className={`text-xl px-2 font-semibold text-secondary ${baloo2.className}`}
                                        onClick={handleNewStory}
                                    >
                                        New Story
                                    </Link>
                                </div>
                                <div className="flex items-center pb-2">
                                    <Image src="/icons/draft-icon.svg" alt="Draft Icon" width={14} height={14} />
                                    <Link
                                        href=""
                                        className={`text-xl px-2 font-semibold text-secondary ${baloo2.className}`}
                                        onClick={() => setOpen(false)}
                                    >
                                        Draft
                                    </Link>
                                </div>
                            </div>

                            <div>
                                <div className="flex items-center pb-2">
                                    <Image src="/icons/search-icon.svg" alt="Search Icon" width={14} height={14} />
                                    <Link
                                        href=""
                                        className={`text-xl px-2 font-semibold text-secondary ${baloo2.className}`}
                                        onClick={() => setOpen(false)}
                                    >
                                        Search
                                    </Link>
                                </div>
                                <div className="flex items-center pb-2">
                                    <Image src="/icons/library-icon.svg" alt="Library Icon" width={14} height={14} />
                                    <Link
                                        href=""
                                        className={`text-xl px-2 font-semibold text-secondary ${baloo2.className}`}
                                        onClick={() => setOpen(false)}
                                    >
                                        Library
                                    </Link>
                                </div>
                                <div className="flex items-center pb-2">
                                    <Image src="/icons/community-icon.svg" alt="Community Icon" width={14} height={14} />
                                    <Link
                                        href=""
                                        className={`text-xl px-2 font-semibold text-secondary ${baloo2.className}`}
                                        onClick={() => setOpen(false)}
                                    >
                                        Community
                                    </Link>
                                </div>
                            </div>
                            <div className="flex flex-col items-start space-y-2">
                                {renderRecentStories()}
                            </div>
                            <div>
                                {!isAuthenticated ? (
                                    <div>
                                        <div className="flex items-center pb-2">
                                            <Image src="/icons/trash-icon.svg" alt="Trash Icon" width={14} height={14} />
                                            <Link
                                                href=""
                                                className={`text-xl px-2 font-semibold text-secondary ${baloo2.className}`}
                                                onClick={() => setOpen(false)}
                                            >
                                                Trash
                                            </Link>
                                        </div>
                                        <div className="flex items-center pb-2">
                                            <Image src="/icons/settings-icon.svg" alt="Settings Icon" width={14} height={14} />
                                            <Link
                                                href=""
                                                className={`text-xl px-2 font-semibold text-secondary ${baloo2.className}`}
                                                onClick={() => setOpen(false)}
                                            >
                                                Settings
                                            </Link>
                                        </div>
                                    </div>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </div>
                    </div>
                </SheetContent>
            </Sheet>
        </>
    );
}
