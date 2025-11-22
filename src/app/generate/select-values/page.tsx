import { Stepper } from "@/components/ui/stepper";
import { baloo2 } from "@/lib/fonts";


export default function SelectValues() {

    return (
        <div className={`h-screen max-h-screen overflow-hidden container mx-auto pt-4 pb-2 flex flex-col ${baloo2.className}`}>
            <p className={`flex justify-start w-full text-xl font-bold px-4 ${baloo2.className}`}>
                <span className="text-light-orange">Step 2: </span>&nbsp;Select Values
            </p>
            <div className="w-4/5 mx-auto mb-2">
                <Stepper steps={5} activeStep={1} colors={["var(--green)", "var(--light-orange)"]} />
            </div>

        </div>
    );
}
