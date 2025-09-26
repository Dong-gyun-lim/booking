"use client";

import * as React from "react";
import { Toast } from "./toast";

export interface ToastMessage {
  id: number;
  title?: string;
  description?: string;
  variant?: "default" | "destructive";
}

let listeners: Array<(toast: ToastMessage) => void> = [];
let count = 0;

export function addToast(toast: Omit<ToastMessage, "id">) {
  const id = ++count;
  listeners.forEach((l) => l({ id, ...toast }));
}

export function Toaster() {
  const [toasts, setToasts] = React.useState<ToastMessage[]>([]);

  React.useEffect(() => {
    const listener = (toast: ToastMessage) => {
      setToasts((prev) => [...prev, toast]);
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== toast.id));
      }, 3000);
    };
    listeners.push(listener);
    return () => {
      listeners = listeners.filter((l) => l !== listener);
    };
  }, []);

  return (
    <div className="fixed bottom-4 right-4 flex flex-col gap-2">
      {toasts.map(({ id, title, description, variant }) => (
        <Toast
          key={id}
          title={title}
          description={description}
          variant={variant}
        />
      ))}
    </div>
  );
}
