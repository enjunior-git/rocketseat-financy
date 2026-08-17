import { useId } from "react";

import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

type InputProps = Omit<React.ComponentProps<"input">, "prefix"> & {
  label?: string;
  helperText?: string;
  error?: string;
  icon?: React.ReactNode;
  trailingIcon?: React.ReactNode;
};

function Input({
  id,
  className,
  label,
  helperText,
  error,
  icon,
  trailingIcon,
  disabled,
  "aria-describedby": ariaDescribedBy,
  ...props
}: InputProps) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const descriptionId = error || helperText ? `${inputId}-description` : undefined;

  return (
    <div className="group flex w-full flex-col gap-2" data-slot="input-root">
      {label ? (
        <Label
          htmlFor={inputId}
          className={cn(
            "text-sm leading-5 font-medium text-[var(--gray-800)] transition-colors group-focus-within:text-[var(--brand-base)]",
            error && "text-[var(--red-base)] group-focus-within:text-[var(--red-base)]",
            disabled && "text-[var(--gray-800)] group-focus-within:text-[var(--gray-800)]",
          )}
        >
          {label}
        </Label>
      ) : null}

      <div
        className={cn(
          "flex h-12 items-center gap-3 rounded-[8px] border border-[var(--gray-300)] bg-[var(--white)] px-3 text-[var(--gray-800)] transition-colors group-focus-within:text-[var(--brand-base)]",
          error && "text-[var(--red-base)] group-focus-within:text-[var(--red-base)]",
          disabled &&
            "border-[var(--gray-200)] text-[var(--gray-400)] group-focus-within:text-[var(--gray-400)]",
        )}
      >
        {icon ? (
          <span
            aria-hidden="true"
            className="flex size-4 shrink-0 items-center justify-center text-current [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:stroke-[1.75]"
          >
            {icon}
          </span>
        ) : null}

        <input
          id={inputId}
          data-slot="input"
          disabled={disabled}
          aria-invalid={error ? true : undefined}
          aria-describedby={cn(ariaDescribedBy, descriptionId) || undefined}
          className={cn(
            "min-w-0 flex-1 bg-transparent text-base leading-6 text-[var(--gray-800)] outline-none placeholder:text-[var(--gray-400)] disabled:cursor-not-allowed disabled:text-[var(--gray-500)]",
            className,
          )}
          {...props}
        />

        {trailingIcon ? (
          <span className="flex size-4 shrink-0 items-center justify-center text-current [&_button]:size-6 [&_svg]:size-4 [&_svg]:shrink-0 [&_svg]:stroke-[1.75]">
            {trailingIcon}
          </span>
        ) : null}
      </div>

      {descriptionId ? (
        <p id={descriptionId} className="text-xs leading-4 font-normal text-[var(--gray-500)]">
          {error ?? helperText}
        </p>
      ) : null}
    </div>
  );
}

export type { InputProps };
export { Input };
