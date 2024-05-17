import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Container } from "../components/container";
import { EmptyState } from "../components/empty-state";
import { NoteCard } from "../components/note-card";
import { NotesSkeleton } from "../components/skeletons/notes-skeleton";
import { useModalStore } from "../hooks/use-modal-store";
import { Note as NoteType } from "../types";

export const Notes = () => {
  const { onOpen } = useModalStore();
  const fetchNotes = async (): Promise<NoteType[]> => {
    const { data } = await axios.get("/api/notes");
    return data as NoteType[];
  };

  const { data: notes, isPending } = useQuery({
    queryKey: ["notes"],
    queryFn: () => {
      const data = fetchNotes();
      return data;
    },
  });

  return (
    <Container element="main">
      {isPending && <NotesSkeleton />}
      {notes?.length === 0 && (
        <EmptyState
          title="Your notes are empty"
          description="Oops! Looks like you haven't added any notes yet click Add button to add some notes"
          actionLabel="Add a Note"
          onAction={() => onOpen("noteModal")}
        />
      )}
      <ul className="grid gap-5 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
        {notes?.map((note) => (
          <NoteCard key={note._id} note={note} />
        ))}
      </ul>
    </Container>
  );
};
