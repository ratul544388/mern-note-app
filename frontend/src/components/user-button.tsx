import { Logout } from "@mui/icons-material";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { useUser } from "../hooks/use-user";
import { useNavigate } from "react-router-dom";

export const UserButton = () => {
  const { user } = useUser();

  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const navigate = useNavigate();

  const handleClose = () => {
    setOpen(false);
  };

  useOnClickOutside(ref, (e) => {
    if (
      e.target !== triggerRef.current &&
      !triggerRef.current?.contains(e.target as Node)
    ) {
      handleClose();
    }
  });

  const { mutate: logout } = useMutation({
    mutationFn: async () => {
      const { data } = await axios.post("/api/users/logout");
      return data;
    },
    onSuccess: () => {
      window.location.reload();
      navigate("/");
    },
  });

  return (
    <div className="relative">
      <button ref={triggerRef} className="mt-1" onClick={() => setOpen(!open)}>
        <img
          src="/placeholder.jpg"
          alt={user?.name}
          className="object-cover size-8 rounded-full"
        />
      </button>
      <motion.div
        ref={ref}
        variants={{
          open: { scale: 1, pointerEvents: "auto", opacity: 1 },
          closed: { scale: 0.9, pointerEvents: "none", opacity: 0 },
        }}
        animate={open ? "open" : "closed"}
        initial="closed"
        className="absolute right-0 top-[calc(100%_+_5px)] bg-background-1 w-[280px] p-5 rounded-lg shadow-lg border"
      >
        <div className="flex items-center gap-3">
          <img
            src="/placeholder.jpg"
            alt={user?.name}
            className="object-cover size-11 rounded-full drop-shadow-sm"
          />
          <div>
            <h3 className="leading-5">Ratul Hossain</h3>
            <p className="leading-5 text-sm text-muted-foreground">
              ratul@gmail.com
            </p>
          </div>
        </div>
        <button
          onClick={() => {
            logout();
            handleClose();
          }}
          className="text-sm flex items-center gap-3.5 justify-center font-medium text-muted-foreground mt-5 w-full h-10 hover:bg-secondary transition-color rounded-md"
        >
          <Logout className="!size-4" />
          Logout
        </button>
      </motion.div>
    </div>
  );
};
