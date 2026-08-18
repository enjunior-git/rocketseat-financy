import type { Transaction } from "@/shared/api/types";

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(amount);
};

const formatSignedCurrency = (amount: number, type: Transaction["type"]) => {
  return `${type === "income" ? "+" : "-"} ${formatCurrency(amount)}`;
};

const formatDate = (date: string) => {
  return new Intl.DateTimeFormat("en-US", {
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

  const [month, day, year] = date.split("/");

  return `20${year}-${month}-${day}`;
};

export { formatCurrency, formatDate, formatSignedCurrency, toInputDate };
