"use client";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "./ui/button";
function getColorClasses(color: string) {
    console.log(`bg-${color}`, `text-${color}`);
    return {
        bg: `bg-${color}`,
        text: `text-${color}`
    };
}

export function TagInput({ color = "var(--gray)" }: { color?: string }) {
    const [tag, setTag] = useState("");
    const [tags, setTags] = useState<string[]>([]);
    const { bg, text } = getColorClasses(color);

    const addTag = () => {
        const newTag = tag.trim();
        if (newTag === "" || tags.includes(newTag)) return;
        setTags([...tags, newTag]);
        setTag("");
    };

    return (
        <div className="mx-auto w-full">
            <div className="flex w-full border-[1.5px] border-gray rounded-[15px] px-3 py-2 bg-background">
                <Input
                    className="flex-1 border-none bg-background outline-none shadow-none"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    placeholder="Add tag"
                    onKeyDown={(e) => {
                        if (e.key === "Enter") addTag();
                    }}
                />
                <button
                    type="button"
                    onClick={addTag}
                    className={`rounded-full w-8 h-8 flex items-center justify-center ${text} text-2xl font-bold transition ml-2`}
                    aria-label="Add tag"
                >
                    +
                </button>
            </div>
            <div className="flex gap-4 mt-4">
                {tags.map((t) => (
                    <Button
                        key={t}
                        type="button"
                        className={`rounded-full px-6 py-3 text-xl font-semibold ${bg} text-white`}
                    >
                        {t}
                    </Button>
                ))}
            </div>
        </div>
    );
}
