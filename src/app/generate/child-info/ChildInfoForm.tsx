"use client";
import { useState } from "react";
import Image from "next/image";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Stepper } from "@/components/ui/stepper";
import { baloo2 } from "@/lib/fonts";
import { GenderSelect } from "@/components/gender-select";
import ChildInfoButtons from "@/components/child-info-buttons";
import { useStoryGeneration } from "@/lib/StoryGenerationContext";

interface ValidationErrors {
    name?: string;
    age?: string;
    gender?: string;
}

export default function ChildInfoForm() {
    const { storyData, updateChildInfo, isLoading, error } = useStoryGeneration();
    const [errors, setErrors] = useState<ValidationErrors>({});

    const validateField = (field: string, value: string) => {
        if (field === "name" && !value.trim()) {
            setErrors(prev => ({ ...prev, name: "Name is required" }));
        } else if (field === "age") {
            if (!value.trim()) {
                setErrors(prev => ({ ...prev, age: "Age is required" }));
            } else if (!/^\d+$/.test(value.trim())) {
                setErrors(prev => ({ ...prev, age: "Age must be a number" }));
            } else {
                setErrors(prev => {
                    const newErrors = { ...prev };
                    delete newErrors.age;
                    return newErrors;
                });
            }
        } else if (field === "gender" && !value.trim()) {
            setErrors(prev => ({ ...prev, gender: "Gender is required" }));
        } else {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field as keyof ValidationErrors];
                return newErrors;
            });
        }
    };

    const handleInputChange = (field: string, value: string) => {
        updateChildInfo({ [field]: value });
        if (["name", "age", "gender"].includes(field)) {
            validateField(field, value);
        }
    };

    const handleGenderChange = (value: string) => {
        updateChildInfo({ gender: value });
        validateField("gender", value);
    };

    const isFormValid = () => {
        const nameValid = storyData.childInfo.name.trim() !== "";
        const ageValid = storyData.childInfo.age.trim() !== "" && /^\d+$/.test(storyData.childInfo.age.trim());
        const genderValid = storyData.childInfo.gender.trim() !== "";
        return nameValid && ageValid && genderValid;
    };

    if (error) {
        return (
            <div className="p-8">
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
                    <strong>Error:</strong> {error}
                </div>
            </div>
        );
    }

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
                            Name of your child {!storyData.childInfo.name.trim() && <span className="text-red-500">*</span>}
                        </Label>
                        <Input
                            type="text"
                            value={storyData.childInfo.name || ""}
                            onChange={(e) => handleInputChange("name", e.target.value)}
                            className={errors.name ? "border-red-500" : ""}
                            disabled={isLoading}
                        />
                        {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <Label htmlFor="favourite-pet" className="font-semibold mb-1">Favourite Pet</Label>
                        <Input
                            type="text"
                            value={storyData.childInfo.favouritePet || ""}
                            onChange={(e) => handleInputChange("favouritePet", e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                    <div className="flex flex-col">
                        <Label htmlFor="child-age" className="font-semibold mb-1">
                            Age of your Child {!storyData.childInfo.age.trim() && <span className="text-red-500">*</span>}
                        </Label>
                        <Input
                            type="text"
                            value={storyData.childInfo.age || ""}
                            onChange={(e) => handleInputChange("age", e.target.value)}
                            className={errors.age ? "border-red-500" : ""}
                            disabled={isLoading}
                        />
                        {errors.age && (
                            <p className="text-red-500 text-sm mt-1">{errors.age}</p>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <Label htmlFor="friends-name" className="font-semibold mb-1">Name of friends</Label>
                        <Input
                            type="text"
                            value={storyData.childInfo.friendsName || ""}
                            onChange={(e) => handleInputChange("friendsName", e.target.value)}
                            disabled={isLoading}
                        />
                        <Label htmlFor="gender" className="font-medium mt-2 text-green text-xs">
                            (must be in this format "Lena, Dania, sarah")
                        </Label>
                    </div>
                    <div className="flex flex-col">
                        <Label htmlFor="gender" className="font-semibold mb-1">
                            Gender {!storyData.childInfo.gender.trim() && <span className="text-red-500">*</span>}
                        </Label>
                        <GenderSelect
                            value={storyData.childInfo.gender || ""}
                            onValueChange={handleGenderChange}
                            className={errors.gender ? "border-red-500" : undefined}
                        />
                        {errors.gender && (
                            <p className="text-red-500 text-sm mt-1">{errors.gender}</p>
                        )}
                    </div>
                    <div className="flex flex-col">
                        <Label htmlFor="child-picture" className="font-semibold mb-1">Describe your Child</Label>
                        <Input
                            type="text"
                            value={storyData.childInfo.description || ""}
                            onChange={(e) => handleInputChange("description", e.target.value)}
                            disabled={isLoading}
                        />
                    </div>
                </div>
            </div>

            <div className="flex justify-between items-center">
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
