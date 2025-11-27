"use client";
import Image from "next/image";
import { baloo2 } from "@/lib/fonts";
import { Stepper } from "@/components/ui/stepper";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useStoryGeneration } from "@/lib/StoryGenerationContext";
import FormButtons from "@/components/buttons/form-buttons";

export default function CustomDescriptionClient() {
    const { storyData, updateCustomDescription } = useStoryGeneration();

    const handleDescriptionChange = (value: string) => {
        updateCustomDescription({ personalDescription: value });
    };

    return (
        <div className={`h-screen max-h-screen overflow-auto md:overflow-hidden container mx-auto pt-4 pb-2 flex flex-col ${baloo2.className}`}>
            <p className={`flex justify-start w-full text-xl font-bold px-4 ${baloo2.className}`}>
                <span className="text-purple">Step 4: </span>&nbsp;Custom Description
            </p>
            <div className="w-4/5 mx-auto mb-2">
                <Stepper steps={5} activeStep={4} colors={["var(--green)", "var(--orange)", "var(--yellow)", "var(--purple)"]} />
            </div>
            <div className="min-h-96 md:min-h-0 w-4/5 mx-auto md:flex-1 space-y-6">
                <div className="flex flex-col">
                    <Label htmlFor="personal-description" className="font-semibold mb-2 text-2xl">Add a Personal Description (Optional)</Label>
                    <Textarea
                        className="h-36"
                        value={storyData.customDescription.personalDescription}
                        onChange={(e) => handleDescriptionChange(e.target.value)}
                        placeholder="Brown hair, green eyes, hijabi..."
                    />
                </div>
            </div>
            <div className="flex flex-col-reverse gap-4 mt-6 md:flex-row justify-between items-center">
                <Image
                    src="/icons/owl-icon.svg"
                    alt="Owl Icon"
                    width={150}
                    height={150}
                    className="self-center ml-4"
                />
                <FormButtons variant="purple" previousRoute="/generate/story-style" nextRoute="/generate/output-format" />
            </div>
        </div>
    );
}
