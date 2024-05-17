import { cn } from "../lib/utils";
import { ReactNode } from "react";

interface ContainerProps {
  element?: "div" | "section" | "header" | "main";
  children: ReactNode;
  className?: string;
}

export const Container = ({
  element: Element = "div",
  children,
  className,
}: ContainerProps) => {
  return (
    <Element
      className={cn(
        "w-full px-5 max-w-screen-xl mx-auto",
        Element === "main" && "min-h-[calc(100vh_-_60px)] pt-5",
        className
      )}
    >
      {children}
    </Element>
  );
};
