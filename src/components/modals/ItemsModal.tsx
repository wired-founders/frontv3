// src\components\modals\ItemsModal.tsx
"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import ItemsForm from "@/components/forms/ItemsForm";
import { ItemInput } from "@/types/home_types";

type Props = {
  onCreate: (values: ItemInput) => Promise<void>;
  submitting: boolean;
  error?: string | null;
};

export default function ItemsModal({ onCreate, submitting, error }: Props) {
  const [open, setOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const handleSubmit = async (values: ItemInput) => {
    await onCreate(values);
    setOpen(false);
    setFormKey(k => k + 1); // reset form
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">Add Item</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add Item</DialogTitle>
          <DialogDescription>Enter product or service details.</DialogDescription>
        </DialogHeader>
        <ItemsForm key={formKey} onSubmit={handleSubmit} submitting={submitting} />
        {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
      </DialogContent>
    </Dialog>
  );
}
