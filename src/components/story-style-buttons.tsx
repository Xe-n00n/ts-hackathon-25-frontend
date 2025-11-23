"use client";
import { useRouter } from "next/navigation";
import { baloo2 } from "@/lib/fonts";
import { Button } from "@/components/ui/button";

export default function StoryStyleButtons() {
    const router = useRouter();

    const handlePrevious = () => {
        router.push('/generate/select-values');
    };

    const handleNext = () => {
        router.push('/generate/custom-description');
    };

    return (
        <div className="flex items-center gap-4 mr-16">
            <Button
                variant="yellowOutline"
                className={`${baloo2.className}`}
                onClick={handlePrevious}
            >
                Previous
            </Button>
            <Button
                variant="yellow"
                className={`${baloo2.className}`}
                onClick={handleNext}
            >
                Next
            </Button>
        </div>
    );
}