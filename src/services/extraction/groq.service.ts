import { Groq } from "groq-sdk";
import { config } from "../../config";

const groq = new Groq({
  apiKey: config.GROQ_API_KEY,
});

export async function extractInvoiceData(text: string): Promise<unknown> {
  const prompt = `
  Extract invoice information from the following text and return a strictly formatted JSON object matching this structure:

{
  "invoiceNumber": "string (required)",
  "invoiceDate": "string (YYYY-MM-DD format)",
  "vendor": {
    "name": "string (required)",
    "fiscalnumber": "string (optional)"
  },
  "customer": {
    "name": "string (required)",
    "fiscalnumber": "string (optional)"
  },
  "items": [
    {
      "description": "string (required)",
      "quantity": "number (positive, default 1)",
      "unitPrice": "number (positive, optional)",
      "totalHT": "number (positive, optional)",
      "totalTTC": "number (positive, optional)",
      "taxRate": "number (0-1, optional)"
    }
  ],
  "TotalHT": "number (positive)",
  "tax": "number (non-negative, optional)",
  "invoiceStamp": "string (optional)",
  "totalTTC": "number (positive)",
  "notes": "string (optional)"
}

IMPORTANT RULES:
1. All monetary values must be numbers (not strings)
2. Dates must be in YYYY-MM-DD format
3. Calculate missing values where possible:
   - totalHT = quantity × unitPrice (when both exist)
   - totalTTC = totalHT × (1 + taxRate) (when taxRate exists)
   - tax = totalTTC - TotalHT (when TotalHT exists)
4. Maintain 2 decimal precision for all monetary values
5. If any required field is missing, use null and add explanation in notes

Text to process:
${text}

Return ONLY the raw JSON object with no additional commentary or formatting.
  `;

  try {
    const response = await groq.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "mixtral-8x7b-32768",
      response_format: { type: "json_object" },
    });

    return JSON.parse(response.choices[0]?.message?.content || "{}");
  } catch (error) {
    throw new Error(`Groq processing failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}
