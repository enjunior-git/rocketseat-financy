import { createFileRoute } from "@tanstack/react-router";

import { EditProfilePage } from "@/pages/edit-profile-page";

export const Route = createFileRoute("/_authenticated/profile")({
  component: EditProfilePage,
});
