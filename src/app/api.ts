import { Symbols } from '../feature/MainPage/types/types'

interface SymbolsResponse {
  success: boolean
  symbols: Symbols
}

export const getSymbols = async (): Promise<SymbolsResponse> => {
  try {
    const res = await fetch('https://api.apilayer.com/fixer/symbols', {
      method: 'GET',
      headers: { apikey: import.meta.env.VITE_API_KEY || '' },
    })
    return res.json()
  } catch (e) {
    console.error(e)
    throw e
  }
}

export const getConvertCurrency = async (
  fromCurrency: string,
  toCurrency: string,
  amount: number,
) => {
  try {
    const res = await fetch(
      `https://api.apilayer.com/fixer/convert?to=${toCurrency}&from=${fromCurrency}&amount=${amount}`,
      {
        method: 'GET',
        headers: { apikey: import.meta.env.VITE_API_KEY || '' },
      },
    )
    return res.json()
  } catch (e) {
    console.error(e)
  }
}

export const getLatestExchangeRates = async (
  baseCurrency: string,
  symbols: string,
) => {
  try {
    const res = await fetch(
      `https://api.apilayer.com/fixer/latest?symbols=${symbols}&base=${baseCurrency}`,
      {
        method: 'GET',
        headers: { apikey: import.meta.env.VITE_API_KEY || '' },
      },
    )
    return res.json()
  } catch (e) {
    console.error(e)
  }
}
