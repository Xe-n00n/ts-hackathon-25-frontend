import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select"

interface GenderSelectProps {
    value?: string;
    onValueChange?: (value: string) => void;
    className?: string;
}

export function GenderSelect({ value, onValueChange, className }: GenderSelectProps) {
    return (
        <Select value={value} onValueChange={onValueChange}>
            <SelectTrigger className={`
   h-9 w-full
    rounded-[15px]
    border-[1.5px] border-gray
    bg-transparent
    px-4 pr-10
    text-base
    relative
    opacity-100
    focus:border-gray
    focus:opacity-100
    [&_svg]:opacity-100
    [&_svg]:text-green
        ${className}
      `}>
                <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="boy">Boy</SelectItem>
                <SelectItem value="girl">Girl</SelectItem>
            </SelectContent>
        </Select>
    )
}
