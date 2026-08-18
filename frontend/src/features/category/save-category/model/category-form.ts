import type { CreateCategoryInput } from "@/shared/api/types";

type CategoryFormValues = {
  color?: string;
  description?: string;
  icon?: string;
  title?: string;
};

const getCategoryFormInput = (
  formData: FormData,
  defaults: Pick<Required<CategoryFormValues>, "color" | "icon">,
): CreateCategoryInput => ({
  title: String(formData.get("title") ?? ""),
  description: String(formData.get("description") ?? ""),
  icon: String(formData.get("icon") ?? defaults.icon),
  colour: String(formData.get("color") ?? defaults.color),
});

export type { CategoryFormValues };
export { getCategoryFormInput };
