import { Close } from "@mui/icons-material";
import { Button, IconButton } from "@mui/material";
import { motion } from "framer-motion";
import { ReactNode, useEffect, useState } from "react";
import { useModalStore } from "../../hooks/use-modal-store";
import { cn } from "../../lib/utils";

interface ModalProps {
  title?: string;
  description?: string;
  className?: string;
  children: ReactNode;
  open: boolean;
  actionLabel?: string;
  onAction?: () => void;
  disabled?: boolean;
}

export const Modal = ({
  title,
  description,
  className,
  children,
  open,
  actionLabel,
  onAction,
  disabled,
}: ModalProps) => {
  const { onClose } = useModalStore();
  const [openModal, setOpenModal] = useState(open);

  const handleClose = () => {
    setOpenModal(false);
    setTimeout(() => {
      onClose();
    }, 100);
  };

  useEffect(() => {
    setOpenModal(open);
  }, [open]);

  return (
    <div
      onClick={handleClose}
      className={cn(
        "fixed inset-0 z-[100] bg-neutral-900/40 items-center justify-center hidden",
        open && "flex"
      )}
    >
      <motion.div
        onClick={(e) => e.stopPropagation()}
        className={cn(
          "relative flex flex-col bg-background-1 rounded-md w-full max-w-[450px] max-h-[100svh] sm:max-h-[80vh] overflow-y-auto px-5 pt-3",
          className
        )}
        variants={{ open: { scale: 1 }, closed: { scale: 0.9 } }}
        animate={openModal ? "open" : "closed"}
      >
        <IconButton onClick={handleClose} className="!absolute right-2 top-2">
          <Close className="!size-5" />
        </IconButton>
        {title && <h1 className="font-medium text-xl">{title}</h1>}
        {description && (
          <p className="text-muted-foreground text-sm">{description}</p>
        )}
        {children}
        {actionLabel && onAction && (
          <div className="flex items-center justify-end sticky py-3 bg-background-1 bottom-0">
            <Button
              onClick={onAction}
              disabled={disabled}
              variant="contained"
              className="w-fit"
            >
              Create
            </Button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
