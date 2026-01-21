"use client";

import { useState, useEffect, ChangeEvent } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { BankAccountSchema } from "@/lib/schemas/bank";
import { getPrevStep, getNextStep } from "@/utils/wizard";
import { saveDraft, loadDraft } from "@/services/draftService";

const defaultBank = {
  bankName: "",
  accountHolder: "",
  accountNumber: "",
  ifsc: "",
  branchName: "",
}

export default function BankAccountsPage() {
  const router = useRouter();

  const [form, setForm] = useState(defaultBank);
  useEffect(() => {
    const saved = loadDraft("bank-accounts");
    if (saved) {
      setForm(prev => ({ ...prev, ...saved }));
    }
  }, []);
  const handleChange = (e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLSelectElement> | ChangeEvent<HTMLTextAreaElement>) => {
    const updated = { ...form, [e.target.name]: e.target.value };
    setForm(updated);
    saveDraft("bank-accounts", updated); // Auto-save draft
  };

  const handleNext = () => {
    const result = BankAccountSchema.safeParse(form);

    if (!result.success) {
      const firstError = result.error.issues[0].message;
      toast.error(firstError);
      return;
    }

    toast.success("Bank account info saved!");
    const next = getNextStep("bank-accounts");
    if (next) router.push(`/employee/${next}`);
  };

  const handlePrev = () => {
    const prev = getPrevStep("bank-accounts");
    if (prev) router.push(`/employee/${prev}`);
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 space-y-6">

      {/* TITLE */}
      <div>
        <h2 className="text-base font-semibold text-gray-800">Bank Account Details</h2>
        <div className="border-b border-gray-200 mt-2"></div>
      </div>

      {/* FORM GRID */}
      <div className="grid grid-cols-2 gap-4 text-sm">

        <div className="space-y-1">
          <label className="font-medium">Bank Name <span className="text-red-500">*</span></label>
          <input
            name="bankName"
            value={form.bankName}
            onChange={handleChange}
            className="w-full bg-blue-50 border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
          />
        </div>

        <div className="space-y-1">
          <label className="font-medium">Account Holder Name <span className="text-red-500">*</span></label>
          <input
            name="accountHolder"
            value={form.accountHolder}
            onChange={handleChange}
            className="w-full bg-blue-50 border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
          />
        </div>

        <div className="space-y-1">
          <label className="font-medium">Account Number <span className="text-red-500">*</span></label>
          <input
            name="accountNumber"
            value={form.accountNumber}
            onChange={handleChange}
            className="w-full bg-blue-50 border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
          />
        </div>

        <div className="space-y-1">
          <label className="font-medium">IFSC / SWIFT Code <span className="text-red-500">*</span></label>
          <input
            name="ifsc"
            value={form.ifsc}
            onChange={handleChange}
            className="w-full bg-blue-50 border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
          />
        </div>

        <div className="space-y-1 col-span-2">
          <label className="font-medium">Branch Name</label>
          <input
            name="branchName"
            value={form.branchName}
            onChange={handleChange}
            className="w-full bg-blue-50 border border-gray-300 rounded-md px-3 py-2 outline-none focus:border-blue-500"
          />
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
          Finish
        </button>
      </div>
    </div>
  );
}
