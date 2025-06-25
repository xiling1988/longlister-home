interface Option {
  value: string
  label: string
}

export const currencies: Option[] = [
  // List of currencies with their respective flags and codes
  { value: 'AED', label: '🇦🇪 UAE Dirham (AED)' },
  { value: 'USD', label: '🇺🇸 US Dollar (USD)' },
  { value: 'EUR', label: '🇪🇺 Euro (EUR)' },
  { value: 'GBP', label: '🇬🇧 British Pound (GBP)' },
  { value: 'SAR', label: '🇸🇦 Saudi Riyal (SAR)' },
  { value: 'OMR', label: '🇴🇲 Omani Rial (OMR)' },
  { value: 'QAR', label: '🇶🇦 Qatari Riyal (QAR)' },
  { value: 'KWD', label: '🇰🇼 Kuwaiti Dinar (KWD)' },
  { value: 'BHD', label: '🇧🇭 Bahraini Dinar (BHD)' },
  { value: 'JOD', label: '🇯🇴 Jordanian Dinar (JOD)' },
  { value: 'EGP', label: '🇪🇬 Egyptian Pound (EGP)' },
  { value: 'JPY', label: '🇯🇵 Japanese Yen (JPY)' },
  { value: 'CAD', label: '🇨🇦 Canadian Dollar (CAD)' },
  { value: 'CHF', label: '🇨🇭 Swiss Franc (CHF)' },
  { value: 'CNY', label: '🇨🇳 Chinese Yuan (CNY)' },
  { value: 'AUD', label: '🇦🇺 Australian Dollar (AUD)' },
  { value: 'SGD', label: '🇸🇬 Singapore Dollar (SGD)' },
  { value: 'HKD', label: '🇭🇰 Hong Kong Dollar (HKD)' },
  { value: 'NZD', label: '🇳🇿 New Zealand Dollar (NZD)' },
  { value: 'SEK', label: '🇸🇪 Swedish Krona (SEK)' },
  { value: 'NOK', label: '🇳🇴 Norwegian Krone (NOK)' },
  { value: 'DKK', label: '🇩🇰 Danish Krone (DKK)' },
  { value: 'INR', label: '🇮🇳 Indian Rupee (INR)' },
  { value: 'BRL', label: '🇧🇷 Brazilian Real (BRL)' },
  { value: 'MXN', label: '🇲🇽 Mexican Peso (MXN)' },
  { value: 'RUB', label: '🇷🇺 Russian Ruble (RUB)' },
  { value: 'ZAR', label: '🇿🇦 South African Rand (ZAR)' },
  { value: 'KRW', label: '🇰🇷 South Korean Won (KRW)' },
]
