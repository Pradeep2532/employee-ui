"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ContactsSchema } from "@/lib/schemas/contacts";
import { getNextStep, getPrevStep } from "@/utils/wizard";
import { saveDraft, loadDraft } from "@/services/draftService";

const defaultContact = {
   personalPhone: "",
    workPhone: "",
    personalEmail: "",
    workEmail: "",
    emergencyName: "",
    emergencyPhone: "",
    emergencyRelation: "",
}



export default function ContactsPage() {
  const router = useRouter();

  const [form, setForm] = useState(defaultContact);

   useEffect(() => {
    const saved = loadDraft("contact");
    if (saved) {
      setForm(prev => ({ ...prev, ...saved }));
    }
  }, []);
      const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement>) => {
        const updated = { ...form, [e.target.name]: e.target.value };
        setForm(updated);
        saveDraft("contacts", updated); // Auto-save draft
      };

  const handleNext = () => {
    const result = ContactsSchema.safeParse(form);

    if (!result.success) {
      const firstError = result.error.issues[0].message;
      toast.error(firstError);
      return;
    }

    toast.success("Contacts saved successfully!");
    const next = getNextStep("contacts");
    if (next) router.push(`/employee/${next}`);
  };

  const handlePrev = () => {
    const prev = getPrevStep("contacts");
    if (prev) router.push(`/employee/${prev}`);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-6">

      {/* TITLE */}
      <div>
        <h2 className="text-base font-semibold text-gray-800">Contacts</h2>
        <div className="border-b border-gray-200 mt-2"></div>
      </div>

      {/* FORM GRID */}
      <div className="grid grid-cols-2 gap-4 text-sm">

        <div className="space-y-1">
          <label className="font-medium">Personal Phone <span className="text-red-500">*</span></label>
          <input
            name="personalPhone"
            value={form.personalPhone}
            onChange={handleChange}
            className="w-full bg-blue-50 border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
          />
        </div>

        <div className="space-y-1">
          <label className="font-medium">Work Phone</label>
          <input
            name="workPhone"
            value={form.workPhone}
            onChange={handleChange}
            className="w-full bg-blue-50 border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
          />
        </div>

        <div className="space-y-1">
          <label className="font-medium">Personal Email <span className="text-red-500">*</span></label>
          <input
            name="personalEmail"
            value={form.personalEmail}
            onChange={handleChange}
            className="w-full bg-blue-50 border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
          />
        </div>

        <div className="space-y-1">
          <label className="font-medium">Work Email</label>
          <input
            name="workEmail"
            value={form.workEmail}
            onChange={handleChange}
            className="w-full bg-blue-50 border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
          />
        </div>

        <div className="space-y-1 col-span-2">
          <label className="font-medium">Emergency Contact Name <span className="text-red-500">*</span></label>
          <input
            name="emergencyName"
            value={form.emergencyName}
            onChange={handleChange}
            className="w-full bg-blue-50 border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
          />
        </div>

        <div className="space-y-1">
          <label className="font-medium">Emergency Contact Phone <span className="text-red-500">*</span></label>
          <input
            name="emergencyPhone"
            value={form.emergencyPhone}
            onChange={handleChange}
            className="w-full bg-blue-50 border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
          />
        </div>

        <div className="space-y-1">
          <label className="font-medium">Relation <span className="text-red-500">*</span></label>
          <input
            name="emergencyRelation"
            value={form.emergencyRelation}
            onChange={handleChange}
            className="w-full bg-blue-50 border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
          />
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
