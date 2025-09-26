import { addToast } from "./toaster";

export function toast(opts: {
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
}) {
  addToast(opts);
}
