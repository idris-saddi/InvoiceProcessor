import * as Tesseract from 'tesseract.js';

export async function extractTextFromImage(imagePath: string): Promise<string> {
  const result = await Tesseract.recognize(imagePath, 'eng');
  return result.data.text;
}
