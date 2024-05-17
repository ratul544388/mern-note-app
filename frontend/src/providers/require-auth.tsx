import { Navigate, Outlet } from "react-router-dom";
import { useUser } from "../hooks/use-user";

export const RequireAuth = () => {
  const { user, isPending } = useUser();

  if (isPending) return null;

  return user ? <Outlet /> : <Navigate to="/" />;
};
