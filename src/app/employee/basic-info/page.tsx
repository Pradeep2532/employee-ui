"use client";
import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { BasicInfoSchema } from "@/lib/schemas/basicinfo";
import { BasicInfoForm } from "@/types/basicinfo";
import { saveDraft, loadDraft } from "@/services/draftService";
import { getNextStep } from "@/utils/wizard";
import { completeStep } from "@/lib/steps";

export default function BasicInfoPage() {
  const router = useRouter();

  const [form, setForm] = useState<BasicInfoForm>({
    employeeCode: "",
    firstName: "",
    lastName: "",
    email: "",
    dob: "",
    gender: "",
    bloodGroup: "",
    nationality: "",
    religion: "",
    maritalStatus: "",
  });

  // Load draft when page mounts
  useEffect(() => {
    const saved = loadDraft("basic-info");
    if (saved) setForm(saved);
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);
    saveDraft("basic-info", updated); // Auto-save draft
  };

  const handleSave = () => {
    const result = BasicInfoSchema.safeParse(form);

    if (!result.success) {
      const firstError = result.error.issues[0].message;
      toast.error(firstError);
      return;
    }

    toast.success("Basic Info saved successfully!");

    saveDraft("basic-info", form); // Final draft save

    completeStep("basic-info");

    const next = getNextStep("basic-info");
    if (next) router.push(`/employee/${next}`);
  };
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-6">

      {/* TITLE */}
      <div>
        <h2 className="text-base font-semibold text-gray-800">Basic Info</h2>
        <div className="border-b border-gray-200 mt-2"></div>
      </div>

      {/* FORM GRID */}
      <div className="grid grid-cols-2  gap-4 text-sm">

        <div className="space-y-1 col-span-2 ">
          <label className="font-medium">Employee Code <span className="text-red-500">*</span></label>
          <input
            name="employeeCode"
            value={form.employeeCode}
            onChange={handleChange}
            className="w-full bg-blue-50 border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
          />
        </div>

        <div className="space-y-1">
          <label className="font-medium">First Name <span className="text-red-500">*</span></label>
          <input
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            className="w-full bg-blue-50 border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
          />
        </div>

        <div className="space-y-1">
          <label className="font-medium">Last Name <span className="text-red-500">*</span></label>
          <input
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            className="w-full bg-blue-50 border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
          />
        </div>

        <div className="space-y-1 col-span-2">
          <label className="font-medium">Email Address <span className="text-red-500">*</span></label>
          <input
            name="email"
            value={form.email}
            onChange={handleChange}
            className="w-full bg-blue-50 border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
          />
        </div>

        <div className="space-y-1">
          <label className="font-medium">Date of Birth</label>
          <input
            type="date"
            name="dob"
            value={form.dob}
            onChange={handleChange}
            className="w-full bg-blue-50 border border-gray-300 rounded-md px-3 py-[9px] outline-none focus:border-blue-500"
          />
        </div>

        <div className="space-y-1">
          <label className="font-medium">Gender</label>
          <select
            name="gender"
            value={form.gender}
            onChange={handleChange}
            className="w-full bg-blue-50 border border-gray-300 rounded-md px-3 py-[9px] outline-none focus:border-blue-500"
          >
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
          </select>
        </div>
        <div className="col-span-2 grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <label className="font-medium">Blood Group</label>
            <input
              name="bloodGroup"
              value={form.bloodGroup}
              onChange={handleChange}
              className="w-full bg-blue-50 border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label className="font-medium">Nationality</label>
            <input
              name="nationality"
              value={form.nationality}
              onChange={handleChange}
              className="w-full bg-blue-50 border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label className="font-medium">Religion</label>
            <input
              name="religion"
              value={form.religion}
              onChange={handleChange}
              className="w-full bg-blue-50 border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>
        </div>
        <div className="space-y-1">
          <label className="font-medium">Marital Status</label>
          <select
            name="maritalStatus"
            value={form.maritalStatus}
            onChange={handleChange}
            className="w-full bg-blue-50 border border-gray-300 rounded-md px-3 py-[9px] outline-none focus:border-blue-500"
          >
            <option value="">Select</option>
            <option>Single</option>
            <option>Married</option>
          </select>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-4 flex justify-end">
        <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm">
          Save & Next
        </button>
      </div>
    </div>
  );
}
