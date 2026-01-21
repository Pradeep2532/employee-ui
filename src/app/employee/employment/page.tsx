"use client";

import { useState, useEffect,ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { EmploymentSchema } from "@/lib/schemas/employment";
import { getNextStep, getPrevStep } from "@/utils/wizard";
import { saveDraft, loadDraft } from "@/services/draftService";

const defaultEmploymentForm = {
  department: "",
  designation: "",
  employmentType: "",
  joiningDate: "",
  employeeStatus: "",
};

export default function EmploymentPage() {
  const router = useRouter();
  const [form, setForm] = useState(defaultEmploymentForm);

  useEffect(() => {
    const saved = loadDraft("employment");
    if (saved) {
      setForm(prev => ({ ...prev, ...saved })); // ← MERGE FIX
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);
    saveDraft("employment", updated);
  };

  const handleNext = () => {
    const result = EmploymentSchema.safeParse(form);
    if (!result.success) {
      toast.error(result.error.issues[0].message);
      return;
    }
    toast.success(" Employment Saved!");
    const next = getNextStep("employment");
    if (next) router.push(`/employee/${next}`);
  };

  const handlePrev = () => {
    const prev = getPrevStep("employment");
    if (prev) router.push(`/employee/${prev}`);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-6">

      {/* TITLE */}
      <div>
        <h2 className="text-base font-semibold text-gray-800">Employment Details</h2>
        <div className="border-b border-gray-200 mt-2"></div>
      </div>

      {/* FORM GRID */}
      <div className="grid grid-cols-2 gap-4 text-sm">

        <div className="space-y-1">
          <label className="font-medium">Department <span className="text-red-500">*</span></label>
          <input
            name="department"
            value={form.department}
            onChange={handleChange}
            className="w-full bg-blue-50 border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
          />
        </div>

        <div className="space-y-1">
          <label className="font-medium">Designation <span className="text-red-500">*</span></label>
          <input
            name="designation"
            value={form.designation}
            onChange={handleChange}
            className="w-full bg-blue-50 border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
          />
        </div>

        <div className="space-y-1">
          <label className="font-medium">Employment Type <span className="text-red-500">*</span></label>
          <select
            name="employmentType"
            value={form.employmentType}
            onChange={handleChange}
            className="w-full bg-blue-50 border border-gray-300 rounded-md px-3 py-[9px] outline-none focus:border-blue-500"
          >
            <option value="">Select</option>
            <option>Full-time</option>
            <option>Part-time</option>
            <option>Intern</option>
          </select>
        </div>

        <div className="space-y-1">
          <label className="font-medium">Joining Date <span className="text-red-500">*</span></label>
          <input
            type="date"
            name="joiningDate"
            value={form.joiningDate}
            onChange={handleChange}
            className="w-full bg-blue-50 border border-gray-300 rounded-md px-3 py-[9px] outline-none focus:border-blue-500"
          />
        </div>

        <div className="space-y-1 col-span-2">
          <label className="font-medium">Employee Status <span className="text-red-500">*</span></label>
          <select
            name="employeeStatus"
            value={form.employeeStatus}
            onChange={handleChange}
            className="w-full bg-blue-50 border border-gray-300 rounded-md px-3 py-[9px] outline-none focus:border-blue-500"
          >
            <option value="">Select</option>
            <option>Active</option>
            <option>Probation</option>
            <option>On Notice</option>
            <option>Resigned</option>
          </select>
        </div>

      </div>

      {/* ACTIONS */}
      <div className="border-t border-gray-200 pt-4 flex justify-between">
        <button
          onClick={handlePrev}
          className="bg-gray-200 text-black px-4 py-2 rounded-md text-sm"
        >
          Previous
        </button>

        <button
          onClick={handleNext}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm"
        >
          Save & Next
        </button>
      </div>
    </div>
  );
}
