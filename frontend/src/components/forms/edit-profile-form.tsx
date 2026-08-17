import { LogOut, Mail, User } from "lucide-react";

import { Input } from "@/components/ui/input";
import { LabelButton } from "@/components/ui/label-button";

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

      <LabelButton type="submit" className="mt-3 w-full text-base leading-6">
        Save changes
      </LabelButton>

      <LabelButton
        type="button"
        variant="outline"
        className="w-full text-base leading-6 text-[var(--gray-700)] [&_svg]:text-[var(--red-base)]"
      >
        <LogOut />
        Sign out
      </LabelButton>
    </form>
  );
}

export type { EditProfileFormProps };
export { EditProfileForm };
