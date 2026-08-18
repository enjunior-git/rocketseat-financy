import { EditProfileForm } from "@/components/forms/edit-profile-form";
import { Card } from "@/components/ui/card";
import { UserAvatar } from "@/components/ui/user-avatar";
import { useUpdateUserMutation } from "@/hooks/use-update-user-mutation";
import { useAuthStore } from "@/stores/auth";

type EditProfilePageProps = {
  email?: string;
  name?: string;
};

function EditProfilePage({
  email = "account@example.com",
  name = "Test Account",
}: EditProfilePageProps) {
  const user = useAuthStore((state) => state.user);
  const updateUserMutation = useUpdateUserMutation();
  const displayName = user?.name ?? name;
  const displayEmail = user?.email ?? email;

  return (
    <section className="mx-auto flex w-full max-w-[448px] px-6 py-12 sm:py-14">
        <Card className="w-full gap-0 overflow-visible rounded-[8px] border border-[var(--gray-200)] bg-[var(--white)] px-8 py-8 ring-0 shadow-[0_1px_2px_rgb(17_24_39_/_0.02)]">
          <header className="flex flex-col items-center text-center">
            <UserAvatar
              fullName={displayName}
              size="lg"
              className="size-14"
              fallbackClassName="text-base"
            />

            <h1 className="mt-5 text-[22px] leading-7 font-bold text-[var(--gray-800)]">
              {displayName}
            </h1>
            <p className="mt-1 text-base leading-6 text-[var(--gray-500)]">{displayEmail}</p>
          </header>

          <div className="my-8 h-px bg-[var(--gray-200)]" />

          <EditProfileForm
            email={displayEmail}
            isSaving={updateUserMutation.isPending}
            name={displayName}
            onSaveName={(updatedName) => updateUserMutation.mutate({ name: updatedName })}
          />
        </Card>
    </section>
  );
}

export type { EditProfilePageProps };
export { EditProfilePage };
