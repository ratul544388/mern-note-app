import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { User } from "../types";

export const useUser = () => {
  const { data: user, isPending } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const { data } = await axios.get("/api/users");
      return data as User;
    },
  });

  return { user, isPending };
};
