import { Button } from "@mui/material";
import { cn } from "../lib/utils";

interface EmptyStateProps {
  title: string;
  description?: string;
  className?: string;
  actionLabel?: string;
  onAction?: () => void;
}

export const EmptyState = ({
  title,
  description,
  className,
  actionLabel,
  onAction,
}: EmptyStateProps) => {
  return (
    <div className={cn("flex flex-col items-center gap-1 max-w-[400px] mx-auto mt-10", className)}>
      <h1 className="text-3xl font-bold">{title}</h1>
      <p className="text-center text-sm text-muted-foreground">{description}</p>
      {actionLabel && onAction && (
        <Button onClick={onAction} variant="outlined" className="!mt-3">
          {actionLabel}
        </Button>
      )}
    </div>
  );
};
