import { z } from "zod";

export const EmploymentSchema = z.object({
  department: z.string().min(1, "Department is required"),
  designation: z.string().min(1, "Designation is required"),
  employmentType: z.string().min(1, "Employment type is required"),
  joiningDate: z.string().min(1, "Joining date is required"),
  employeeStatus: z.string().min(1, "Employee status is required"),
});
