import { z } from "zod";

export const ContactsSchema = z.object({
  personalPhone: z.string().min(1, "Personal phone is required"),
  workPhone: z.string().optional(),
  personalEmail: z.string().email("Invalid personal email"),
  workEmail: z.string().email("Invalid work email").optional(),
  emergencyName: z.string().min(1, "Emergency contact name is required"),
  emergencyPhone: z.string().min(1, "Emergency contact phone is required"),
  emergencyRelation: z.string().min(1, "Relation is required"),
});
