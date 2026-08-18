import { Avatar, AvatarFallback } from "@/shared/ui/avatar";
import { cn } from "@/shared/lib/utils";

export type UserAvatarProps = {
  className?: string;
  fallbackClassName?: string;
  fullName: string;
  size?: "default" | "lg" | "sm";
};

const getNameLetters = (name: string) => Array.from(name.trim());

export const getUserInitials = (fullName: string) => {
  const names = fullName.trim().split(/\s+/).filter(Boolean);

  if (names.length === 0) {
    return "?";
  }

  if (names.length === 1) {
    return getNameLetters(names[0] ?? "")
      .slice(0, 2)
      .join("")
      .toUpperCase();
  }

  const firstName = names[0] ?? "";
  const lastName = names.at(-1) ?? "";

  return `${getNameLetters(firstName)[0] ?? ""}${getNameLetters(lastName)[0] ?? ""}`.toUpperCase();
};

export function UserAvatar({
  className,
  fallbackClassName,
  fullName,
  size = "default",
}: UserAvatarProps) {
  const initials = getUserInitials(fullName);

  return (
    <Avatar
      aria-label={`User avatar ${initials}`}
      className={cn("bg-[var(--gray-300)] text-[var(--gray-800)]", className)}
      size={size}
    >
      <AvatarFallback
        className={cn(
          "bg-[var(--gray-300)] text-xs font-semibold text-[var(--gray-800)]",
          fallbackClassName,
        )}
      >
        {initials}
      </AvatarFallback>
    </Avatar>
  );
}
