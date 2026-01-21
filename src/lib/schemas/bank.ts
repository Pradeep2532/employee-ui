import { z } from "zod";

export const BankAccountSchema = z.object({
  bankName: z.string().min(1, "Bank name is required"),
  accountHolder: z.string().min(1, "Account holder name is required"),
  accountNumber: z.string().min(1, "Account number is required"),
  ifsc: z.string().min(1, "IFSC/SWIFT code is required"),
  branchName: z.string().optional(),
});
