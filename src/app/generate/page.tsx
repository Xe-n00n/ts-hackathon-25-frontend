import { Button } from "@/components/ui/button";
import { Stepper } from "@/components/ui/stepper";
import { baloo2, quicksand } from "@/lib/fonts";

export default function Generate() {
    return (
        <div className="container h-full mx-auto px-4 py-8 flex flex-col items-center justify-between">
            <div className="flex flex-col items-center">

                <h1 className={`text-4xl font-bold text-secondary my-6 ${quicksand.className}`}>
                    Create <span className="text-green">a </span>
                    <span className="text-orange"><span className="underline decoration-orange">Mag</span><span className="underline decoration-yellow">ical</span></span> <span className="text-yellow underline decoration-yellow">Story</span>
                    <span className="text-purple"> for</span> <span className="text-[#464540]">Your</span>
                    <span className="text-dark-red"> Child</span>
                </h1>
                <h2 className={`text-xl font-medium ${quicksand.className}`}>Follow the steps below to personalize the perfect adventure.</h2>
            </div>

            <div className="w-4/5 px-4">
                <div className="flex justify-between">
                    <p className={`text-lg font-medium ${baloo2.className}`}><span className="text-green">step 1: </span>Child Info</p>
                    <p className={`text-lg font-medium ${baloo2.className}`}><span className="text-yellow">step 3: </span>Story Style</p>
                    <p className={`text-lg font-medium ${baloo2.className}`}><span className="text-dark-red">step 5: </span>Output Format</p>
                </div>
                <Stepper steps={5} />
                <div className="flex justify-around">
                    <p className={`text-lg font-medium ${baloo2.className}`}><span className="text-orange">step 2: </span>Select Values</p>
                    <p className={`text-lg font-medium ${baloo2.className}`}><span className="text-purple">step 4: </span>Custom Description</p>


                </div>
                <div className="mt-16 text-center">
                    <Button>Begin Story Creation</Button>
                </div>
            </div>

            <div className="w-full">
            </div>
        </div >
    );
}
