"use client";
import * as React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import { Label } from "./ui/label";


export function CardSelector({ value, onChange, color = "yellow", options = [], className = "" }: {
    value?: string,
    onChange?: (val: string) => void,
    color?: string,
    options?: any[],
    className?: string
}) {
    const [selected, setSelected] = React.useState(value ?? "");

    const handleChange = (val: string) => {
        setSelected(val);
        onChange?.(val);
    };

    return (
        <RadioGroup
            className={`${className}`}
            value={selected}
            onValueChange={handleChange}
        >
            {options.map((opt) => (
                <Label key={opt.value} className="relative w-48 h-24 rounded-[24px] shadow-lg bg-background cursor-pointer flex flex-col items-center justify-center transition-all">

                    <RadioGroupItem
                        value={opt.value}
                        className="absolute top-0 left-0 opacity-0 pointer-events-none"
                    />
                    <span className="text-2xl" aria-hidden="true">{opt.emoji}</span>
                    <span className="mt-4 text-md font-semibold">{opt.label}</span>
                    {selected === opt.value && (
                        <span className="absolute -top-4 -right-4 p-2  opacity-100">
                            {color === "yellow" ? (
                                <Image src="/icons/check-icon-yellow.svg"
                                    alt="Selected"
                                    width={24} height={24} />
                            ) : (
                                <Image src="/icons/check-icon-dark-red.svg"
                                    alt="Selected"
                                    width={24} height={24} />
                            )}
                        </span>
                    )}
                </Label>
            ))
            }
        </RadioGroup >
    );
}
