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
import { SignupSchema } from "../../validations";
import { FormError } from "../form-error";
import { FormInput } from "../form-input";
import { LoadingButton } from "../loading-button";
import { Modal } from "./modal";
import { useNavigate } from "react-router-dom";

export default function SignupModal() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { isOpen, type, onClose, onOpen } = useModalStore();
  const [error, setError] = useState<string | undefined>("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<z.infer<typeof SignupSchema>>({
    resolver: zodResolver(SignupSchema),
  });

  const onSubmit = (values: z.infer<typeof SignupSchema>) => {
    mutateAsync(values);
  };

  const { mutateAsync, isPending } = useMutation({
    mutationFn: async (values: z.infer<typeof SignupSchema>) => {
      const { data } = await axios.post("/api/users/signup", values);
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["user"] as InvalidateQueryFilters);
      navigate("/notes");
      onClose();
      reset();
    },
    onError: (error: AxiosError<{ error: string }>) => {
      setError(error?.response?.data.error);
    },
  });

  const open = isOpen && type === "signupModal";

  return (
    <Modal open={open} title="Sign up">
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
        <FormInput
          error={errors.name?.message}
          disabled={isPending}
          label="Name"
          {...register("name")}
        />
        <FormInput
          error={errors.email?.message}
          disabled={isPending}
          label="Email"
          {...register("email")}
        />
        <FormInput
          disabled={isPending}
          error={errors.password?.message}
          {...register("password")}
          label="Password"
          type="password"
        />
        <FormInput
          disabled={isPending}
          {...register("confirmPassword")}
          error={errors.confirmPassword?.message}
          label="Confirm Password"
          type="password"
        />
        <FormError error={error} />
        <LoadingButton isLoading={isPending}>Signup</LoadingButton>
        <button
          type="button"
          onClick={() => onOpen("loginModal")}
          className="hover:underline hover:text-primary transition-colors mx-auto text-sm font-medium text-muted-foreground"
        >
          Already have an account?
        </button>
      </form>
    </Modal>
  );
}
