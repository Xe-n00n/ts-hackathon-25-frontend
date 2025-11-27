import Image from "next/image";
import { baloo2, quicksand } from "@/lib/fonts";
import { Stepper } from "@/components/ui/stepper";
import StoryGenerateButton from "@/components/generate-story-buttons";

type StepConfig = {
    number: number;
    label: string;
    title: string;
    textClass: string;
};

const STEP_CONFIG: StepConfig[] = [
    { number: 1, label: "step 1", title: "Child Info", textClass: "text-green", },
    { number: 2, label: "step 2", title: "Select Values", textClass: "text-orange", },
    { number: 3, label: "step 3", title: "Story Style", textClass: "text-yellow", },
    { number: 4, label: "step 4", title: "Custom Description", textClass: "text-purple", },
    { number: 5, label: "step 5", title: "Output Format", textClass: "text-dark-red" },
];

export default function Generate() {

    return (
        <div className="min-h-screen w-full container mx-auto py-6 flex flex-col items-center justify-between">
            <div className="flex flex-col items-center text-center px-4">
                <h1 className={`text-3xl font-bold text-secondary my-6 leading-tight ${quicksand.className}`}>
                    Create <span className="text-green">a </span>
                    <span className="text-orange">
                        <span className="underline decoration-orange">Mag</span>
                        <span className="underline decoration-yellow">ical</span>
                    </span>{" "}
                    <span className="text-yellow underline decoration-yellow">Story</span>
                    <span className="text-purple"> for</span> <span className="text-[#464540]">Your{" "}</span>
                    <div className="relative inline-block">
                        <span className="text-dark-red">{" "}Child</span>
                        <Image
                            src="/icons/bear-icon.svg"
                            alt="Bear Icon"
                            width={40}
                            height={40}
                            className="hidden md:block absolute -top-6 left-1/2 -translate-x-1/2 w-10 h-auto"
                        />
                    </div>
                </h1>
                <p className={`text-base font-medium ${quicksand.className}`}>
                    Follow the steps below to personalize the perfect adventure.
                </p>
            </div>

            {/* Desktop / Tablet horizontal stepper */}
            <div className="hidden md:block w-4/5 px-4">
                <div className="flex justify-between">
                    <p className={`text-md font-medium ${baloo2.className}`}>
                        <span className="text-green">step 1: </span>Child Info
                    </p>
                    <p className={`text-md font-medium ${baloo2.className}`}>
                        <span className="text-yellow">step 3: </span>Story Style
                    </p>
                    <p className={`text-md font-medium ${baloo2.className}`}>
                        <span className="text-dark-red">step 5: </span>Output Format
                    </p>
                </div>
                <Stepper steps={STEP_CONFIG.length} colors={["var(--gray)"]} />
                <div className="flex justify-around">
                    <p className={`text-md font-medium ${baloo2.className}`}>
                        <span className="text-orange">step 2: </span>Select Values
                    </p>
                    <p className={`text-md font-medium ${baloo2.className}`}>
                        <span className="text-purple">step 4: </span>Custom Description
                    </p>
                </div>
                <div className="mt-16 text-center">
                    <StoryGenerateButton />
                </div>
            </div>

            {/* Mobile vertical stepper */}
            <div className="w-full px-6 md:hidden flex flex-col items-center">
                <MobileStepTimeline steps={STEP_CONFIG} />
                <StoryGenerateButton />
            </div>

            {/* Desktop decorative icons */}
            <div className="hidden md:flex w-full justify-between mt-10">
                <div className="flex">
                    <Image
                        src="/icons/big-bear.svg"
                        alt="Bear Icon"
                        width={170}
                        height={170}
                        className="absolute bottom-0 left-65"
                    />
                    <Image
                        src="/icons/leaves.svg"
                        alt="Leaves Icon"
                        width={30}
                        height={30}
                        className="absolute left-107 bottom-30"
                    />
                </div>
                <div className="flex w-full justify-between px-4">
                    <Image
                        src="/icons/tree-icon.svg"
                        alt="Tree Icon"
                        width={40}
                        height={40}
                        className="self-end absolute right-60 bottom-0"
                    />
                    <Image
                        src="/icons/heart-icon.svg"
                        alt="Heart Icon"
                        width={40}
                        height={40}
                        className="self-end absolute right-50 bottom-30"
                    />
                    <Image
                        src="/icons/fox-icon.svg"
                        alt="Fox Icon"
                        width={160}
                        height={160}
                        className="self-end absolute bottom-0 right-0"
                    />
                </div>
            </div>

            {/* Mobile decorative icons: bear + fox only */}
            <div className="flex md:hidden w-full justify-between items-end px-6 mt-10">
                <Image
                    src="/icons/big-bear.svg"
                    alt="Bear Icon"
                    width={120}
                    height={120}
                    className="h-auto"
                />
                <Image
                    src="/icons/fox-icon.svg"
                    alt="Fox Icon"
                    width={120}
                    height={120}
                    className="h-auto"
                />
            </div>
        </div>
    );
}

function MobileStepTimeline({ steps }: { steps: StepConfig[] }) {
    return (
        <div className="w-full max-w-sm my-8">
            <div className="flex flex-col items-center">
                {steps.map((step, index) => (
                    <div
                        key={step.number}
                        className="grid grid-cols-[1fr_auto_1fr] gap-4 items-start w-full"
                    >
                        <p
                            className={`text-sm font-semibold text-right text-black ${baloo2.className} ${index % 2 === 0 ? "opacity-100" : "opacity-0"
                                }`}
                        >
                            <span className={`${step.textClass} ${baloo2.className} lowercase`}>{step.label}:</span> {step.title}
                        </p>
                        <div className="flex flex-col items-center">
                            <div
                                className="flex h-8 w-8 items-center justify-center rounded-full text-white text-base font-semibold"
                                style={{ background: "var(--gray)" }}
                            >
                                {step.number}
                            </div>
                            {index < steps.length - 1 && (
                                <div className="w-px flex-1 min-h-[32px]" style={{ background: "var(--gray)" }} />
                            )}
                        </div>
                        <p
                            className={`text-sm font-semibold text-left text-black ${baloo2.className} ${index % 2 === 1 ? "opacity-100" : "opacity-0"
                                }`}>
                            <span className={`${step.textClass} ${baloo2.className} lowercase`}>{step.label}:</span> {step.title}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
