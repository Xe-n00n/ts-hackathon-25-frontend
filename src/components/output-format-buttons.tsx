"use client";
import { useRouter } from "next/navigation";
import { baloo2 } from "@/lib/fonts";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"

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
                            <Button type="submit" variant="darkRed">Yes</Button>
                        </DialogFooter>
                    </DialogContent>
                </form>
            </Dialog>

            <Dialog>
                <DialogTrigger></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                        <DialogDescription>
                            This action cannot be undone. This will permanently delete your account
                            and remove your data from our servers.
                        </DialogDescription>
                    </DialogHeader>
                </DialogContent>
            </Dialog>

        </div >
    );
}