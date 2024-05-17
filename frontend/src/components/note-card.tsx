import { DeleteSweep, EditNote, MoreVert } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import React from "react";
import { useModalStore } from "../hooks/use-modal-store";
import { Note } from "../types";

interface NoteProps {
  note: Note;
}

export const NoteCard = ({ note }: NoteProps) => {
  const { onOpen } = useModalStore();
  return (
    <div
      onClick={() => onOpen("noteModal", { note })}
      role="button"
      className="relative flex flex-col p-3 shadow-md rounded-md border"
    >
      <DropdownMenu note={note} />
      <h3 className="font-semibold">{note.title}</h3>
      <p className="text-gray-500 text-sm line-clamp-4 break-words mt-1">
        {note.text}
      </p>
    </div>
  );
};

const DropdownMenu = ({ note }: { note: Note }) => {
  const { onOpen } = useModalStore();
  const queryClient = useQueryClient();

  const { mutateAsync: deleteNote, isPending } = useMutation({
    mutationFn: async () => {
      await axios.delete(`/api/notes/${note._id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"] as InvalidateQueryFilters);
    },
    onError: () => {
      window.alert("Something went wrong");
    },
  });

  const items = [
    {
      icon: EditNote,
      label: "Edit",
      onClick: () => onOpen("noteModal", { note }),
    },
    {
      icon: DeleteSweep,
      label: "Delete",
      onClick: () => deleteNote(),
      disabled: isPending,
    },
  ];

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setAnchorEl(null);
  };

  return (
    <div>
      <IconButton
        className="!absolute right-1 top-1 text-muted-foreground"
        size="small"
        aria-label="more"
        id="long-button"
        aria-controls={open ? "long-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="true"
        onClick={handleClick}
      >
        <MoreVert className="!size-5" />
      </IconButton>
      <Menu
        id="long-menu"
        MenuListProps={{
          "aria-labelledby": "long-button",
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
      >
        {items.map(({ label, icon: Icon, onClick, disabled }) => (
          <MenuItem
            key={label}
            onClick={(event) => {
              onClick();
              handleClose(event);
            }}
            disabled={disabled}
            className="flex items-center gap-2 !text-sm !text-gray-500 min-w-[130px]"
          >
            <Icon className="!size-5" />
            {label}
          </MenuItem>
        ))}
      </Menu>
    </div>
  );
};
