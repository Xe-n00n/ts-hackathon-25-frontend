export function Stepper({ steps }: {
    steps: number;
}) {
    return (
        <div className="relative w-full flex items-center justify-between py-6 mx-auto">

            {/* Background Line */}
            <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-[#464540] translate-y-[-50%]" />

            {/* Steps */}
            {Array.from({ length: steps }).map((_, i) => {
                const step = i + 1;
                return (
                    <div
                        key={step}
                        className="
              relative z-10 flex items-center justify-center
              h-10 w-10 rounded-full
              bg-[#464540] text-white text-base
            "
                    >
                        {step}
                    </div>
                );
            })}
        </div>
    );
}
