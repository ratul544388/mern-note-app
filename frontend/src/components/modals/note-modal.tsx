import { zodResolver } from "@hookform/resolvers/zod";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios from "axios";
import * as React from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useModalStore } from "../../hooks/use-modal-store";
import { NoteSchema } from "../../validations";
import RichTextEditor from "../rich-text-editor";
import { Modal } from "./modal";

export default function NoteModal() {
  const queryClient = useQueryClient();
  const { isOpen, type, onClose, data } = useModalStore();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    getValues,
    formState: { isValid },
  } = useForm<z.infer<typeof NoteSchema>>({
    resolver: zodResolver(NoteSchema),
    defaultValues: {
      text: "",
      title: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NoteSchema>) => {
    console.log(values);
    mutateAsync(values);
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (values: z.infer<typeof NoteSchema>) => {
      const url = note ? `/api/notes/${note._id}` : "/api/notes";
      const method = note ? "patch" : "post";
      const { data } = await axios.request({
        method,
        url,
        data: { ...values },
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["notes"] as InvalidateQueryFilters);
      onClose();
      reset();
    },
    onError: () => {
      window.alert("Something went wrong");
    },
  });

  const note = data.note;

  React.useEffect(() => {
    if (note) {
      const { title, text } = note;
      setValue("title", title);
      setValue("text", text, { shouldValidate: true });
    } else {
      reset();
    }
  }, [note, setValue, reset]);

  const title = "Create a note";
  const actionLabel = "Create";

  return (
    <Modal
      open={isOpen && type === "noteModal"}
      title={title}
      actionLabel={actionLabel}
      onAction={handleSubmit(onSubmit)}
      disabled={!isValid || isPending}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="w-full">
        <input
          {...register("title")}
          placeholder="Title"
          className="w-[calc(100%_-_40px)] outline-none border-b border-muted-foreground h-10"
          disabled={isPending}
        />
        <RichTextEditor
          value={getValues("text")}
          onChange={(value) => setValue("text", value)}
        />
      </form>
    </Modal>
  );
}
