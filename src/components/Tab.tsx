"use client";

import { usePathname } from "next/navigation";
import { User, Briefcase, Phone, MapPin, Banknote } from "lucide-react";

const tabs = [
  { key: "basic-info", label: "Basic Info", icon: <User size={16} /> },
  { key: "employment", label: "Employment", icon: <Briefcase size={16} /> },
  { key: "contacts", label: "Contacts", icon: <Phone size={16} /> },
  { key: "addresses", label: "Addresses", icon: <MapPin size={16} /> },
  { key: "bank-accounts", label: "Bank Accounts", icon: <Banknote size={16} /> },
];

export default function Tabs() {
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-8 px-6 h-14 border-b border-gray-200 select-none">
      {tabs.map((tab) => {
        const isActive = pathname.includes(tab.key);
        return (
          <div
            key={tab.key}
            className={`flex items-center gap-2 text-sm font-medium border-b-2 cursor-default
              ${isActive ? "border-blue-600 text-blue-600" : "border-transparent text-gray-600"}
            `}
          >
            {tab.icon}
            {tab.label}
          </div>
        );
      })}
    </div>
  );
}
