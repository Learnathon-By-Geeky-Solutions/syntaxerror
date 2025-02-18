import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
  
  interface FilterSelectProps {
    value: string;
    onValueChange: (value: string) => void;
    options: { label: string; value: string }[];
    placeholder: string;
  }
  
  const FilterSelect = ({
    value,
    onValueChange,
    options,
    placeholder,
  }: FilterSelectProps) => {
    return (
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-[130px] md:w-[160px] h-6 bg-white border-gray-200 hover:border-emerald-600/50 focus:ring-emerald-600/20 text-xs">
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          {options.map((option) => (
            <SelectItem
              key={option.value}
              value={option.value}
              className="cursor-pointer text-xs"
            >
              {option.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    );
  };
  
  export default FilterSelect;