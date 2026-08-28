import type { Transaction } from "@/shared/api/types";
import { getLocalLocale } from "@/shared/lib/intl";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat(getLocalLocale(), {
    currency: "CAD",
    currencyDisplay: "narrowSymbol",
    style: "currency",
  }).format(amount);
};

const formatSignedCurrency = (amount: number, type: Transaction["type"]) => {
  return `${type === "income" ? "+" : "-"} ${formatCurrency(amount)}`;
};

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat(getLocalLocale(), {
    day: "2-digit",
    month: "2-digit",
    year: "2-digit",
    timeZone: "UTC",
  }).format(new Date(date));
};

const toInputDate = (date: string) => {
  if (date.includes("-")) {
    return date.slice(0, 10);
  }

  const parsedDate = new Date(date);

  if (Number.isNaN(parsedDate.getTime())) {
    return "";
  }

  const year = parsedDate.getUTCFullYear();
  const month = String(parsedDate.getUTCMonth() + 1).padStart(2, "0");
  const day = String(parsedDate.getUTCDate()).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

export { formatCurrency, formatDate, formatSignedCurrency, toInputDate };
