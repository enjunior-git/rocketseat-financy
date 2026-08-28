import { Link } from "@tanstack/react-router";
import type { ReactNode } from "react";

import Logo from "@/shared/assets/logo.svg";
import { Button } from "@/shared/ui/button";
import { Card } from "@/shared/ui/card";

type AuthLayoutProps = {
  children: ReactNode;
  title: string;
  description: string;
  footerText: string;
  actionLabel: string;
  actionTo: "/login" | "/register";
  actionIcon: ReactNode;
};

function AuthLayout({
  children,
  title,
  description,
  footerText,
  actionLabel,
  actionTo,
  actionIcon,
}: AuthLayoutProps) {
  return (
    <main className="flex h-screen overflow-auto bg-[var(--gray-100)] px-6 py-9">
      <section className="mx-auto flex w-full max-w-[448px] flex-col items-center gap-8 mt-1.5">
        <img src={Logo} alt="Financy" className="h-8 w-auto" />

        <Card className="w-full gap-0 overflow-visible rounded-[8px] border border-[var(--gray-200)] bg-[var(--white)] px-8 py-8 ring-0 shadow-[0_1px_2px_rgb(17_24_39_/_0.02)] sm:px-8">
          <header className="mb-9 text-center">
            <h1 className="text-[22px] leading-7 font-bold text-[var(--gray-800)]">{title}</h1>
            <p className="mt-2 text-base leading-6 text-[var(--gray-600)]">{description}</p>
          </header>

          {children}

          <div className="my-6 grid grid-cols-[1fr_auto_1fr] items-center gap-3">
            <div className="h-px bg-[var(--gray-200)]" />
            <span className="text-sm leading-5 text-[var(--gray-500)]">or</span>
            <div className="h-px bg-[var(--gray-200)]" />
          </div>

          <div className="flex flex-col items-center gap-4">
            <p className="text-sm leading-5 text-[var(--gray-600)]">{footerText}</p>

            <Link to={actionTo} className="w-full">
              <Button type="button" variant="outline" size="label" className="w-full text-base leading-6">
                {actionIcon}
                {actionLabel}
              </Button>
            </Link>
          </div>
        </Card>
      </section>
    </main>
  );
}

export { AuthLayout };
