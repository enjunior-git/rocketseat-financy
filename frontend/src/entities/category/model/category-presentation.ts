import {
  Beef,
  BriefcaseBusiness,
  BusFront,
  Clapperboard,
  Dumbbell,
  Gift,
  HeartPulse,
  Home,
  Landmark,
  Library,
  ReceiptText,
  ShoppingCart,
  TagIcon,
  TrendingUp,
  Utensils,
  WalletCards,
} from "lucide-react";

import type { Category } from "@/shared/api/types";
import type { TagProps } from "@/shared/ui/tag";

type CategoryColor = NonNullable<TagProps["variant"]>;

type CategoryStat = {
  helper: string;
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  iconClassName: string;
  value: string;
};

const categoryIcons = [
  { label: "Work", value: "work", icon: BriefcaseBusiness },
  { label: "Transport", value: "transport", icon: BusFront },
  { label: "Health", value: "health", icon: HeartPulse },
  { label: "Savings", value: "savings", icon: Landmark },
  { label: "Shopping", value: "shopping", icon: ShoppingCart },
  { label: "Entertainment", value: "entertainment", icon: Clapperboard },
  { label: "Gifts", value: "gifts", icon: Gift },
  { label: "Food", value: "food", icon: Utensils },
  { label: "Pets", value: "pets", icon: Beef },
  { label: "Home", value: "home", icon: Home },
  { label: "Income", value: "income", icon: WalletCards },
  { label: "Fitness", value: "fitness", icon: Dumbbell },
  { label: "Education", value: "education", icon: Library },
  { label: "Utilities", value: "utilities", icon: ReceiptText },
] as const;

const categoryColors = [
  { label: "Green", value: "green", className: "bg-[var(--green-base)]" },
  { label: "Blue", value: "blue", className: "bg-[var(--blue-base)]" },
  { label: "Purple", value: "purple", className: "bg-[var(--purple-base)]" },
  { label: "Pink", value: "pink", className: "bg-[var(--pink-base)]" },
  { label: "Red", value: "red", className: "bg-[var(--red-base)]" },
  { label: "Orange", value: "orange", className: "bg-[var(--orange-base)]" },
  { label: "Yellow", value: "yellow", className: "bg-[var(--yellow-base)]" },
] as const;

const categoryIconByValue = Object.fromEntries(
  categoryIcons.map(({ icon, value }) => [value, icon]),
) as Record<string, React.ComponentType<React.SVGProps<SVGSVGElement>>>;

const categoryIconToneByColor = {
  blue: "bg-[var(--blue-light)] text-[var(--blue-base)]",
  gray: "bg-[var(--gray-200)] text-[var(--gray-700)]",
  green: "bg-[var(--green-light)] text-[var(--green-base)]",
  orange: "bg-[var(--orange-light)] text-[var(--orange-base)]",
  pink: "bg-[var(--pink-light)] text-[var(--pink-base)]",
  purple: "bg-[var(--purple-light)] text-[var(--purple-base)]",
  red: "bg-[var(--red-light)] text-[var(--red-base)]",
  yellow: "bg-[var(--yellow-light)] text-[var(--yellow-base)]",
} satisfies Record<CategoryColor, string>;

const getCategoryColor = (colour?: string): CategoryColor => {
  if (colour && colour in categoryIconToneByColor) {
    return colour as CategoryColor;
  }

  return "gray";
};

const getCategoryIcon = (icon?: string) => {
  if (!icon) {
    return BriefcaseBusiness;
  }

  return categoryIconByValue[icon] ?? BriefcaseBusiness;
};

const formatTransactionCount = (count: number) => {
  return count === 1 ? "1 item" : `${count} items`;
};

const getCategoryStats = (categories: Category[]): CategoryStat[] => {
  const mostUsedCategory = categories.reduce<Category | null>((current, category) => {
    if (!current || category.transactionsAmount > current.transactionsAmount) {
      return category;
    }

    return current;
  }, null);

  return [
    {
      value: String(categories.length),
      helper: "Total categories",
      icon: TagIcon,
      iconClassName: "text-[var(--gray-700)]",
    },
    {
      value: String(categories.reduce((total, category) => total + category.transactionsAmount, 0)),
      helper: "Total transactions",
      icon: TrendingUp,
      iconClassName: "text-[var(--purple-base)]",
    },
    {
      value: mostUsedCategory?.title ?? "-",
      helper: "Most used category",
      icon: Utensils,
      iconClassName: "text-[var(--blue-base)]",
    },
  ];
};

export type { CategoryColor, CategoryStat };
export {
  categoryColors,
  categoryIcons,
  categoryIconToneByColor,
  formatTransactionCount,
  getCategoryColor,
  getCategoryIcon,
  getCategoryStats,
};
