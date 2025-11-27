"use client";
import { useRouter } from "next/navigation";
import { baloo2 } from "@/lib/fonts";
import { Button } from "@/components/ui/button";

interface SelectValuesButtonsProps {
    isFormValid?: boolean;
}

export default function SelectValuesButtons({ isFormValid = true }: SelectValuesButtonsProps) {
    const router = useRouter();

    const handlePrevious = () => {
        router.push('/generate/child-info');
    };

    const handleNext = () => {
        router.push('/generate/story-style');
    };

    return (
        <div className="flex items-center gap-4 mr-0 md:mr-16">
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
                disabled={!isFormValid}
            >
                Next
            </Button>
        </div>
    );
}
