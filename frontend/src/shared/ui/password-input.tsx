import { Eye, EyeClosed, LockKeyhole } from "lucide-react";
import { useState } from "react";

import { Input, type InputProps } from "@/shared/ui/input";

type PasswordInputProps = Omit<InputProps, "type" | "icon" | "trailingIcon"> & {
  hiddenLabel?: string;
  visibleLabel?: string;
};

function PasswordInput({
  label = "Password",
  placeholder = "Enter your password",
  hiddenLabel = "Show password",
  visibleLabel = "Hide password",
  ...props
}: PasswordInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <Input
      label={label}
      type={isPasswordVisible ? "text" : "password"}
      placeholder={placeholder}
      icon={<LockKeyhole />}
      trailingIcon={
        <button
          type="button"
          aria-label={isPasswordVisible ? visibleLabel : hiddenLabel}
          aria-pressed={isPasswordVisible}
          className="flex items-center justify-center rounded-[4px] text-[var(--gray-800)] outline-none transition-colors hover:text-[var(--brand-base)] focus-visible:ring-2 focus-visible:ring-[var(--brand-base)]"
          onClick={() => setIsPasswordVisible((currentValue) => !currentValue)}
        >
          {isPasswordVisible ? <EyeClosed /> : <Eye />}
        </button>
      }
      {...props}
    />
  );
}

export type { PasswordInputProps };
export { PasswordInput };
