"use client";
import Image from "next/image";
import { baloo2 } from "@/lib/fonts";
import { Stepper } from "@/components/ui/stepper";
import OutputFormatButtons from "@/components/buttons/output-format-buttons";
import { CardSelector } from "@/components/card-selector";
import { Label } from "@/components/ui/label";
import { useStoryGeneration } from "@/lib/StoryGenerationContext";
import { OutputFormatOption } from "@/lib/story-types";

export default function OutputFormatClient() {
    const { storyData, updateOutputFormat } = useStoryGeneration();

    const cardOptions = [
        { value: "text-only", label: "Text Only", emoji: "📄" },
        { value: "illustrated-digital-book", label: "Illustrated Digital Book", emoji: "🖼️" },
        { value: "audio-version", label: "Audio Version", emoji: "🎧" },
        { value: "printable-pdf", label: "Printable PDF", emoji: " 🖨️" },
    ];

    const handleFormatChange = (value: string | string[]) => {
        if (!Array.isArray(value)) {
            return;
        }
        if (value.length === 0) {
            // Prevent clearing the final selection entirely
            return;
        }
        updateOutputFormat(value as OutputFormatOption[]);
    };

    return (
        <div className={`h-screen max-h-screen overflow-auto md:overflow-hidden container mx-auto pt-4 pb-2 flex flex-col ${baloo2.className}`}>
            <p className={`flex justify-start w-full text-xl font-bold px-4 ${baloo2.className}`}>
                <span className="text-dark-red">Step 5: </span>&nbsp;Output Format
            </p>
            <div className="w-full md:w-4/5 px-4 md:px-0 mx-auto mb-2">
                <Stepper steps={5} activeStep={5} colors={["var(--green)", "var(--orange)", "var(--yellow)", "var(--purple)", "var(--dark-red)"]} />
            </div>
            <div className="w-full md:w-4/5 px-4 md:px-0 mx-auto flex-1 space-y-2 mb-2">
                <Label htmlFor="output-format" className="font-semibold mb-10 text-3xl">Choose Output Format</Label>
                <CardSelector
                    color="dark-red"
                    options={cardOptions}
                    className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-12 max-w-4xl mx-auto justify-items-center"
                    value={storyData.outputFormat}
                    onChange={handleFormatChange}
                    multiple
                />
            </div>

            <div className="flex flex-col-reverse gap-0 md:gap-4 mt-6 md:flex-row justify-between items-center">
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
