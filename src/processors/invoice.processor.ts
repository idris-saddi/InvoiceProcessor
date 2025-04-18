  import { extractTextFromPdf } from '../services/extraction/pdf.service';
  import { extractTextFromImage } from '../services/extraction/ocr.service';
  import { extractInvoiceData } from '../services/extraction/groq.service';
  import { validateInvoice } from '../services/validation.service';
  import { getFileType } from '../utils/file-utils';
  import { Invoice } from '../schemas/invoice';
  
  export class InvoiceProcessor {
    async process(filePath: string): Promise<Invoice> {
      // Validate file
      const fileType = getFileType(filePath);
      if (fileType === 'unsupported') {
        throw new Error('Unsupported file type');
      }
  
      // Extract text
      const text = fileType === 'pdf'
        ? await extractTextFromPdf(filePath)
        : await extractTextFromImage(filePath);
  
      if (!text.trim()) {
        throw new Error('No text could be extracted from the file');
      }
  
      // Process with Groq
      const extractedData = await extractInvoiceData(text);
  
      // Validate and return
      return validateInvoice(extractedData);
    }
  }