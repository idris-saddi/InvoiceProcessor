# Invoice Processor

![Invoice Processing Pipeline](https://example.com/invoice-pipeline.png) <!-- Replace with an actual diagram -->

A powerful Node.js application designed to extract structured data from invoices in PDF and image formats using advanced AI and OCR technologies.

## ✨ Features

- **Multi-format Support**  
    Seamlessly process PDFs, PNGs, and JPGs through a unified interface.
- **AI-Powered Extraction**  
    Utilizes Groq's ultra-fast LLM for precise data extraction.
- **Robust Validation**  
    Implements comprehensive Zod schemas with business logic validation.
- **Type-Safe Codebase**  
    Built entirely in TypeScript with strict typing for reliability.
- **Detailed Error Reporting**  
    Provides clear validation errors and processing feedback.

## 🚀 Quick Start

### Prerequisites
- Node.js v18+
- Groq API key

### Installation
```bash
git clone https://github.com/yourusername/invoice-processor.git
cd invoice-processor
npm install
cp .env.example .env
```
### Configuration
Edit the `.env` file:

```ini
GROQ_API_KEY=your_groq_api_key_here
```

### 💻 Usage

#### Process a Single Invoice
```bash
npm start ./samples/invoice.pdf
# Outputs validated JSON to stdout
```

#### Process a Batch of Invoices
```bash
npm run batch ./invoices/ ./output/
# Processes all supported files in the input directory
```

### Available Commands

| Command                       | Description                     |
|-------------------------------|---------------------------------|
| `npm start <file>`            | Process a single file           |
| `npm run batch <input> <output>` | Process all files in a directory |
| `npm test`                    | Run the test suite              |
| `npm run lint`                | Run the code linter             |

## 📊 Schema Definition

The invoice schema validates the following structure:

```typescript
{
    invoiceNumber: string;
    invoiceDate: Date;
    vendor: {
        name: string;
        fiscalNumber?: string;
    };
    // Full schema available in src/schemas/invoice.ts
}
```

### Key Validations

- **Monetary Value Precision**: Ensures a 0.01 tolerance.
- **Date Formats**: Validates `YYYY-MM-DD` format.
- **Cross-field Calculations**: Verifies consistency (e.g., HT vs TTC).
- **Required vs Optional Fields**: Differentiates mandatory and optional fields.

## 🛠️ Development

### Project Structure

```plaintext
src/
├── config/       # Application configuration
├── processors/   # Core processing logic
├── schemas/      # Zod validation schemas
├── services/     # External service integrations
├── types/        # Type definitions
└── utils/        # Helper functions
```

### Testing

```bash
npm test          # Run all tests
npm run test:cov  # Run tests with coverage
```

Test samples are available in the `samples/` directory.

## 🤝 Contributing

1. Fork the repository.
2. Create a feature branch.
3. Submit a pull request.

## 📄 License

MIT © 2023 PFA IS