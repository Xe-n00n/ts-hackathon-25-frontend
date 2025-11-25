"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { baloo2 } from "@/lib/fonts";
import { Button } from "@/components/ui/button";
import { useStoryGeneration } from "@/lib/StoryGenerationContext";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";

export default function OutputFormatButtons() {
    const router = useRouter();
    const { generateStory, isLoading } = useStoryGeneration();
    const [dialogOpen, setDialogOpen] = useState(false);
    const [isStoryLoading, setIsStoryLoading] = useState(false);

    const handlePrevious = () => {
        router.push("/generate/custom-description");
    };

    const handleDone = async () => {
        try {
            setIsStoryLoading(true);
            const start = Date.now();
            const result = await generateStory();

            // Enforce a minimum of 3 seconds loading
            const elapsed = Date.now() - start;
            const remaining = 2000 - elapsed;

            if (remaining > 0) {
                await new Promise((res) => setTimeout(res, remaining));
            }

            router.push("/generate/preview-story");

        } catch (error) {
            console.error("Error generating story:", error);
        }
    };

    if (isStoryLoading) {
        return (
            <div className="fixed inset-0 bg-dark-red w-screen h-screen flex items-center justify-center z-50">
                <div className="text-center">
                    <div className="mx-auto w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-6"></div>
                    <p className={`text-2xl text-white font-extrabold ${baloo2.className}`}>
                        Your story is in the oven...
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-4 mr-16">
            <Button
                variant="darkRedOutline"
                className={`${baloo2.className}`}
                onClick={handlePrevious}
            >
                Previous
            </Button>

            <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                <DialogTrigger asChild>
                    <Button
                        variant="darkRed"
                        className={`${baloo2.className}`}
                    >
                        Done
                    </Button>
                </DialogTrigger>

                <DialogContent className="sm:max-w-[425px] bg-white border border-dark-red rounded-2xl p-6">
                    <DialogHeader>
                        <DialogTitle
                            className={`text-center text-3xl font-medium ${baloo2.className}`}
                        >
                            Are you sure?
                        </DialogTitle>
                    </DialogHeader>

                    <DialogFooter className="flex justify-between items-center">
                        <DialogClose asChild>
                            <Button variant="darkRedOutline">
                                Cancel
                            </Button>
                        </DialogClose>
                        <Button
                            variant="darkRed"
                            onClick={handleDone}
                            disabled={isLoading}
                        >
                            Yes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}
