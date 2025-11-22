import Image from "next/image";

export function FileDropzone({ }) {
    return (
        <div className="flex flex-col mb-6">
            <div
                className="
          w-full h-32 flex flex-col justify-center items-center
          border-[1.5px] border-gray rounded-[20px]
          bg-transparent
          mx-auto
          text-center
        "
                id="child-picture"
            >
                {/* Icon: Replace with your own cloud/upload SVG */}
                <Image
                    src="/icons/upload-icon.svg"
                    alt="Upload Icon"
                    width={40}
                    height={40}
                />

                <span className="block text-md font-bold mb-2">
                    Drag &amp; drop files or{' '}
                    <span className="underline text-green cursor-pointer">Browse</span>
                </span>
                {/* Implement drag & drop or file input as needed here */}
            </div>
        </div >
    )
}
