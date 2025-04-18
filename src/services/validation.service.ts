import { InvoiceSchema, type Invoice } from '../schemas/invoice';
import { ZodError } from 'zod';

export function validateInvoice(data: unknown): Invoice {
  try {
    return InvoiceSchema.parse(data);
  } catch (error) {
    if (error instanceof ZodError) {
      const errors = error.errors.map(err => ({
        path: err.path.join('.'),
        message: err.message
      }));
      throw new InvoiceValidationError('Invoice validation failed', errors);
    }
    throw error;
  }
}

export class InvoiceValidationError extends Error {
  constructor(
    message: string,
    public readonly details: Array<{ path: string; message: string }>
  ) {
    super(message);
    this.name = 'InvoiceValidationError';
  }
}