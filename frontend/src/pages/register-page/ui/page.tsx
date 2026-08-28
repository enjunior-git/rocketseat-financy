import { LogIn } from "lucide-react";
import { RegisterForm } from "@/features/auth/register";
import { AuthLayout } from "@/widgets/layout";

function RegisterPage() {
  return (
    <AuthLayout
      title="Create account"
      description="Start managing your finances today"
      footerText="Already have an account?"
      actionTo="/login"
      actionLabel="Sign in"
      actionIcon={<LogIn />}
    >
      <RegisterForm />
    </AuthLayout>
  );
}

export { RegisterPage };
