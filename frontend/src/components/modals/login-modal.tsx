import { zodResolver } from "@hookform/resolvers/zod";
import {
  InvalidateQueryFilters,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useModalStore } from "../../hooks/use-modal-store";
import { LoginSchema } from "../../validations";
import { FormError } from "../form-error";
import { FormInput } from "../form-input";
import { LoadingButton } from "../loading-button";
import { Modal } from "./modal";
import { useNavigate } from "react-router-dom";

export default function LoginModal() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isOpen, type, onClose, onOpen } = useModalStore();
  const [error, setError] = useState<string | undefined>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    mutateAsync(values);
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (values: z.infer<typeof LoginSchema>) => {
      const { data } = await axios.post("/api/users/login", values);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user"] as InvalidateQueryFilters);
      navigate("/notes");
      onClose();
      reset();
    },
    onError: (error: AxiosError<{ error: string }>) => {
      setError(error.response?.data.error);
    },
  });

  const open = isOpen && type === "loginModal";

  return (
    <Modal open={open} title="Login">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <FormInput
          label="Email"
          error={errors.email?.message}
          {...register("email")}
          disabled={isPending}
        />
        <FormInput
          {...register("password")}
          label="Password"
          type="password"
          error={errors.password?.message}
          disabled={isPending}
        />
        <FormError error={error} />
        <LoadingButton isLoading={isPending}>Login</LoadingButton>
        <button
          type="button"
          onClick={() => onOpen("signupModal")}
          className="hover:underline hover:text-primary transition-colors mx-auto text-sm font-medium text-muted-foreground"
        >
          Do not have an account?
        </button>
      </form>
    </Modal>
  );
}
