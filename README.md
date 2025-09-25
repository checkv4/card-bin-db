# Card BIN Database

[![npm version](https://badge.fury.io/js/card-bin-db.svg)](https://badge.fury.io/js/card-bin-db)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A fast and lightweight Node.js library for querying bank card information based on BIN (Bank Identification Number). Get detailed information about card issuers, brands, types, countries, and more.

## Features

- 🚀 **Fast lookup** - Optimized for high-performance BIN queries
- 💾 **Offline database** - No external API calls required
- 🌍 **Comprehensive data** - Supports multiple data sources (BinCheck and PST)
- 📦 **Lightweight** - Minimal dependencies
- 🔄 **TypeScript support** - Full type definitions included
- 🎯 **Easy to use** - Simple and intuitive API

## Installation

```bash
npm install card-bin-db
```

```bash
yarn add card-bin-db
```

```bash
pnpm add card-bin-db
```

## Quick Start

```javascript
import { lookupBin } from 'card-bin-db';

// Lookup using default engine (bincheck)
const cardInfo = await lookupBin('424242');
console.log(cardInfo);
```

## API Reference

### `lookupBin(bin, engine?)`

Lookup card information by BIN number.

**Parameters:**
- `bin` (string) - The BIN number (first 6 digits of card number)
- `engine` (string, optional) - Data source engine: `'bincheck'` (default) or `'pst'`

**Returns:**
Promise that resolves to card information object or `undefined` if not found.

### BinCheck Engine (default)

Returns detailed card information including:

```typescript
interface BinCheckInfo {
  bin: string;           // BIN number
  card_brand: string;    // Card brand (Visa, Mastercard, etc.)
  card_type: string;     // Card type (Credit, Debit, etc.)
  card_level: string;    // Card level (Standard, Gold, Platinum, etc.)
  bank_name: string;     // Issuing bank name
  bank_website: string;  // Bank website URL
  bank_phone: string;    // Bank phone number
  country_name: string;  // Country name
  country_code: string;  // Country code (US, GB, etc.)
  country_iso3: string;  // ISO3 country code
  currency: string;      // Currency code (USD, EUR, etc.)
}
```

### PST Engine

Returns simplified card information:

```typescript
interface BinPstInfo {
  bin: string;           // BIN number
  country_alpha3: string;// ISO3 country code
  issuer_name: string;   // Issuer name
  card_level: string;    // Card level
  brand: string;         // Card brand
  type: string;          // Card type
}
```

## Usage Examples

### Basic Usage

```javascript
import { lookupBin } from 'card-bin-db';

// Using default bincheck engine
const visa = await lookupBin('424242');
console.log(visa);
// Output:
// {
//   bin: '424242',
//   card_brand: 'Visa',
//   card_type: 'Credit',
//   card_level: 'Standard',
//   bank_name: 'Example Bank',
//   country_name: 'United States',
//   currency: 'USD',
//   ...
// }
```

### Using Different Engines

```javascript
import { lookupBin } from 'card-bin-db';

// Using bincheck engine (more detailed info)
const detailedInfo = await lookupBin('424242', 'bincheck');

// Using pst engine (simpler info)
const simpleInfo = await lookupBin('424242', 'pst');
```

### Complete Card Number Processing

```javascript
import { lookupBin } from 'card-bin-db';

function processCard(cardNumber) {
  // Extract BIN (first 6 digits)
  const bin = cardNumber.substring(0, 6);
  
  return lookupBin(bin);
}

// Example usage
const cardInfo = await processCard('4242424242424242');
if (cardInfo) {
  console.log(`Card Brand: ${cardInfo.card_brand}`);
  console.log(`Issuer: ${cardInfo.bank_name}`);
  console.log(`Country: ${cardInfo.country_name}`);
}
```

### Error Handling

```javascript
import { lookupBin } from 'card-bin-db';

try {
  const cardInfo = await lookupBin('123456');
  
  if (cardInfo) {
    console.log('Card found:', cardInfo);
  } else {
    console.log('Card not found in database');
  }
} catch (error) {
  console.error('Lookup failed:', error);
}
```

### Batch Processing

```javascript
import { lookupBin } from 'card-bin-db';

async function processBatch(bins) {
  const results = await Promise.all(
    bins.map(bin => lookupBin(bin))
  );
  
  return results.filter(Boolean); // Remove null results
}

const bins = ['424242', '555555', '378282'];
const cardInfos = await processBatch(bins);
```

## TypeScript Support

The library includes full TypeScript definitions:

```typescript
import { lookupBin, BinCheckInfo, BinPstInfo, BinInfo } from 'card-bin-db';

const cardInfo: BinInfo | undefined = await lookupBin('424242');

if (cardInfo) {
  // TypeScript knows the structure
  console.log(cardInfo.card_brand);
}
```

## Performance

- **Fast lookups**: Optimized data structures for quick BIN resolution
- **Memory efficient**: Data is loaded on-demand and cached
- **No network calls**: All data is bundled with the package

## Data Sources

- **BinCheck**: Comprehensive database with detailed card information
- **PST**: Alternative data source with essential card details

## Requirements

- Node.js 14.0.0 or higher
- TypeScript 5.0+ (for development)

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

MIT License - see the [LICENSE](LICENSE) file for details.

## Changelog

### 1.0.0
- Initial release
- Support for BinCheck and PST engines
- TypeScript support
- Comprehensive BIN database
