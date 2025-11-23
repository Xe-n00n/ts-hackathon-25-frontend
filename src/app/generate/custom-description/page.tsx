import { baloo2 } from "@/lib/fonts";
import Image from "next/image";
import { Stepper } from "@/components/ui/stepper";
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import CustomDescriptionButtons from "@/components/custom-description-buttons";
import { TagInput } from "@/components/tag-input";


export default function SelectValues() {

    return (
        <div className={`h-screen max-h-screen overflow-hidden container mx-auto pt-4 pb-2 flex flex-col ${baloo2.className}`}>
            <p className={`flex justify-start w-full text-xl font-bold px-4 ${baloo2.className}`}>
                <span className="text-purple">Step 4: </span>&nbsp;Custom Description
            </p>
            <div className="w-4/5 mx-auto mb-2">
                <Stepper steps={5} activeStep={1} colors={["var(--green)", "var(--orange)", "var(--yellow)", "var(--purple)"]} />
            </div>
            <div className="w-4/5 mx-auto flex-1 space-y-4">
                <div className="flex flex-col">
                    <Label htmlFor="personal-description" className="font-semibold mb-2 text-2xl">Add a Personal Description (Optional)</Label>
                    <Textarea className="h-36" />
                </div>
                <div className="flex flex-col">
                    <Label htmlFor="custom-description-tags" className="font-semibold mb-2 text-2xl">Tags</Label>
                    <TagInput color="purple" />
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
                <CustomDescriptionButtons />
            </div>
        </div>
    );
}
