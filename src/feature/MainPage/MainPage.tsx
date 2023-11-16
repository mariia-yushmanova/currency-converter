import { ChangeEvent, useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { getConvertCurrency, getLatestExchangeRates } from '../../app/api'
import { RootState } from '../../store'
import { getDefaultCurrency } from '../../utils/getDefaultCurrency'
import { Button } from '../Button/Button'
import { LoadingAnimation } from '../LoadingAnimation/LoadingAnimation'
import s from './ MainPage.module.css'

export const MainPage = () => {
  const defaultCurrency = getDefaultCurrency()
  const { symbols } = useSelector((state: RootState) => state.symbolState)
  const [amount, setAmount] = useState('')
  const [currencyFrom, setCurrencyFrom] = useState(defaultCurrency)
  const [currencyTo, setCurrencyTo] = useState('SGD')
  const [convertedAmount, setConvertedAmount] = useState()
  const [exchangeRate, setExchangeRate] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isExchangeLoading, setIsExchangeLoading] = useState(false)

  useEffect(() => {
    const performConversion = async () => {
      if (amount !== '') {
        setIsLoading(true)
        try {
          const response = await getConvertCurrency(
            currencyFrom,
            currencyTo,
            +amount,
          )
          if (response.success) {
            setConvertedAmount(response.result)
          } else {
            console.error('Error in conversion:', response)
          }
        } catch (error) {
          console.error('Conversion error:', error)
        } finally {
          setIsLoading(false)
        }
      }
    }
    performConversion()
  }, [amount, currencyFrom, currencyTo])

  useEffect(() => {
    const fetchExchangeRate = async () => {
      setIsExchangeLoading(true)
      try {
        const response = await getLatestExchangeRates(currencyFrom, currencyTo)
        if (response.success) {
          setExchangeRate(
            `1 ${currencyFrom} = ${response.rates[currencyTo]} ${currencyTo}`,
          )
        } else {
          console.error('Error fetching exchange rate:', response)
        }
      } catch (error) {
        console.error('Error:', error)
      } finally {
        setIsExchangeLoading(false)
      }
    }
    fetchExchangeRate()
  }, [currencyFrom, currencyTo])

  const switchCurrencies = () => {
    setCurrencyFrom(currencyTo)
    setCurrencyTo(currencyFrom)
  }

  const handleCurrencyFromChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurrencyFrom(e.target.value)
  }

  const handleCurrencyToChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setCurrencyTo(e.target.value)
  }

  return (
    <>
      <div className={s.converter__info_text}>
        <h1 className={s.converter__title}>Currency Converter</h1>
        <span>
          Check live rates, set rate alerts, receive notifications, and more.
        </span>
      </div>
      <div className={s.box}>
        <div className={s.input__group}>
          <label htmlFor='amount'>Amount</label>
          <div className={s.content}>
            <img src='/flags/canada.png' alt='flag' />
            <div className={s.select__container}>
              <select
                value={currencyFrom}
                onChange={handleCurrencyFromChange}
                className={s.select}
              >
                {Object.entries(symbols).map(([code]) => (
                  <option key={code} value={code}>
                    {code}
                  </option>
                ))}
              </select>
            </div>
            <input
              type='number'
              id='amount'
              value={amount}
              onChange={e => setAmount(e.target.value)}
              className={s.input}
            />
          </div>
        </div>
        <div className={s.divider} />
        <Button onClick={switchCurrencies} isLoading={isLoading} />
        <div className={s.input__group}>
          <label htmlFor='converted-amount'>Converted Amount</label>
          <div className={s.content}>
            <img src='/flags/egypt.png' alt='flag' />
            <select
              value={currencyTo}
              onChange={handleCurrencyToChange}
              className={s.select}
            >
              {Object.entries(symbols).map(([code]) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
            {isLoading ? (
              <div className={s.loading__box}>
                <span className={s.loading}></span>
              </div>
            ) : (
              <input
                type='text'
                id='converted-amount'
                value={convertedAmount}
                readOnly
                className={s.input}
              />
            )}
          </div>
        </div>
      </div>
      <div className={s.exchange__container}>
        <span>Indicative Exchange Rate</span>
        {isExchangeLoading ? (
          <LoadingAnimation />
        ) : (
          <p className={s.exchange__text}>{exchangeRate || 'No Data'}</p>
        )}
      </div>
    </>
  )
}
