import { Button } from "@mui/material";
import React from "react";
import { cn } from "../lib/utils";

interface LoadingButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  isLoading?: boolean;
}

export const LoadingButton = ({
  className,
  disabled,
  isLoading,
  children,
  onClick,
}: LoadingButtonProps) => {
  return (
    <Button
      disabled={disabled}
      onClick={onClick}
      type="submit"
      variant="contained"
      className={cn(isLoading && "pointer-events-none opacity-60", className)}
    >
      {isLoading && "Loading..."}
      {!isLoading && children}
    </Button>
  );
};
