"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { baloo2 } from "@/lib/fonts";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

export default function OutputFormatButtons() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState(false);

    const handlePrevious = () => {
        router.push('/generate/custom-description');
    };

    const handleDone = async () => {
        setIsLoading(true);
        // Simulate processing time
        await new Promise(resolve => setTimeout(resolve, 2000));
        router.push('/generate/preview-story');
    };

    if (isLoading) {
        return (
            <div className="fixed inset-0 bg-dark-red w-screen h-screen flex items-center justify-center z-50">
                <div className="text-center">
                    <div className="mx-auto w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mb-6"></div>
                    <p className={`text-2xl text-white font-extrabold ${baloo2.className}`}>Your story now is in the oven</p>
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
            <Dialog>
                <form>
                    <DialogTrigger asChild>
                        <Button
                            variant="darkRed"
                            className={`${baloo2.className}`}
                        >
                            Done
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px] w-4xl h-48 bg-white border border-dark-red rounded-2xl p-6">
                        <DialogHeader>
                            <DialogTitle className={`text-center text-3xl font-medium  ${baloo2.className}`}>Are you sure?</DialogTitle>
                        </DialogHeader>
                        <DialogFooter className="flex justify-between items-center">
                            <DialogClose asChild>
                                <Button variant="darkRedOutline">Cancel</Button>
                            </DialogClose>
                            <Button type="submit" variant="darkRed" onClick={handleDone}>Yes</Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>


        </div>
    );
}