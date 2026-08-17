import { EditProfileForm } from "@/components/forms/edit-profile-form";
import { Navbar } from "@/components/navigation/navbar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

type EditProfilePageProps = {
  email?: string;
  name?: string;
  userInitials?: string;
};

function EditProfilePage({
  email = "account@example.com",
  name = "Test Account",
  userInitials = "CT",
}: EditProfilePageProps) {
  return (
    <main className="min-h-screen bg-[var(--gray-100)]">
      <Navbar userInitials={userInitials} />

      <section className="mx-auto flex w-full max-w-[448px] px-6 py-12 sm:py-14">
        <div className="w-full rounded-[8px] border border-[var(--gray-200)] bg-[var(--white)] px-8 py-8 shadow-[0_1px_2px_rgb(17_24_39_/_0.02)]">
          <header className="flex flex-col items-center text-center">
            <Avatar className="size-14 bg-[var(--gray-300)] text-[var(--gray-800)]">
              <AvatarFallback className="bg-[var(--gray-300)] text-base font-semibold text-[var(--gray-800)]">
                {userInitials}
              </AvatarFallback>
            </Avatar>

            <h1 className="mt-5 text-[22px] leading-7 font-bold text-[var(--gray-800)]">{name}</h1>
            <p className="mt-1 text-base leading-6 text-[var(--gray-500)]">{email}</p>
          </header>

          <div className="my-8 h-px bg-[var(--gray-200)]" />

          <EditProfileForm email={email} name={name} />
        </div>
      </section>
    </main>
  );
}

export type { EditProfilePageProps };
export { EditProfilePage };
