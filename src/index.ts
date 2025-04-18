import { InvoiceProcessor } from './processors/invoice.processor';
import { config } from './config';

async function main() {
  if (process.argv.length < 3) {
    console.log('Usage: npm start <path-to-invoice-file>');
    process.exit(1);
  }

  const filePath = process.argv[2];
  const processor = new InvoiceProcessor();

  try {
    const invoice = await processor.process(filePath);
    console.log('Successfully processed invoice:');
    console.log(JSON.stringify(invoice, null, 2));
  } catch (error) {
    console.error('Error processing invoice:');
    if (error instanceof Error) {
      console.error(error.message);
      if ('details' in error) {
        console.error('Validation errors:', error.details);
      }
    }
    process.exit(1);
  }
}

main();