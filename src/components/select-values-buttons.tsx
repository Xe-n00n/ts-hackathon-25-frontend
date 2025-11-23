"use client";
import { useRouter } from "next/navigation";
import { baloo2 } from "@/lib/fonts";
import { Button } from "@/components/ui/button";

export default function SelectValuesButtons() {
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
                variant="orangeOutline"
                className={`${baloo2.className}`}
                onClick={handlePrevious}
            >
                Previous
            </Button>
            <Button
                variant="orange"
                className={`${baloo2.className}`}
                onClick={handleNext}
            >
                Next
            </Button>
        </div>
    );
}