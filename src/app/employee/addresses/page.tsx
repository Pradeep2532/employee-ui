"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { AddressSchema } from "@/lib/schemas/address";
import { getPrevStep, getNextStep } from "@/utils/wizard";
import { saveDraft, loadDraft } from "@/services/draftService";


const defaultAddress = {
  currentAddress: "",
  currentCountry: "",
  currentState: "",
  currentCity: "",
  currentZip: "",
  permanentAddress: "",
  permanentCountry: "",
  permanentState: "",
  permanentCity: "",
  permanentZip: "",
  sameAsCurrent: false,
};


export default function AddressesPage() {
  const router = useRouter();

  const [form, setForm] = useState(defaultAddress);
  useEffect(() => {
    const saved = loadDraft("address");
    if (saved) {
      setForm(prev => ({ ...prev, ...saved }));
    }
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);
    saveDraft("address", updated); // Auto-save draft
  };

  const handleCheckbox = () => {
    const newValue = !form.sameAsCurrent;

    const updated = {
      ...form,
      sameAsCurrent: newValue,
      ...(newValue && {
        permanentAddress: form.currentAddress,
        permanentCountry: form.currentCountry,
        permanentState: form.currentState,
        permanentCity: form.currentCity,
        permanentZip: form.currentZip,
      }),
    };

    setForm(updated);
    saveDraft("address", updated);
  };


  const handleNext = () => {
    const result = AddressSchema.safeParse(form);

    if (!result.success) {
      const firstError = result.error.issues[0].message;
      toast.error(firstError);
      return;
    }

    toast.success("Addresses info saved!");
    const next = getNextStep("addresses");
    if (next) router.push(`/employee/${next}`);
  };

  const handlePrev = () => {
    const prev = getPrevStep("addresses");
    if (prev) router.push(`/employee/${prev}`);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-6">

      {/* TITLE */}
      <div>
        <h2 className="text-base font-semibold text-gray-800">Addresses</h2>
        <div className="border-b border-gray-200 mt-2"></div>
      </div>

      {/* CURRENT ADDRESS SECTION */}
      <div className="space-y-4">

        <h3 className="font-medium text-gray-800">Current Address</h3>

        <textarea
          name="currentAddress"
          value={form.currentAddress}
          onChange={handleChange}
          rows={2}
          className="w-full bg-blue-50 border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500 text-sm"
        />

        <div className="grid grid-cols-2 gap-4 text-sm">

          <div className="space-y-1">
            <label className="font-medium">City <span className="text-red-500">*</span></label>
            <input
              name="currentCity"
              value={form.currentCity}
              onChange={handleChange}
              className="w-full bg-blue-50 border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label className="font-medium">Zip/Postal Code <span className="text-red-500">*</span></label>
            <input
              name="currentZip"
              value={form.currentZip}
              onChange={handleChange}
              className="w-full bg-blue-50 border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>
          <div className="space-y-1">
            <label className="font-medium">State <span className="text-red-500">*</span></label>
            <input
              name="currentState"
              value={form.currentState}
              onChange={handleChange}
              className="w-full bg-blue-50 border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>
          <div className="space-y-1">
            <label className="font-medium">Country <span className="text-red-500">*</span></label>
            <input
              name="currentCountry"
              value={form.currentCountry}
              onChange={handleChange}
              className="w-full bg-blue-50 border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* SAME AS CURRENT CHECKBOX */}
      <div className="flex items-center gap-2">
        <input type="checkbox" checked={form.sameAsCurrent} onChange={handleCheckbox} />
        <label className="text-sm text-gray-700">Permanent address same as current</label>
      </div>

      {/* PERMANENT ADDRESS SECTION */}
      <div className="space-y-4">
        <h3 className="font-medium text-gray-800">Permanent Address</h3>

        <textarea
          name="permanentAddress"
          value={form.permanentAddress}
          onChange={handleChange}
          rows={2}
          className="w-full bg-blue-50 border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500 text-sm"
        />

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <label className="font-medium">City</label>
            <input
              name="permanentCity"
              value={form.permanentCity}
              onChange={handleChange}
              className="w-full bg-blue-50 border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>

          <div className="space-y-1">
            <label className="font-medium">Zip/Postal Code</label>
            <input
              name="permanentZip"
              value={form.permanentZip}
              onChange={handleChange}
              className="w-full bg-blue-50 border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>
          <div className="space-y-1">
            <label className="font-medium">State</label>
            <input
              name="permanentState"
              value={form.permanentState}
              onChange={handleChange}
              className="w-full bg-blue-50 border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>
          <div className="space-y-1">
            <label className="font-medium">Country</label>
            <input
              name="permanentCountry"
              value={form.permanentCountry}
              onChange={handleChange}
              className="w-full bg-blue-50 border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {/* ACTION BUTTONS */}
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
