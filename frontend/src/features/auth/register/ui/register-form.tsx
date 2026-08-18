import { useNavigate } from "@tanstack/react-router";
import { Mail, User } from "lucide-react";

import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { PasswordInput } from "@/shared/ui/password-input";
import { useRegisterMutation } from "@/features/auth/register";

function RegisterForm() {
  const navigate = useNavigate();
  const registerMutation = useRegisterMutation();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    registerMutation.mutate(
      {
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        password: String(formData.get("password") ?? ""),
      },
      {
        onSuccess: () => {
          void navigate({ to: "/dashboard" });
        },
      },
    );
  };

  return (
    <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
      <Input
        label="Full name"
        name="name"
        type="text"
        placeholder="Your full name"
        icon={<User />}
        disabled={registerMutation.isPending}
        required
      />

      <Input
        label="Email"
        name="email"
        type="email"
        placeholder="email@example.com"
        icon={<Mail />}
        disabled={registerMutation.isPending}
        required
      />

      <PasswordInput
        name="password"
        helperText="Password must be at least 8 characters"
        minLength={8}
        disabled={registerMutation.isPending}
        required
      />

      {registerMutation.isError ? (
        <p className="text-sm leading-5 text-[var(--red-base)]">{registerMutation.error.message}</p>
      ) : null}

      <Button
        type="submit"
        size="label"
        className="mt-3 w-full text-base leading-6"
        disabled={registerMutation.isPending}
      >
        {registerMutation.isPending ? "Creating account..." : "Create account"}
      </Button>
    </form>
  );
}

export { RegisterForm };
