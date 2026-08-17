import { Mail, User } from "lucide-react";

import { Input } from "@/components/ui/input";
import { LabelButton } from "@/components/ui/label-button";
import { PasswordInput } from "@/components/ui/password-input";

function RegisterForm() {
  return (
    <form className="flex flex-col gap-5">
      <Input label="Full name" type="text" placeholder="Your full name" icon={<User />} required />

      <Input label="Email" type="email" placeholder="email@example.com" icon={<Mail />} required />

      <PasswordInput helperText="Password must be at least 8 characters" minLength={8} required />

      <LabelButton type="submit" className="mt-3 w-full text-base leading-6">
        Create account
      </LabelButton>
    </form>
  );
}

export { RegisterForm };
