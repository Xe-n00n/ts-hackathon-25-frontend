"use client";
import { useRouter } from "next/navigation";
import { baloo2 } from "@/lib/fonts";
import { Button } from "@/components/ui/button";

export default function CustomDescriptionButtons() {
    const router = useRouter();

    const handlePrevious = () => {
        router.push('/generate/child-info');
    };

    const handleNext = () => {
        router.push('/generate/select-values');
    };

    return (
        <div className="flex items-center gap-4 mr-16">
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