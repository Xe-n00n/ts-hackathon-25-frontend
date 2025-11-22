"use client";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Sheet, SheetContent, SheetTitle, SheetDescription } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/lib/AuthContext";
import { baloo2 } from "@/lib/fonts";

export default function Navbar() {
    const { user, isAuthenticated } = useAuth();
    const [open, setOpen] = useState(false);

    return (
        <>
            <nav className="hidden lg:flex h-screen w-64 bg-background border-r border-[#4645406B] shadow-2xl flex flex-col">
                {/* Logo */}
                <div className="p-4">
                    <Link href="/" className="flex items-center gap-2">
                        <Image src="/Main Logo.svg" alt="Hikaya Logo" width={40} height={40} />
                        <Image src="/App Name.svg" alt="Hikaya Title" width={100} height={100} />
                    </Link>
                </div>

                {/* Menu Links */}
                <div className="flex flex-col gap-2 p-4 flex-1 justify-between gap-8">
                    <div>
                        <div className="flex items-center pb-2">
                            <Image src="/icons/generate-icon.svg" alt="Generate Icon" width={14} height={14} />
                            <Link
                                href="/generate"
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
                    {/* Auth Buttons - Bottom */}
                    <div>
                        {!isAuthenticated ? (
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
                                {/* <Link href="/login">
                                    <Button size="sm" className="w-full">
                                        Sign In
                                    </Button>
                                </Link>
                                <Link href="/signup">
                                    <Button size="sm" variant="outline" className="w-full">
                                        Sign Up
                                    </Button>
                                </Link> */}
                            </div>
                        ) : (
                            <></>
                            // <Button
                            //     variant="ghost"
                            //     size="sm"
                            //     onClick={logout}
                            //     className="w-full justify-start"
                            // >
                            //     Sign Out
                            // </Button>
                        )}
                    </div>
                </div>


            </nav>

            <div className="lg:hidden fixed top-0 left-0 p-4 z-50">
                <Button variant="ghost" size="lg" onClick={() => setOpen(true)}>
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
                                        onClick={() => setOpen(false)}
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
                            {/* Auth Buttons - Bottom */}
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
