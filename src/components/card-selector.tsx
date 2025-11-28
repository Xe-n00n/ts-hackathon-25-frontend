"use client";
import Image from "next/image";
import * as React from "react";

type CardOption = {
    value: string;
    label: string;
    emoji: string;
    disabled?: boolean;
    helperText?: string;
};

interface CardSelectorProps {
    value?: string | string[];
    onChange?: (val: string | string[]) => void;
    color?: string;
    options?: CardOption[];
    className?: string;
    multiple?: boolean;
}

export function CardSelector({
    value,
    onChange,
    color = "yellow",
    options = [],
    className = "",
    multiple = false,
}: CardSelectorProps) {
    const isMultiple = multiple || Array.isArray(value);

    const selectedValues = React.useMemo(() => {
        if (isMultiple) {
            return Array.isArray(value) ? value : [];
        }
        return typeof value === "string" ? value : "";
    }, [value, isMultiple]);

    const handleSelection = (optionValue: string) => {
        if (isMultiple) {
            const current = Array.isArray(selectedValues) ? selectedValues : [];
            const exists = current.includes(optionValue);
            const updated = exists
                ? current.filter(v => v !== optionValue)
                : [...current, optionValue];
            onChange?.(updated);
        } else {
            onChange?.(optionValue);
        }
    };

    const isSelected = (optionValue: string): boolean => {
        return isMultiple
            ? Array.isArray(selectedValues) && selectedValues.includes(optionValue)
            : selectedValues === optionValue;
    };

    return (
        <div className={className} role={isMultiple ? "group" : "radiogroup"}>
            {options.map(opt => {
                const optionSelected = isSelected(opt.value);
                const isDisabled = Boolean(opt.disabled);
                return (
                    <button
                        type="button"
                        key={opt.value}
                        onClick={() => {
                            if (!isDisabled) {
                                handleSelection(opt.value);
                            }
                        }}
                        className={`relative w-48 h-24 rounded-[24px] shadow-lg ${isDisabled ? "bg-gray-100 cursor-not-allowed opacity-70" : "bg-background cursor-pointer"} flex flex-col items-center justify-center transition-all focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2`}
                        aria-pressed={optionSelected}
                        aria-label={opt.label}
                        disabled={isDisabled}
                    >
                        <span className="text-2xl" aria-hidden="true">{opt.emoji}</span>
                        <span className="mt-4 text-md font-semibold">{opt.label}</span>
                        {opt.helperText && (
                            <span className="text-xs mt-1 text-gray-500 text-center px-2">
                                {opt.helperText}
                            </span>
                        )}
                        {optionSelected && (
                            <span className="absolute -top-4 -right-4 p-2">
                                {color === "yellow" ? (
                                    <Image
                                        src="/icons/check-icon-yellow.svg"
                                        alt="Selected"
                                        width={24}
                                        height={24}
                                    />
                                ) : (
                                    <Image
                                        src="/icons/check-icon-dark-red.svg"
                                        alt="Selected"
                                        width={24}
                                        height={24}
                                    />
                                )}
                            </span>
                        )}
                    </button>
                );
            })}
        </div>
    );
}
