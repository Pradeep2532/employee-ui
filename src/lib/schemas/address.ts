import { z } from "zod";

export const AddressSchema = z.object({
  currentAddress: z.string().min(1, "Current address is required"),
  currentCountry: z.string().min(1, "Country is required"),
  currentState: z.string().min(1, "State is required"),
  currentCity: z.string().min(1, "City is required"),
  currentZip: z.string().min(1, "Zip/Postal code is required"),
  
  permanentAddress: z.string().optional(),
  permanentCountry: z.string().optional(),
  permanentState: z.string().optional(),
  permanentCity: z.string().optional(),
  permanentZip: z.string().optional(),
});
