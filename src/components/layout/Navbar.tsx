"use client";
import { useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/AuthContext";
import { baloo2 } from "@/lib/fonts";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { useStoryGeneration } from "@/lib/StoryGenerationContext";
import { RecentStory } from "@/lib/story-types";

export default function Navbar() {
    const { user, isAuthenticated } = useAuth();
    const [open, setOpen] = useState(false);
    const router = useRouter();
    const { resetStoryData, selectRecentStory, recentStories } = useStoryGeneration();

    // Handle creating a new story
    const handleNewStory = useCallback(() => {
        setOpen(false);
        resetStoryData();
        sessionStorage.removeItem('generatedStory');
    }, [resetStoryData]);

    // Handle clicking on recent story
    const handleRecentStoryClick = useCallback((story: RecentStory) => {
        selectRecentStory(story);
        router.push("/generate/preview-story");
        setOpen(false);
    }, [selectRecentStory, router]);

    // Render recent stories section
    const renderRecentStories = () => {
        const hasStories = recentStories.length > 0;

        return (
            <div className="w-full rounded-2xl px-1 py-2">
                <p className={`text-xl font-semibold text-purple mb-2 ${baloo2.className}`}>Recent</p>
                {hasStories ? (
                    <div className="space-y-2">
                        {recentStories.slice(0, 5).map((story, idx) => (
                            <button
                                key={`${story.title}-${idx}`}
                                onClick={() => handleRecentStoryClick(story)}
                                className={`w-full rounded-xl px-3 py-2 text-left text-base font-semibold text-gray shadow-sm transition hover:bg-purple/10 hover:text-purple focus-visible:outline focus-visible:outline-2 focus-visible:outline-purple/40 ${baloo2.className}`}
                            >
                                {story.title}
                            </button>
                        ))}
                    </div>
                ) : (
                    <p className={`text-base font-medium text-gray ${baloo2.className}`}>
                        No stories yet
                    </p>
                )}
            </div>
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
                                className={`text-xl px-2 font-semibold text-secondary transition-transform hover:scale-105 ${baloo2.className}`}
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

            <nav className="lg:hidden flex flex-col items-center justify-between w-14 bg-background border-r border-[#4645406B] shadow-2xl h-screen py-6 sticky top-0 overflow-y-auto">
                <button
                    type="button"
                    onClick={() => setOpen(true)}
                    className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-secondary/10 transition"
                >
                    <Image src="/icons/sidebar-icon.svg" alt="Expand sidebar" width={24} height={24} />
                    <span className="sr-only">Expand sidebar</span>
                </button>

                <div className="flex flex-col items-center gap-4">
                    <Link href="/generate" onClick={handleNewStory} className="p-2 rounded-full hover:bg-secondary/10 transition transform hover:scale-110">
                        <Image src="/icons/generate-icon.svg" alt="New Story" width={20} height={20} />
                        <span className="sr-only">New Story</span>
                    </Link>
                    <Link href="" className="p-2 rounded-full hover:bg-secondary/10 transition">
                        <Image src="/icons/draft-icon.svg" alt="Draft" width={20} height={20} />
                        <span className="sr-only">Draft</span>
                    </Link>
                    <Link href="" className="p-2 rounded-full hover:bg-secondary/10 transition">
                        <Image src="/icons/search-icon.svg" alt="Search" width={20} height={20} />
                        <span className="sr-only">Search</span>
                    </Link>
                    <Link href="" className="p-2 rounded-full hover:bg-secondary/10 transition">
                        <Image src="/icons/library-icon.svg" alt="Library" width={20} height={20} />
                        <span className="sr-only">Library</span>
                    </Link>
                    <Link href="" className="p-2 rounded-full hover:bg-secondary/10 transition">
                        <Image src="/icons/community-icon.svg" alt="Community" width={20} height={20} />
                        <span className="sr-only">Community</span>
                    </Link>
                </div>
                <div className="flex flex-col items-center gap-4">
                    <Link href="" className="p-2 rounded-full hover:bg-secondary/10 transition">
                        <Image src="/icons/trash-icon.svg" alt="trash" width={20} height={20} />
                        <span className="sr-only">Trash</span>
                    </Link>
                    <Link href="" className="p-2 rounded-full hover:bg-secondary/10 transition">
                        <Image src="/icons/settings-icon.svg" alt="Settings" width={20} height={20} />
                        <span className="sr-only">Settings</span>
                    </Link>
                </div>
            </nav>

            <Sheet open={open} onOpenChange={setOpen}>
                <SheetContent side="left" className="w-64 flex h-full max-h-screen flex-col">
                    <span className="sr-only">
                        <SheetTitle>Hikaya</SheetTitle>
                        <SheetDescription>Navigation menu</SheetDescription>
                    </span>

                    <div className="p-4 border-b flex-shrink-0">
                        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
                            <Image src="/Main Logo.svg" alt="Hikaya Logo" width={32} height={32} />
                            <Image src="/App Name.svg" alt="Hikaya Title" width={70} height={70} />
                        </Link>
                    </div>

                    <div className="flex-1 overflow-y-auto">
                        <div className="flex flex-col gap-6 justify-between p-4">
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
