import { Eye, EyeClosed, LockKeyhole, Mail } from "lucide-react";
import { useState } from "react";

import { Input } from "@/components/ui/input";
import { LabelButton } from "@/components/ui/label-button";

function LoginForm() {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <form className="flex flex-col gap-5">
      <Input label="Email" type="email" placeholder="email@example.com" icon={<Mail />} required />

      <Input
        label="Password"
        type={isPasswordVisible ? "text" : "password"}
        placeholder="Enter your password"
        icon={<LockKeyhole />}
        required
        trailingIcon={
          <button
            type="button"
            aria-label={isPasswordVisible ? "Hide password" : "Show password"}
            aria-pressed={isPasswordVisible}
            className="flex items-center justify-center rounded-[4px] text-[var(--gray-800)] outline-none transition-colors hover:text-[var(--brand-base)] focus-visible:ring-2 focus-visible:ring-[var(--brand-base)]"
            onClick={() => setIsPasswordVisible((currentValue) => !currentValue)}
          >
            {isPasswordVisible ? <EyeClosed /> : <Eye />}
          </button>
        }
      />

      <label className="flex w-fit items-center gap-2 text-sm leading-5 text-[var(--gray-700)]">
        <input
          type="checkbox"
          className="size-4 rounded-[4px] border border-[var(--gray-300)] bg-[var(--white)] accent-[var(--brand-base)]"
        />
        Remember me
      </label>

      <LabelButton type="submit" className="mt-1 w-full text-base leading-6">
        Sign in
      </LabelButton>
    </form>
  );
}

export { LoginForm };
