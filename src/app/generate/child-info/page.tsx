"use client";
import Image from "next/image";
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input";
import { Stepper } from "@/components/ui/stepper";
import { baloo2 } from "@/lib/fonts";
import { GenderSelect } from "@/components/gender-select";
import { FileDropzone } from "@/components/file-drop";
import ChildInfoButtons from "@/components/child-info-buttons";
import { useStoryGeneration } from "@/lib/StoryGenerationContext";
import { useState } from "react";

interface ValidationErrors {
    name?: string;
    age?: string;
    gender?: string;
}

export default function ChildInfoContent() {
    const { storyData, updateChildInfo } = useStoryGeneration();
    const [errors, setErrors] = useState<ValidationErrors>({});

    const validateField = (field: string, value: string) => {
        if (field === 'name' && !value.trim()) {
            setErrors(prev => ({ ...prev, name: "Name is required" }));
        } else if (field === 'age' && !value.trim()) {
            setErrors(prev => ({ ...prev, age: "Age is required" }));
        } else if (field === 'gender' && !value.trim()) {
            setErrors(prev => ({ ...prev, gender: "Gender is required" }));
        } else {
            // Clear error for this field if it's now valid
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field as keyof ValidationErrors];
                return newErrors;
            });
        }
    };

    const handleInputChange = (field: string, value: string) => {
        console.log('Child Info - Updating field:', field, 'with value:', value);
        console.log('Current story data:', storyData);
        updateChildInfo({ [field]: value });

        // Validate the field if it's a required field
        if (['name', 'age', 'gender'].includes(field)) {
            validateField(field, value);
        }
    };

    const handleGenderChange = (value: string) => {
        console.log('Child Info - Gender changed to:', value);
        updateChildInfo({ gender: value });

        // Validate gender
        validateField('gender', value);
    };

    const isFormValid = () => {
        return storyData.childInfo.name.trim() !== '' &&
            storyData.childInfo.age.trim() !== '' &&
            storyData.childInfo.gender.trim() !== '';
    };

    return (
        <div className={`h-screen max-h-screen overflow-hidden container mx-auto pt-4 pb-2 flex flex-col justify-between ${baloo2.className}`}>
            <div>
                <p className={`flex justify-start w-full text-xl font-bold px-4 ${baloo2.className}`}>
                    <span className="text-green">Step 1: </span>&nbsp;Child Info
                </p>
                <div className="w-4/5 mx-auto mb-2">
                    <Stepper steps={5} activeStep={1} colors={["var(--green)"]} />
                </div>
                <div className="grid grid-cols-2 gap-x-6 gap-y-4 w-4/5 mx-auto mt-16">
                    <div className="flex flex-col">
                        <Label htmlFor="child-name" className="font-semibold mb-1">
                            Name of your child <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            type="text"
                            value={storyData.childInfo.name}
                            onChange={(e) => handleInputChange('name', e.target.value)}
                            className={errors.name ? "border-red-500" : ""}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <Label htmlFor="favourite-pet" className="font-semibold mb-1">Favourite Pet</Label>
                        <Input
                            type="text"
                            value={storyData.childInfo.favouritePet}
                            onChange={(e) => handleInputChange('favouritePet', e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col">
                        <Label htmlFor="child-age" className="font-semibold mb-1">
                            Age of your Child <span className="text-red-500">*</span>
                        </Label>
                        <Input
                            type="text"
                            value={storyData.childInfo.age}
                            onChange={(e) => handleInputChange('age', e.target.value)}
                            className={errors.age ? "border-red-500" : ""}
                        />
                        {errors.age && (
                            <p className="text-red-500 text-sm mt-1">{errors.age}</p>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <Label htmlFor="friends-name" className="font-semibold mb-1">Name of friends</Label>
                        <Input
                            type="text"
                            value={storyData.childInfo.friendsName}
                            onChange={(e) => handleInputChange('friendsName', e.target.value)}
                        />
                        <Label htmlFor="gender" className="font-medium mt-2 text-green text-xs">(must be in this format "Lena, Dania, sarah")</Label>
                    </div>
                    <div className="flex flex-col">
                        <Label htmlFor="gender" className="font-semibold mb-1">
                            Gender <span className="text-red-500">*</span>
                        </Label>
                        <GenderSelect
                            value={storyData.childInfo.gender}
                            onValueChange={handleGenderChange}
                            className={errors.gender ? "border-red-500" : undefined}
                        />
                        {errors.gender && (
                            <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                        )}
                    </div>
                    <div className="flex flex-col ">
                        <Label htmlFor="child-picture" className="font-semibold mb-1">Describe your Child</Label>
                        <Input
                            type="text"
                            value={storyData.childInfo.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                        />
                        {/* <FileDropzone /> */}
                    </div>
                </div>

                <div className="w-4/5 mx-auto mt-4">
                    <p className="text-red-500 text-sm">
                        <span className="text-red-500">*</span> Required fields
                    </p>
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
                <ChildInfoButtons isFormValid={isFormValid()} />
            </div>
        </div>
    );
}
