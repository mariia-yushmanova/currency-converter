export const getDefaultCurrency = () => {
  const userLocale = navigator.language || 'en-US'

  if (userLocale.startsWith('ru')) {
    return 'RUB'
  } else if (userLocale.startsWith('en-GB')) {
    return 'GBP'
  } else if (
    userLocale.includes('EU') ||
    userLocale.startsWith('de') ||
    userLocale.startsWith('fr') ||
    userLocale.startsWith('es')
  ) {
    return 'EUR'
  }

  return 'USD'
}
