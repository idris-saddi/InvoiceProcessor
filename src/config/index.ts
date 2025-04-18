import dotenv from 'dotenv';

dotenv.config();

export const config = {
  GROQ_API_KEY: process.env.GROQ_API_KEY || '',
  SUPPORTED_FILE_TYPES: ['pdf', 'png', 'jpg', 'jpeg'],
  MAX_FILE_SIZE: 5 * 1024 * 1024, // 5MB
};

if (!config.GROQ_API_KEY) {
  throw new Error('GROQ_API_KEY is required in environment variables');
}