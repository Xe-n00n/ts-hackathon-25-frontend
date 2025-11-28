"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { baloo2 } from "@/lib/fonts";
import { Button } from "@/components/ui/button";

export default function StoryGenerateButton() {
    const router = useRouter();

    const handleClick = () => {
        router.push('/generate/child-info');
    };

    return (
        <div className="relative inline-block">
            <Button onClick={handleClick} className={`${baloo2.className} w-2xs h-16`}>Begin Story Creation</Button>
            <Image
                src="/icons/bird-icon.svg"
                alt="Bird Icon"
                width={20}
                height={20}
                className="absolute -top-8 left-60 -translate-x-1/2 w-[50px] h-auto"
            />
        </div>
    );
}