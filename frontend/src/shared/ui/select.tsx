import { Select as SelectPrimitive } from "@base-ui/react/select";
import { Check, ChevronDown } from "lucide-react";

import { cn } from "@/shared/lib/utils";

type SelectOption = {
  label: string;
  value: string;
  disabled?: boolean;
};

type SelectProps = {
  label?: string;
  placeholder?: string;
  options: SelectOption[];
  icon?: React.ReactNode;
  value?: string | null;
  defaultValue?: string | null;
  onValueChange?: SelectPrimitive.Root.Props<string>["onValueChange"];
  disabled?: boolean;
  name?: string;
  required?: boolean;
  defaultOpen?: boolean;
  open?: boolean;
  onOpenChange?: SelectPrimitive.Root.Props<string>["onOpenChange"];
  className?: string;
};

function Select({
  label,
  placeholder = "Select an option",
  options,
  icon,
  className,
  ...props
}: SelectProps) {
  return (
    <SelectPrimitive.Root items={options} {...props}>
      <div className={cn("flex w-full flex-col gap-2", className)}>
        {label ? (
          <SelectPrimitive.Label className="text-sm leading-5 font-medium text-[var(--gray-800)]">
            {label}
          </SelectPrimitive.Label>
        ) : null}

        <SelectPrimitive.Trigger className="flex h-12 w-full items-center gap-3 rounded-[8px] border border-[var(--gray-200)] bg-[var(--white)] px-3 text-base leading-6 text-[var(--gray-800)] outline-none transition-colors select-none disabled:cursor-not-allowed disabled:text-[var(--gray-500)] data-disabled:cursor-not-allowed data-disabled:text-[var(--gray-500)]">
          {icon ? (
            <span
              aria-hidden="true"
              className="flex size-4 shrink-0 items-center justify-center text-current [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:stroke-[1.75]"
            >
              {icon}
            </span>
          ) : null}

          <SelectPrimitive.Value
            className="min-w-0 flex-1 text-left data-placeholder:text-[var(--gray-400)]"
            placeholder={placeholder}
          />

          <SelectPrimitive.Icon className="flex size-4 shrink-0 items-center justify-center text-[var(--gray-700)] transition-transform data-[popup-open]:rotate-180">
            <ChevronDown className="size-4 stroke-[1.75]" />
          </SelectPrimitive.Icon>
        </SelectPrimitive.Trigger>
      </div>

      <SelectPrimitive.Portal>
        <SelectPrimitive.Positioner
          className="z-50 outline-none"
          alignItemWithTrigger={false}
          collisionAvoidance={{
            side: "shift",
            align: "shift",
            fallbackAxisSide: "none",
          }}
          sideOffset={8}
        >
          <SelectPrimitive.Popup className="min-w-[var(--anchor-width)] overflow-hidden rounded-[8px] border border-[var(--gray-200)] bg-[var(--white)] py-2 text-[var(--gray-800)] shadow-[0_12px_24px_rgba(17,24,39,0.12)] outline-none">
            <SelectPrimitive.List className="max-h-[var(--available-height)] overflow-y-auto">
              {options.map((option) => (
                <SelectPrimitive.Item
                  key={option.value}
                  value={option.value}
                  disabled={option.disabled}
                  className="grid cursor-default grid-cols-[1fr_auto] items-center gap-3 px-3 py-1.5 text-base leading-6 outline-none select-none data-highlighted:bg-[var(--gray-100)] data-disabled:text-[var(--gray-400)]"
                >
                  <SelectPrimitive.ItemText>{option.label}</SelectPrimitive.ItemText>
                  <SelectPrimitive.ItemIndicator className="text-[var(--success)]">
                    <Check className="size-4 stroke-[2]" />
                  </SelectPrimitive.ItemIndicator>
                </SelectPrimitive.Item>
              ))}
            </SelectPrimitive.List>
          </SelectPrimitive.Popup>
        </SelectPrimitive.Positioner>
      </SelectPrimitive.Portal>
    </SelectPrimitive.Root>
  );
}

export type { SelectOption, SelectProps };
export { Select };
