import { validateInvoice } from '../../../src/services/validation.service';


describe('Invoice Validation', () => {
  test('validates correct invoice', () => {
    const validInvoice = {
      invoiceNumber: "INV-2023-001",
      invoiceDate: "2023-01-15",
      vendor: { name: "Acme Corp" },
      customer: { name: "XYZ Ltd" },
      items: [{
        description: "Web Design",
        quantity: 1,
        unitPrice: 1000,
        totalHT: 1000,
        totalTTC: 1200
      }],
      TotalHT: 1000,
      tax: 200,
      totalTTC: 1200
    };

    expect(() => validateInvoice(validInvoice)).not.toThrow();
  });

  test('rejects missing required fields', () => {
    const invalidInvoice = {
      invoiceDate: "2023-01-15",
      vendor: { name: "Acme Corp" },
      // Missing customer and items
    };

    expect(() => validateInvoice(invalidInvoice)).toThrow();
  });
});