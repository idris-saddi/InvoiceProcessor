import { z } from "zod";

// Helper for date validation (can be reused)
const dateSchema = z.union([
  z.string().regex(/^\d{4}-\d{2}-\d{2}$/, "Must be YYYY-MM-DD format"),
  z.date()
]).transform(val => val instanceof Date ? val : new Date(val));

export const InvoiceSchema = z.object({
  invoiceNumber: z.string().min(1, "Invoice number is required"),
  invoiceDate: dateSchema.refine(
    date => !isNaN(date.getTime()), 
    { message: "Invalid date" }
  ),
  vendor: z.object({
    name: z.string().min(1, "Vendor name is required"),
    fiscalnumber: z.string().optional(),
  }),
  customer: z.object({
    name: z.string().min(1, "Customer name is required"),
    fiscalnumber: z.string().optional(),
  }),
  items: z.array(
    z.object({
      description: z.string().min(1, "Item description is required"),
      quantity: z.number().positive("Quantity must be positive").default(1),
      unitPrice: z.number().positive("Unit price must be positive").optional(),
      totalHT: z.number().positive().optional(),
      totalTTC: z.number().positive().optional(),
      taxRate: z.number().min(0).max(1).optional() // 0-1 range for percentage
    }).refine(
      (item) => { 
        if(item.totalHT && item.unitPrice) {
          return Math.abs(item.totalHT - (item.quantity * item.unitPrice)) < 0.01
        } 
        return true
      },
      "Item totalHT should equal quantity × unitPrice"
    )
  ).min(1, "At least one item is required"),
  TotalHT: z.number().positive(),
  tax: z.number().min(0).optional(),
  invoiceStamp: z.string().optional(),
  totalTTC: z.number().positive(),
  notes: z.string().optional() // Optional field for additional information
}).refine(
  invoice => Math.abs(invoice.totalTTC - (invoice.TotalHT + (invoice.tax || 0))) < 0.01,
  "Total TTC should equal Total HT + tax"
).refine(
  invoice => Math.abs(invoice.TotalHT - invoice.items.reduce((sum, item) => sum + (item.totalHT ?? 0), 0)) < 0.01,
  "Total HT should equal sum of items' totalHT"
);

export type Invoice = z.infer<typeof InvoiceSchema>;