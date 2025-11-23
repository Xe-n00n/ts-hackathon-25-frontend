import { baloo2 } from "@/lib/fonts";
import Image from "next/image";
import { Stepper } from "@/components/ui/stepper";
import { Label } from "@/components/ui/label"
import StoryStyleButtons from "@/components/story-style-buttons";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { CardSelector } from "@/components/card-selector";

export default function StoryStyle() {
    const cardOptions = [
        {
            value: "adventure",
            label: "Adventure",
            emoji: "🖼️"
        },
        {
            value: "home",
            label: "Home",
            emoji: "🏡"
        },
        {
            value: "school",
            label: "School",
            emoji: "🏫"
        },
    ];
    return (
        <div className={`h-screen max-h-screen overflow-hidden container mx-auto pt-4 pb-2 flex flex-col ${baloo2.className}`}>
            <p className={`flex justify-start w-full text-xl font-bold px-4 ${baloo2.className}`}>
                <span className="text-yellow">Step 3: </span>&nbsp;Story Style
            </p>
            <div className="w-4/5 mx-auto mb-2">
                <Stepper steps={5} activeStep={1} colors={["var(--green)", "var(--orange)", "var(--yellow)"]} />
            </div>
            <div className="w-4/5 mx-auto flex-1 space-y-2 mb-2">
                <Label htmlFor="story-length" className="font-semibold mb-2 text-xl">How would you like your story to be?</Label>
                <RadioGroup defaultValue="">
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
                <Label htmlFor="story-length" className="font-semibold mb-2 text-lg">What theme do you imagine for the story?</Label>
                <CardSelector color="yellow" options={cardOptions} className="flex gap-12 justify-center" />
            </div>
            <div className="w-4/5 mx-auto flex-1 space-y-2 mb-2">
                <Label htmlFor="story-length" className="font-semibold mb-2 text-lg">Include Islamic Teaching Page?</Label>
                <RadioGroup defaultValue="">
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
