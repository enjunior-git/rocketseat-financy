import { UserRoundPlus } from "lucide-react";
import { LoginForm } from "@/features/auth/login";
import { AuthLayout } from "@/widgets/layout";

function LoginPage() {
  return (
    <AuthLayout
      title="Sign in"
      description="Enter your account to continue"
      footerText="Don't have an account?"
      actionTo="/register"
      actionLabel="Create account"
      actionIcon={<UserRoundPlus />}
    >
      <LoginForm />
    </AuthLayout>
  );
}

export { LoginPage };
