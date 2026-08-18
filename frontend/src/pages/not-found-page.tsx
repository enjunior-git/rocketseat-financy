import { Link } from "@tanstack/react-router";
import { ArrowLeft, House, SearchX } from "lucide-react";

import Logo from "@/shared/assets/logo.svg";
import { buttonVariants } from "@/shared/ui/button";

function NotFoundPage() {
  return (
    <main className="flex min-h-screen bg-[var(--gray-100)] px-6 py-10">
      <section className="mx-auto flex w-full max-w-[720px] flex-col items-center justify-center text-center">
        <img src={Logo} alt="Financy" className="h-8 w-auto" />

        <div className="mt-14 flex size-16 items-center justify-center rounded-[8px] bg-[var(--red-light)] text-[var(--red-base)]">
          <SearchX aria-hidden="true" className="size-7 stroke-[1.75]" />
        </div>

        <p className="mt-8 text-sm leading-5 font-bold tracking-[0.16em] text-[var(--red-base)] uppercase">
          404
        </p>
        <h1 className="mt-3 text-[32px] leading-10 font-bold text-[var(--gray-800)]">
          Page not found
        </h1>
        <p className="mt-3 max-w-[480px] text-base leading-6 text-[var(--gray-600)]">
          The page may have moved, been deleted, or never existed.
        </p>

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Link
            to="/dashboard"
            className={buttonVariants({
              size: "label",
              className: "w-full sm:w-fit",
            })}
          >
            <House />
            Dashboard
          </Link>
          <Link
            to="/login"
            className={buttonVariants({
              variant: "outline",
              size: "label",
              className: "w-full sm:w-fit",
            })}
          >
            <ArrowLeft />
            Sign in
          </Link>
        </div>
      </section>
    </main>
  );
}

export { NotFoundPage };
