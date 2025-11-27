"use client";
import { useRouter } from "next/navigation";
import { baloo2 } from "@/lib/fonts";
import { Button } from "@/components/ui/button";

export default function CustomDescriptionButtons() {
    const router = useRouter();

    const handlePrevious = () => {
        router.push('/generate/story-style');
    };

    const handleNext = () => {
        router.push('/generate/output-format');
    };

    return (
        <div className="flex items-center gap-4 mr-0 md:mr-16">
            <Button
                variant="purpleOutline"
                className={`${baloo2.className}`}
                onClick={handlePrevious}
            >
                Previous
            </Button>
            <Button
                variant="purple"
                className={`${baloo2.className}`}
                onClick={handleNext}
            >
                Next
            </Button>
        </div>
    );
}