"use client";
import Image from "next/image";
import { baloo2 } from "@/lib/fonts";
import { Stepper } from "@/components/ui/stepper";
import { Label } from "@/components/ui/label";
import StoryStyleButtons from "@/components/story-style-buttons";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { CardSelector } from "@/components/card-selector";
import { useStoryGeneration } from "@/lib/StoryGenerationContext";

export default function StoryStyleClient() {
    const { storyData, updateStoryStyle } = useStoryGeneration();

    const cardOptions = [
        { value: "adventure", label: "Adventure", emoji: "🖼️" },
        { value: "home", label: "Home", emoji: "🏡" },
        { value: "school", label: "School", emoji: "🏫" },
    ];

    const handleLengthChange = (value: string) => {
        updateStoryStyle({ length: value as 'short' | 'medium' | 'long' });
    };

    const handleThemeChange = (value: string) => {
        updateStoryStyle({ theme: value as 'adventure' | 'home' | 'school' });
    };

    const handleIslamicTeachingChange = (value: string) => {
        updateStoryStyle({ islamicTeaching: value === 'yes' });
    };

    return (
        <div className={`h-screen max-h-screen overflow-hidden container mx-auto pt-4 pb-2 flex flex-col ${baloo2.className}`}>
            <p className={`flex justify-start w-full text-xl font-bold px-4 ${baloo2.className}`}>
                <span className="text-yellow">Step 3: </span>&nbsp;Story Style
            </p>
            <div className="w-4/5 mx-auto mb-2">
                <Stepper steps={5} activeStep={3} colors={["var(--green)", "var(--orange)", "var(--yellow)"]} />
            </div>
            <div className="w-4/5 mx-auto flex-1 space-y-2 mb-2">
                <Label htmlFor="story-length" className="font-semibold mb-2 text-xl">How would you like your story to be?</Label>
                <RadioGroup value={storyData.storyStyle.length} onValueChange={handleLengthChange}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="short" id="short" />
                        <Label htmlFor="short" className="text-xl">Short</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="medium" id="medium" />
                        <Label htmlFor="medium" className="text-xl">Medium</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="long" id="long" />
                        <Label htmlFor="long" className="text-xl">Long</Label>
                    </div>
                </RadioGroup>
            </div>
            <div className="w-4/5 mx-auto flex-1 space-y-2 mb-2">
                <Label htmlFor="story-theme" className="font-semibold mb-2 text-lg">What theme do you imagine for the story?</Label>
                <CardSelector
                    color="yellow"
                    options={cardOptions}
                    className="flex gap-12 justify-center"
                    value={storyData.storyStyle.theme}
                    onChange={handleThemeChange}
                />
            </div>
            <div className="w-4/5 mx-auto flex-1 space-y-2 mb-2">
                <Label htmlFor="islamic-teaching" className="font-semibold mb-2 text-lg">Include Islamic Teaching Page?</Label>
                <RadioGroup value={storyData.storyStyle.islamicTeaching ? 'yes' : 'no'} onValueChange={handleIslamicTeachingChange}>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="yes" id="yes" />
                        <Label htmlFor="yes" className="text-lg">Yes</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="no" id="no" />
                        <Label htmlFor="no" className="text-lg">No</Label>
                    </div>
                </RadioGroup>
            </div>
            <div className="flex justify-between items-center ">
                <Image
                    src="/icons/hodge-icon.svg"
                    alt="Hodge Icon"
                    width={150}
                    height={150}
                    className="self-center ml-4"
                />
                <StoryStyleButtons />
            </div>
        </div>
    );
}
