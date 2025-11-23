"use client";
import { useRouter } from "next/navigation";
import { baloo2 } from "@/lib/fonts";
import { Button } from "@/components/ui/button";

export default function OutputFormatButtons() {
    const router = useRouter();

    const handlePrevious = () => {
        router.push('/generate/custom-description');
    };

    const handleNext = () => {
        router.push('/about');
    };

    return (
        <div className="flex items-center gap-4 mr-16">
            <Button
                variant="darkRedOutline"
                className={`${baloo2.className}`}
                onClick={handlePrevious}
            >
                Previous
            </Button>
            <Button
                variant="darkRed"
                className={`${baloo2.className}`}
                onClick={handleNext}
            >
                Done
            </Button>
        </div>
    );
}