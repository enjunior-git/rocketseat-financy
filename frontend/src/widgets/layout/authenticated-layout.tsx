import { Navbar } from "@/widgets/navigation";

type AuthenticatedLayoutProps = {
  children: React.ReactNode;
  userFullName?: string;
};

function AuthenticatedLayout({ children, userFullName }: AuthenticatedLayoutProps) {
  return (
    <main className="min-h-screen bg-[var(--gray-100)]">
      <Navbar userFullName={userFullName} />
      {children}
    </main>
  );
}

export { AuthenticatedLayout };
