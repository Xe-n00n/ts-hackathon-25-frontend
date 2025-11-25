"use client";
import { baloo2 } from "@/lib/fonts";
import Image from "next/image";
import { Stepper } from "@/components/ui/stepper";
import OutputFormatButtons from "@/components/output-format-buttons";
import { CardSelector } from "@/components/card-selector";
import { Label } from "@/components/ui/label"
import { useStoryGeneration } from "@/lib/StoryGenerationContext";

export default function OutputFormat() {
    const { storyData, updateOutputFormat } = useStoryGeneration();

    const cardOptions = [
        {
            value: "text-only",
            label: "Text Only ",
            emoji: "🖼️"
        },
        {
            value: "illustrated-digital-book",
            label: "Illustrated Digital Book ",
            emoji: "🏡"
        },
        {
            value: "audio-version",
            label: "Audio Version",
            emoji: "🏫"
        },
        {
            value: "printable-pdf",
            label: "Printable PDF",
            emoji: "🏫"
        },
    ];

    const handleFormatChange = (value: string) => {
        updateOutputFormat(value as 'text-only' | 'illustrated-digital-book' | 'audio-version' | 'printable-pdf');
    };

    return (
        <div className={`h-screen max-h-screen overflow-hidden container mx-auto pt-4 pb-2 flex flex-col ${baloo2.className}`}>
            <p className={`flex justify-start w-full text-xl font-bold px-4 ${baloo2.className}`}>
                <span className="text-dark-red">Step 5: </span>&nbsp;Output Format
            </p>
            <div className="w-4/5 mx-auto mb-2">
                <Stepper steps={5} activeStep={5} colors={["var(--green)", "var(--orange)", "var(--yellow)", "var(--purple)", "var(--dark-red)"]} />
            </div>
            <div className="w-4/5 mx-auto flex-1 space-y-2 mb-2">
                <Label htmlFor="story-length" className="font-semibold mb-2 text-3xl">Choose Output Format</Label>
                <CardSelector
                    color="dark-red"
                    options={cardOptions}
                    className="grid grid-cols-2 gap-12 w-4/5 mx-auto"
                    value={storyData.outputFormat}
                    onChange={handleFormatChange}
                />
            </div>

            <div className="flex justify-between items-center ">
                <Image
                    src="/icons/sitting-bear-icon.svg"
                    alt="Sitting Bear Icon"
                    width={150}
                    height={150}
                    className="self-center ml-4"
                />
                <OutputFormatButtons />
            </div>
        </div>
    );
}
