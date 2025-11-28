"use client";
import { useRouter } from "next/navigation";
import { baloo2 } from "@/lib/fonts";
import { Button } from "@/components/ui/button";
import type { ComponentPropsWithoutRef } from "react";

type ButtonProps = ComponentPropsWithoutRef<typeof Button>;
type ButtonVariant = ButtonProps["variant"];

interface ChildInfoButtonsProps {
    isFormValid?: boolean;
    variant: string;
    previousRoute: string;
    nextRoute: string;
}

export default function FormButtons({ isFormValid = true, variant, previousRoute, nextRoute }: ChildInfoButtonsProps) {
    const router = useRouter();

    const handlePrevious = () => {
        router.push(previousRoute);
    };

    const handleNext = () => {
        router.push(nextRoute);
    };
    const outlineVariant = (`${variant}Outline`) as unknown as ButtonVariant;
    const variantString = (variant) as unknown as ButtonVariant;

    return (
        <div className="flex items-center gap-4 mr-0 md:mr-16">
            <Button
                variant={outlineVariant}
                className={`${baloo2.className}`}
                onClick={handlePrevious}
            >
                Previous
            </Button>
            <Button
                variant={variantString}
                className={`${baloo2.className}`}
                onClick={handleNext}
                disabled={!isFormValid}
            >
                Next
            </Button>
        </div>
    );
}