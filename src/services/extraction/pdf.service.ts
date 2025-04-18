import pdf from 'pdf-parse';
import fs from 'fs/promises';
import Tesseract from 'tesseract.js';

export async function extractTextFromPdf(pdfPath: string, useOcr: boolean = false): Promise<string> {
  try {
    const dataBuffer = await fs.readFile(pdfPath);

    if (!useOcr) {
      const { text } = await pdf(dataBuffer);
      return text;
    } else {
      const { createWorker } = Tesseract;
      const worker = await createWorker();

      await worker.load();

      const { data: { text } } = await worker.recognize(pdfPath);
      await worker.terminate();

      return text;
    }
  } catch (error) {
    throw new Error(`PDF extraction failed: ${error instanceof Error ? error.message : String(error)}`);
  }
}