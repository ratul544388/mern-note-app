import { cn } from "../lib/utils";
import { Link } from "react-router-dom";

interface LogoProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {}

export const Logo = ({ href = "/", className }: LogoProps) => (
  <Link
    to={href}
    className={cn(
      className,
      "font-bold text-2xl text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-purple-500 to-blue-500"
    )}
  >
    MernNote
  </Link>
);
