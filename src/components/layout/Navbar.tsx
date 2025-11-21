"use client";

import { Button } from "@/components/ui/button";
import {
    Sheet,
    SheetContent,
    SheetDescription,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { Menu } from "lucide-react";
import Link from "next/link";
import { useAuth } from "@/lib/AuthContext";

export default function Navbar() {
    const { user, logout, isAuthenticated } = useAuth();

    return (
        <nav className="w-full border-b bg-white shadow-sm">
            <div className="flex items-center justify-between h-16 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">

                {/* Logo */}
                <Link href="/" className="text-2xl font-bold tracking-tight text-teal-400">
                    Hikaya
                </Link>

                {/* Desktop Menu - Centered */}
                <div className="hidden md:flex gap-6 items-center absolute left-1/2 transform -translate-x-1/2">
                    <Link
                        href="/"
                        className="text-sm hover:text-blue-600 transition-colors"
                    >
                        Home
                    </Link>
                    <Link
                        href="/generate"
                        className="text-sm hover:text-blue-600 transition-colors"
                    >
                        Generate
                    </Link>
                    <Link
                        href="/about"
                        className="text-sm hover:text-blue-600 transition-colors"
                    >
                        About
                    </Link>
                </div>

                {/* Auth Buttons - Right aligned */}
                <div className="hidden md:flex gap-10 items-center">
                    {!isAuthenticated ? (
                        <>
                            <Link href="/login">
                                <Button size="sm">
                                    Sign In
                                </Button>
                            </Link>
                            <Link href="/signup">
                                <Button size="sm">
                                    Sign Up
                                </Button>
                            </Link>
                        </>
                    ) : (
                        <Button
                            variant="ghost"
                            size="sm"
                            onClick={logout}
                        >
                            Sign Out
                        </Button>
                    )}
                </div>

                {/* Mobile Menu */}
                <Sheet>
                    <SheetTrigger asChild>
                        <Button variant="ghost" className="md:hidden px-10 h-10" size="lg">
                            <Menu />
                        </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-64">
                        <SheetTitle>Hikaya</SheetTitle>
                        <SheetDescription />
                        <div className="flex flex-col gap-4 mt-6 text-lg">
                            <Link href="/">Home</Link>
                            <Link href="/generate">Generate</Link>
                            <Link href="/about">About</Link>
                            {!isAuthenticated ? (
                                <>
                                    <Link href="/login">Sign In</Link>
                                    <Link href="/signup">Sign Up</Link>
                                </>
                            ) : (
                                <button
                                    onClick={logout}
                                    className="text-left w-full hover:bg-gray-50 p-2 rounded"
                                >
                                    Sign Out
                                </button>
                            )}
                        </div>
                    </SheetContent>
                </Sheet>
            </div>
        </nav>
    );
}
