"use client";
import { useRouter } from "next/navigation";
import { baloo2 } from "@/lib/fonts";
import { Button } from "@/components/ui/button";

interface ChildInfoButtonsProps {
    isFormValid?: boolean;
}

export default function ChildInfoButtons({ isFormValid = true }: ChildInfoButtonsProps) {
    const router = useRouter();

    const handlePrevious = () => {
        router.push('/generate/');
    };

    const handleNext = () => {
        router.push('/generate/select-values');
    };

    return (
        <div className="flex items-center gap-4 mr-0 md:mr-16">
            <Button
                variant="greenOutline"
                className={`${baloo2.className}`}
                onClick={handlePrevious}
            >
                Previous
            </Button>
            <Button
                variant="green"
                className={`${baloo2.className}`}
                onClick={handleNext}
                disabled={!isFormValid}
            >
                Next
            </Button>
        </div>
    );
}