import { ReactNode } from "react";

interface IconLabelProps {
  icon: ReactNode;
  label: string;
}

export default function IconLabel({ icon, label }: IconLabelProps) {
  return (
    <div className="flex items-center gap-2">
      {icon}
      <span>{label}</span>
    </div>
  );
}
