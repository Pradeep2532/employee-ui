import Tabs from "@/components/Tab";

export default function EmployeeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex justify-center mt-4 w-full">
      <div className="w-[1100px] bg-white border border-gray-200 rounded-lg shadow-sm">

        {/* TAB BAR */}
        <Tabs />

        {/* CONTENT */}
        <div className="p-6">
          {children}
        </div>

      </div>
    </div>
  );
}
