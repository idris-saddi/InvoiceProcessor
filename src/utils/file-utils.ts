import path from 'path';
import fs from 'fs';
import { config } from '../config';

export function getFileType(filename: string): 'pdf' | 'image' | 'unsupported' {
  const ext = path.extname(filename).toLowerCase().slice(1);
  if (ext === 'pdf') return 'pdf';
  if (config.SUPPORTED_FILE_TYPES.includes(ext)) return 'image';
  return 'unsupported';
}

export async function validateFile(filePath: string): Promise<void> {
  const stats = await fs.promises.stat(filePath);
  if (stats.size > config.MAX_FILE_SIZE) {
    throw new Error(`File exceeds maximum size of ${config.MAX_FILE_SIZE / 1024 / 1024}MB`);
  }
}