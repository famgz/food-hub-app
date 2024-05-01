import { ArrowDownIcon } from "lucide-react";

interface DiscountBadgeProps {
  discountPercentage: number;
  iconSize: number;
}

export default function DiscountBadge({
  discountPercentage,
  iconSize,
}: DiscountBadgeProps) {
  return (
    <div className=" flex items-center justify-center gap-[2px] rounded-full bg-primary px-[8px] py-[2px] text-white">
      <ArrowDownIcon size={iconSize} className="" />
      <span className="text-xs font-semibold">{discountPercentage}%</span>
    </div>
  );
}
