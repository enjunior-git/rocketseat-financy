import { useNavigate } from "@tanstack/react-router";
import { Check, Mail } from "lucide-react";
import { useLoginMutation } from "@/features/auth/login";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Label } from "@/shared/ui/label";
import { PasswordInput } from "@/shared/ui/password-input";

function LoginForm() {
  const navigate = useNavigate();
  const loginMutation = useLoginMutation();

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    loginMutation.mutate(
      {
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
        label="Email"
        name="email"
        type="email"
        placeholder="email@example.com"
        icon={<Mail />}
        disabled={loginMutation.isPending}
        required
      />

      <PasswordInput name="password" disabled={loginMutation.isPending} required />

      <Label className="flex w-fit items-center gap-2 text-sm leading-5 font-normal text-[var(--gray-700)]">
        <input type="checkbox" className="peer sr-only" />
        <span className="flex size-4 shrink-0 items-center justify-center rounded-[4px] border border-[var(--gray-300)] bg-[var(--white)] text-[var(--white)] peer-checked:border-[var(--brand-base)] peer-checked:bg-[var(--brand-base)] peer-checked:[&_svg]:opacity-100 peer-focus-visible:ring-3 peer-focus-visible:ring-ring/50">
          <Check className="size-3 opacity-0" />
        </span>
        Remember me
      </Label>

      {loginMutation.isError ? (
        <p className="text-sm leading-5 text-[var(--red-base)]">{loginMutation.error.message}</p>
      ) : null}

      <Button
        type="submit"
        size="label"
        className="mt-1 w-full text-base leading-6"
        disabled={loginMutation.isPending}
      >
        {loginMutation.isPending ? "Signing in..." : "Sign in"}
      </Button>
    </form>
  );
}

export { LoginForm };
