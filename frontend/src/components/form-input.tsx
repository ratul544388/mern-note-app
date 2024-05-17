import { Visibility, VisibilityOff } from "@mui/icons-material";
import { cn } from "../lib/utils";
import { forwardRef, useState } from "react";

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

const FormInput = forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, label, error, ...props }, ref) => {
    const [isPassword, setIsPassword] = useState(type === "password");
    return (
      <div>
        <div className={cn("relative group w-full", className)}>
          <input
            type={isPassword ? "password" : "text"}
            placeholder=" "
            className={cn(
              "peer ring-1 ring-border hover:ring-foreground/50 focus:ring-2 focus:ring-primary rounded-sm h-14 w-full outline-none px-3",
              error && "ring-red-500 focus:ring-red-500 hover:ring-red-500"
            )}
            {...props}
            ref={ref}
          />
          <label
            className={cn(
              "pointer-events-none absolute left-1 transition-all peer-focus:top-0 peer-focus:text-primary peer-focus:text-sm text-sm peer-placeholder-shown:text-base px-2 top-0 peer-placeholder-shown:top-1/2 text-primary peer-placeholder-shown:text-foreground -translate-y-[calc(50%_+_4px)] bg-background-1",
              error && "text-red-500 peer-focus:text-red-500"
            )}
          >
            {label}
          </label>
          {type === "password" && (
            <div
              onClick={() => setIsPassword(!isPassword)}
              role="button"
              className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full group/password size-8 grid place-content-center hover:bg-primary/10"
            >
              {isPassword && (
                <Visibility className="!size-5 text-muted-foreground group-hover/password:text-primary transition-colors" />
              )}
              {!isPassword && (
                <VisibilityOff className="!size-5 text-muted-foreground group-hover/password:text-primary transition-colors" />
              )}
            </div>
          )}
        </div>
        {error && <span className="text-sm text-red-500">{error}</span>}
      </div>
    );
  }
);

FormInput.displayName = "FormInput";

export { FormInput };
