import type * as React from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import type { Button } from "@/components/ui/button";

type ActionAlertDialogProps = {
  actionLabel: string;
  actionVariant?: React.ComponentProps<typeof Button>["variant"];
  cancelLabel?: string;
  description: string;
  media?: React.ReactNode;
  onAction?: React.ComponentProps<typeof AlertDialogAction>["onClick"];
  title: string;
  trigger: React.ReactElement;
};

function ActionAlertDialog({
  actionLabel,
  actionVariant = "default",
  cancelLabel = "Cancel",
  description,
  media,
  onAction,
  title,
  trigger,
}: ActionAlertDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger render={trigger} />
      <AlertDialogContent>
        <AlertDialogHeader>
          {media ? <AlertDialogMedia>{media}</AlertDialogMedia> : null}
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel>{cancelLabel}</AlertDialogCancel>
          <AlertDialogAction variant={actionVariant} onClick={onAction}>
            {actionLabel}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export type { ActionAlertDialogProps };
export { ActionAlertDialog };
