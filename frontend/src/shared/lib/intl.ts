const DEFAULT_LOCALE = "en-CA";

const getLocalLocale = () => {
  if (typeof navigator === "undefined") {
    return DEFAULT_LOCALE;
  }

  return navigator.language || DEFAULT_LOCALE;
};

export { getLocalLocale };
