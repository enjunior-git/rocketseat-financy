import { Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
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

      <Button type="submit" size="label" className="mt-1 w-full text-base leading-6">
        Sign in
      </Button>
    </form>
  );
}

export { LoginForm };
