import { LogOut, Mail, User } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

type EditProfileFormProps = {
  email?: string;
  name?: string;
};

function EditProfileForm({
  email = "account@example.com",
  name = "Test Account",
}: EditProfileFormProps) {
  return (
    <form className="flex flex-col gap-5">
      <Input
        label="Full name"
        type="text"
        defaultValue={name}
        icon={<User />}
        placeholder="Your full name"
        required
      />

      <Input
        label="Email"
        type="email"
        defaultValue={email}
        icon={<Mail />}
        helperText="Email cannot be changed"
        disabled
      />

      <Button type="submit" size="label" className="mt-3 w-full text-base leading-6">
        Save changes
      </Button>

      <Button
        type="button"
        variant="outline"
        size="label"
        className="w-full text-base leading-6 text-[var(--gray-700)] [&_svg]:text-[var(--red-base)]"
      >
        <LogOut />
        Sign out
      </Button>
    </form>
  );
}

export type { EditProfileFormProps };
export { EditProfileForm };
