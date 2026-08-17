import { Mail } from "lucide-react";

import { Input } from "@/components/ui/input";
import { LabelButton } from "@/components/ui/label-button";
import { PasswordInput } from "@/components/ui/password-input";

function LoginForm() {
  return (
    <form className="flex flex-col gap-5">
      <Input label="Email" type="email" placeholder="email@example.com" icon={<Mail />} required />

      <PasswordInput required />

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
