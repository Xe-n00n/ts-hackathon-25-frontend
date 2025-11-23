import React from "react";

interface StepperProps {
    steps: number;
    colors: string[];
    activeStep?: number;
}

export function Stepper({ steps = 0, colors = [], activeStep = 0 }: StepperProps) {
    return (
        <div className="relative w-full flex items-center py-8">
            {Array.from({ length: steps }).map((_, i) => (
                <React.Fragment key={i}>
                    {/* Step circle */}
                    <div
                        className={`z-10 flex items-center justify-center h-8 w-8 rounded-full text-white text-base font-bold ${i === activeStep ? 'ring-4 ring-purple-300 ring-opacity-50' : ''
                            }`}
                        style={{
                            background: colors[i] || "var(--gray)",
                        }}
                    >
                        {i + 1}
                    </div>
                    {/* Connector line: skip after the last step */}
                    {i < steps - 1 && (
                        <div
                            className="flex-1 h-[2px]"
                            style={{
                                background: colors[i] || "var(--gray)",
                            }}
                        />
                    )}
                </React.Fragment>
            ))}
        </div>
    );
}
