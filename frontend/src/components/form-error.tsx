import { ErrorOutline } from "@mui/icons-material";
import { cn } from "../lib/utils";

interface FormErrorProps {
  error?: string;
  className?: string;
}

export const FormError = ({ error, className }: FormErrorProps) => {
  if (!error) return null;
  return (
    <div
      className={cn(
        "flex items-center text-red-500 text-sm font-medium justify-center gap-3 bg-red-500/20 rounded-md h-10",
        className
      )}
    >
      <ErrorOutline className="!size-4 !mt-[3px]" />
      {error}
    </div>
  );
};
