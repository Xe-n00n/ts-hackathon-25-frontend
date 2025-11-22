import Image from "next/image";
import { baloo2, quicksand } from "@/lib/fonts";
import { Stepper } from "@/components/ui/stepper";
import StoryGenerateButton from "@/components/generate-story-button";

export default function Generate() {
    return (
        <div className="h-screen max-h-screen overflow-hidden container mx-auto py-4 flex flex-col items-center justify-between">
            <div className="flex flex-col items-center">

                <h1 className={`text-3xl font-bold text-secondary my-6 ${quicksand.className}`}>
                    Create <span className="text-green">a </span>
                    <span className="text-orange"><span className="underline decoration-orange">Mag</span><span className="underline decoration-yellow">ical</span></span> <span className="text-yellow underline decoration-yellow">Story</span>
                    <span className="text-purple"> for</span> <span className="text-[#464540]">Your</span>
                    <div className="relative inline-block">
                        <span className="text-dark-red"> Child</span>
                        <Image
                            src="/icons/bear-icon.svg"
                            alt="Bear Icon"
                            width={15}
                            height={15}
                            className="absolute -top-6 left-17 -translate-x-1/2 w-[40px] h-auto"
                        />
                    </div>
                </h1>
                <h2 className={`text-md font-medium ${quicksand.className}`}>Follow the steps below to personalize the perfect adventure.</h2>
            </div>

            <div className="w-4/5 px-4">
                <div className="flex justify-between">
                    <p className={`text-md font-medium ${baloo2.className}`}><span className="text-green">step 1: </span>Child Info</p>
                    <p className={`text-md font-medium ${baloo2.className}`}><span className="text-yellow">step 3: </span>Story Style</p>
                    <p className={`text-md font-medium ${baloo2.className}`}><span className="text-dark-red">step 5: </span>Output Format</p>
                </div>
                <Stepper steps={5} />
                <div className="flex justify-around">
                    <p className={`text-md font-medium ${baloo2.className}`}><span className="text-orange">step 2: </span>Select Values</p>
                    <p className={`text-md font-medium ${baloo2.className}`}><span className="text-purple">step 4: </span>Custom Description</p>


                </div>
                <div className="mt-16 text-center">
                    <StoryGenerateButton />
                </div>
            </div>

            <div className="w-full flex justify-between">
                <div className="flex">
                    <Image
                        src="/icons/big-bear.svg"
                        alt="Bear Icon"
                        width={170}
                        height={170}
                        className="absolute top-113"
                    />
                    <Image
                        src="/icons/leaves.svg"
                        alt="Leaves Icon"
                        width={30}
                        height={30}
                        className="absolute left-107 bottom-30"
                    />
                </div>
                <div className="flex">
                    <Image
                        src="/icons/tree-icon.svg"
                        alt="Tree Icon"
                        width={30}
                        height={30}
                        className="absolute bottom-0 right-60"
                    />
                    <Image
                        src="/icons/heart-icon.svg"
                        alt="Heart Icon"
                        width={30}
                        height={30}
                        className="absolute bottom-20 right-50"

                    />
                    <Image
                        src="/icons/fox-icon.svg"
                        alt="Fox Icon"
                        width={170}
                        height={170}
                        className="absolute bottom-0 right-0"
                    />
                </div>

            </div>
        </div >
    );
}
