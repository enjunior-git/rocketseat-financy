import { Link } from "@tanstack/react-router";
import { House, RefreshCw, TriangleAlert } from "lucide-react";

import Logo from "@/assets/logo.svg";
import { Button, buttonVariants } from "@/components/ui/button";

type GenericErrorPageProps = {
  error?: Error;
  reset?: () => void;
};

function GenericErrorPage({ error, reset }: GenericErrorPageProps) {
  const handleRetry = () => {
    if (reset) {
      reset();
      return;
    }

    window.location.reload();
  };

  return (
    <main className="flex min-h-screen bg-[var(--gray-100)] px-6 py-10">
      <section className="mx-auto flex w-full max-w-[720px] flex-col items-center justify-center text-center">
        <img src={Logo} alt="Financy" className="h-8 w-auto" />

        <div className="mt-14 flex size-16 items-center justify-center rounded-[8px] bg-[var(--yellow-light)] text-[var(--yellow-base)]">
          <TriangleAlert aria-hidden="true" className="size-7 stroke-[1.75]" />
        </div>

        <p className="mt-8 text-sm leading-5 font-bold tracking-[0.16em] text-[var(--yellow-base)] uppercase">
          Error
        </p>
        <h1 className="mt-3 text-[32px] leading-10 font-bold text-[var(--gray-800)]">
          Something went wrong
        </h1>
        <p className="mt-3 max-w-[480px] text-base leading-6 text-[var(--gray-600)]">
          Financy could not finish loading this screen.
        </p>

        {error?.message ? (
          <p className="mt-5 max-w-[560px] rounded-[8px] border border-[var(--gray-200)] bg-[var(--white)] px-4 py-3 text-sm leading-5 text-[var(--gray-600)]">
            {error.message}
          </p>
        ) : null}

        <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
          <Button type="button" size="label" className="w-full sm:w-fit" onClick={handleRetry}>
            <RefreshCw />
            Try again
          </Button>
          <Link
            to="/dashboard"
            className={buttonVariants({
              variant: "outline",
              size: "label",
              className: "w-full sm:w-fit",
            })}
          >
            <House />
            Dashboard
          </Link>
        </div>
      </section>
    </main>
  );
}

export type { GenericErrorPageProps };
export { GenericErrorPage };
