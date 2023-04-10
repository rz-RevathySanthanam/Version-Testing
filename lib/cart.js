import Config from '@/config';

export function getLocal() {
  if (typeof window === 'undefined') {
    return Config.Locale;
  }

  if (Config.PreferUserLocal === 1 && navigator && navigator.language) {
    return navigator.language;
  }

  return Config.Locale;
}

export function formatCurrency(amount, currency) {
  const lCurrency = currency || Config.Currency;

  // INFO
  // currencyDisplay: 'narrowSymbol' - is not supported in Safari 14.0
  // Best approach is to use polyfills https://formatjs.io/docs/polyfills/intl-numberformat
  // But that will add ~15KB to build size. So its better to go for text replace in this case.
  const formater = new Intl.NumberFormat(
    getLocal(), { style: 'currency', currency: lCurrency },
  );

  let formatted = formater.format(Math.round(amount));

  if (getLocal() === 'is-IS' && formatted.startsWith(lCurrency)) {
    // Temporary Bad logic on chrome 🤧 - Since we know only doing for IS and no decimal.
    // In other browsers its working fine. So only for chrome manually swapping and
    // replacing , to . in price.
    // eslint-disable-next-line no-unused-vars
    const [cur, price] = formatted.split(lCurrency);
    formatted = [price.trimStart(), lCurrency].join(' ').replace(/,/g, '.');
  }

  if (Config.CurrencySymbol) {
    return formatted.replace(lCurrency, Config.CurrencySymbol);
  }

  return formatted;
}

export function formatNumber(value, roundOf = false) {
  const formater = new Intl.NumberFormat(
    getLocal(),
  );

  if (roundOf) {
    return formater.format(Math.round(value));
  }

  return formater.format(value);
}
