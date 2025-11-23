import { baloo2 } from "@/lib/fonts";
import Image from "next/image";
import { Stepper } from "@/components/ui/stepper";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import SelectValuesButtons from "@/components/select-values-buttons";
import { TagInput } from "@/components/tag-input";


export default function SelectValues() {

    return (
        <div className={`h-screen max-h-screen overflow-hidden container mx-auto pt-4 pb-2 flex flex-col ${baloo2.className}`}>
            <p className={`flex justify-start w-full text-xl font-bold px-4 ${baloo2.className}`}>
                <span className="text-orange">Step 2: </span>&nbsp;Select Values
            </p>
            <div className="w-4/5 mx-auto mb-2">
                <Stepper steps={5} activeStep={1} colors={["var(--green)", "var(--orange)"]} />
            </div>
            <div className="w-4/5 mx-auto flex-1 space-y-4">
                <div className="flex flex-col">
                    <Label htmlFor="story-goal" className="font-semibold mb-2 text-2xl">What is your goal from the story?</Label>
                    <Input type="text" className="h-36" />
                </div>
                <div className="flex flex-col">
                    <Label htmlFor="favourite-pet" className="font-semibold mb-2 text-2xl">Tags</Label>
                    <TagInput />
                </div>
            </div>
            <div className="flex justify-between items-center ">
                <Image
                    src="/icons/rabbit-icon.svg"
                    alt="Rabbit Icon"
                    width={150}
                    height={150}
                    className="self-center ml-4"
                />
                <SelectValuesButtons />
            </div>
        </div>
    );
}
