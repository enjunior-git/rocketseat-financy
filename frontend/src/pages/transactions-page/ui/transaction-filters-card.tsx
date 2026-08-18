import { Search } from "lucide-react";

import { Card } from "@/shared/ui/card";
import { Input } from "@/shared/ui/input";
import type { SelectOption } from "@/shared/ui/select";
import { Select } from "@/shared/ui/select";

type TransactionFiltersCardProps = {
  categoryFilter: string;
  categoryOptions: SelectOption[];
  isCategoryLoading: boolean;
  isTransactionLoading: boolean;
  onCategoryChange: (value: string) => void;
  onPeriodChange: (value: string) => void;
  onSearchChange: (value: string) => void;
  onTypeChange: (value: string) => void;
  periodFilter: string;
  periodOptions: SelectOption[];
  search: string;
  typeFilter: string;
  typeOptions: SelectOption[];
};

function TransactionFiltersCard({
  categoryFilter,
  categoryOptions,
  isCategoryLoading,
  isTransactionLoading,
  onCategoryChange,
  onPeriodChange,
  onSearchChange,
  onTypeChange,
  periodFilter,
  periodOptions,
  search,
  typeFilter,
  typeOptions,
}: TransactionFiltersCardProps) {
  return (
    <Card className="mt-9 gap-0 overflow-visible rounded-[8px] border border-[var(--gray-200)] bg-[var(--white)] px-6 py-6 ring-0">
      <div className="grid gap-4 lg:grid-cols-4">
        <Input
          label="Search"
          type="search"
          placeholder="Search by description"
          icon={<Search />}
          value={search}
          onChange={(event) => onSearchChange(event.target.value)}
        />
        <Select
          label="Type"
          value={typeFilter}
          onValueChange={(value) => onTypeChange(value ?? "all")}
          options={typeOptions}
          disabled={isTransactionLoading}
        />
        <Select
          label="Category"
          value={categoryFilter}
          onValueChange={(value) => onCategoryChange(value ?? "all")}
          options={categoryOptions}
          disabled={isCategoryLoading}
        />
        <Select
          label="Period"
          value={periodFilter}
          onValueChange={(value) => onPeriodChange(value ?? "all")}
          options={periodOptions}
          disabled={isTransactionLoading}
        />
      </div>
    </Card>
  );
}

export { TransactionFiltersCard };
