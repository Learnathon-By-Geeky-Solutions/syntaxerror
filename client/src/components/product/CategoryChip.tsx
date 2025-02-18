import { cn } from "@/lib/utils";
import Image from "next/image";

interface CategoryChipProps {
  name: string;
  image: string;
  isSelected?: boolean;
  onClick?: () => void;
}

const CategoryChip = ({ name, image, isSelected, onClick }: CategoryChipProps) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "group grid grid-cols-2 lg:grid-cols-5 justify-between items-center w-[40vw] md:w-44 gap-2 px-2 py-2 rounded-lg transition-all duration-300",
        "border hover:border-emerald-600/50 hover:bg-emerald-50",
        "focus:outline-none focus:ring-2 focus:ring-emerald-600/20",
        isSelected
          ? "border-emerald-600 bg-emerald-50"
          : "border-gray-200 bg-white"
      )}
    >
      <div className="relative w-6 h-6 rounded-full overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover"
          sizes="24px"
        />
      </div>
      <span
        className={cn(
          "text-sm font-medium transition-colors duration-300",
          isSelected ? "text-emerald-600" : "text-gray-700"
        )}
      >
        {name}
      </span>
    </button>
  );
};

export default CategoryChip;