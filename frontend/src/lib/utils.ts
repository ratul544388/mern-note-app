import { twMerge } from "tailwind-merge";
import { type ClassValue, clsx } from "clsx";
import axios from "axios";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function fetcher(url: string) {
  const { data } = await axios.get(url);
  return data;
}
