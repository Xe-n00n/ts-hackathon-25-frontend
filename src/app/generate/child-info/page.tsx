import Image from "next/image";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Stepper } from "@/components/ui/stepper";
import { baloo2 } from "@/lib/fonts";
import { GenderSelect } from "@/components/gender-select";
import { FileDropzone } from "@/components/file-drop";
import ChildInfoButtons from "@/components/child-info-buttons";

export default function ChildInfo() {

    return (
        <div className={`h-screen max-h-screen overflow-hidden container mx-auto pt-4 pb-2 flex flex-col ${baloo2.className}`}>
            <p className={`flex justify-start w-full text-xl font-bold px-4 ${baloo2.className}`}>
                <span className="text-green">Step 1: </span>&nbsp;Child Info
            </p>
            <div className="w-4/5 mx-auto mb-2">
                <Stepper steps={5} activeStep={1} colors={["var(--green)"]} />
            </div>
            <div className="grid grid-cols-2 gap-x-6 gap-y-4 w-4/5 mx-auto flex-1">
                <div className="flex flex-col">
                    <Label htmlFor="child-name" className="font-semibold mb-1">Name of your child</Label>
                    <Input type="text" />
                </div>
                <div className="flex flex-col">
                    <Label htmlFor="favourite-pet" className="font-semibold mb-1">Favourite Pet</Label>
                    <Input type="text" />
                </div>
                <div className="flex flex-col">
                    <Label htmlFor="child-age" className="font-semibold mb-1">Age of your Child</Label>
                    <Input type="text" />
                </div>
                <div className="flex flex-col">
                    <Label htmlFor="friends-name" className="font-semibold mb-1">Name of friends</Label>
                    <Input type="text" />
                    <Label htmlFor="gender" className="font-medium mt-2 text-green text-xs">(must be in this format "Lena, Dania, sarah")</Label>
                </div>
                <div className="flex flex-col">
                    <Label htmlFor="gender" className="font-semibold mb-1">Gender</Label>
                    <GenderSelect value={undefined} onValueChange={undefined} className={undefined} />
                </div>
                <div className="flex flex-col col-start-1">
                    <Label htmlFor="child-picture" className="font-semibold mb-1">A Picture of you Child</Label>
                    <FileDropzone />
                </div>
            </div>
            <div className="flex justify-between items-center ">
                <Image
                    src="/icons/dear-icon.svg"
                    alt="Dear Icon"
                    width={100}
                    height={100}
                    className="self-center ml-4"
                />
                <ChildInfoButtons />
            </div>
        </div>
    );
}
