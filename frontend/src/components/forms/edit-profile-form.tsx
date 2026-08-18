import { useNavigate } from "@tanstack/react-router";
import { LogOut, Mail, User } from "lucide-react";
import { type FormEvent, useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAuthStore } from "@/stores/auth";

type EditProfileFormProps = {
  email?: string;
  name?: string;
  isSaving?: boolean;
  onSaveName?: (name: string) => void;
};

function EditProfileForm({
  email = "account@example.com",
  isSaving = false,
  name = "Test Account",
  onSaveName,
}: EditProfileFormProps) {
  const navigate = useNavigate();
  const logout = useAuthStore((state) => state.logout);
  const [fullName, setFullName] = useState(name);

  useEffect(() => {
    setFullName(name);
  }, [name]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSaveName?.(fullName.trim());
  };

  const handleSignOut = () => {
    logout();
    void navigate({ to: "/login" });
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <Input
        label="Full name"
        type="text"
        value={fullName}
        onChange={(event) => setFullName(event.target.value)}
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

      <Button
        type="submit"
        size="label"
        className="mt-3 w-full text-base leading-6"
        disabled={isSaving}
      >
        {isSaving ? "Saving..." : "Save changes"}
      </Button>

      <Button
        type="button"
        variant="outline"
        size="label"
        onClick={handleSignOut}
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
