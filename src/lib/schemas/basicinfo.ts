import { z } from "zod";

export const BasicInfoSchema = z.object({
  employeeCode: z.string().min(1, "Employee Code is required"),
  firstName: z.string().min(1, "First Name is required"),
  lastName: z.string().min(1, "Last Name is required"),
  email: z.string().email("Invalid email format"),
  dob: z.string().optional(),
  gender: z.string().optional(),
  bloodGroup: z.string().optional(),
  nationality: z.string().optional(),
  religion: z.string().optional(),
  maritalStatus: z.string().optional(),
});

export type BasicInfoDTO = z.infer<typeof BasicInfoSchema>;
