"use client";
import { useState } from "react";
import Image from "next/image";
import { baloo2 } from "@/lib/fonts";
import { Stepper } from "@/components/ui/stepper";
import { Label } from "@/components/ui/label";
import { TagInput } from "@/components/tag-input";
import { Textarea } from "@/components/ui/textarea";
import { useStoryGeneration } from "@/lib/StoryGenerationContext";
import FormButtons from "@/components/buttons/form-buttons";

interface ValidationErrors {
    goal?: string;
}

export default function SelectValuesClient() {
    const { storyData, updateStoryValues } = useStoryGeneration();
    const [errors, setErrors] = useState<ValidationErrors>({});

    const validateGoal = (value: string) => {
        if (!value.trim()) {
            setErrors(prev => ({ ...prev, goal: "Story goal is required" }));
        } else {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors.goal;
                return newErrors;
            });
        }
    };

    const handleGoalChange = (value: string) => {
        updateStoryValues({ goal: value });
        validateGoal(value);
    };

    const handleTagsChange = (tags: string[]) => {
        updateStoryValues({ tags });
    };

    const isFormValid = () => storyData.storyValues.goal.trim() !== '';

    return (
        <div className={`h-screen max-h-screen overflow-auto md:overflow-hidden container mx-auto pt-4 pb-2 flex flex-col ${baloo2.className}`}>
            <p className={`flex justify-start w-full text-xl font-bold px-4 ${baloo2.className}`}>
                <span className="text-orange">Step 2: </span>&nbsp;Select Values
            </p>
            <div className="w-4/5 mx-auto mb-2">
                <Stepper steps={5} activeStep={2} colors={["var(--green)", "var(--orange)"]} />
            </div>
            <div className="w-4/5 mx-auto flex-1 space-y-4">
                <div className="flex flex-col">
                    <Label htmlFor="story-goal" className="font-semibold mb-2 text-2xl">
                        What is your goal from the story? {!storyData.storyValues.goal.trim() && <span className="text-red-500">*</span>}
                    </Label>
                    <Textarea
                        className={`h-36 ${errors.goal ? "border-red-500" : ""}`}
                        value={storyData.storyValues.goal}
                        onChange={(e) => handleGoalChange(e.target.value)}
                        placeholder="Describe what you want your child to learn from this story..."
                    />
                    {errors.goal && (
                        <p className="text-red-500 text-sm mt-1">{errors.goal}</p>
                    )}
                </div>
                <div className="flex flex-col">
                    <Label htmlFor="select-values-tags" className="font-semibold mb-2 text-2xl">Tags</Label>
                    <TagInput
                        color="orange"
                        value={storyData.storyValues.tags}
                        onValueChange={handleTagsChange}
                    />
                </div>
            </div>

            <div className="flex flex-col-reverse gap-4 mt-6 md:flex-row justify-between items-center">
                <Image
                    src="/icons/rabbit-icon.svg"
                    alt="Rabbit Icon"
                    width={150}
                    height={150}
                    className="self-center ml-4"
                />
                <FormButtons variant="orange" previousRoute="/generate/child-info" nextRoute="/generate/story-style" isFormValid={isFormValid()} />
            </div>
        </div>
    );
}
