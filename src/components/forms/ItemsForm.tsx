// src\components\forms\ItemsForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { Input, Button, Label, Textarea } from "@/components/ui";
import { ItemInput } from "@/types/home_types";

// Export so the page can import the type

type Props = {
  onSubmit: (values: ItemInput) => void | Promise<void>;
  submitting?: boolean; // parent controls the button state
};

export default function ItemsForm({ onSubmit, submitting }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ItemInput>({
    defaultValues: {
      name: "",
      type: "product",
      price: "",
      category: "",
      description: "",
    },
    mode: "onSubmit",
  });

  // Normalize and emit up; parent handles API + errors
  const submit = async (values: ItemInput) => {
    const payload: ItemInput = {
      ...values,
      name: values.name.trim(),
      price: values.price?.trim() || "",
      category: values.category?.trim() || "",
      description: values.description?.trim() || "",
    };
    await onSubmit(payload);
    reset(); // only reset if parent didn’t throw
  };

  return (
    <form onSubmit={handleSubmit(submit)} className="mt-6 grid gap-4 md:grid-cols-2">
      <div>
        <Label htmlFor="name">Item Name</Label>
        <Input
          id="name"
          {...register("name", {
            required: "Required",
            validate: (v) => v.trim().length > 0 || "Required",
          })}
        />
        {errors.name && <p className="text-sm text-red-600 mt-1">{errors.name.message}</p>}
      </div>

      <div>
        <Label htmlFor="type">Type</Label>
        <select id="type" className="w-full border rounded-md p-2" {...register("type", { required: true })}>
          <option value="product">Product</option>
          <option value="service">Service</option>
        </select>
      </div>

      <div>
        <Label htmlFor="price">Price (optional)</Label>
        <Input
          id="price"
          {...register("price", {
            validate: (v) => !v || /^[0-9]+(\.[0-9]{1,2})?$/.test(v) || "Use numbers like 19 or 19.99",
          })}
        />
        {errors.price && <p className="text-sm text-red-600 mt-1">{errors.price.message}</p>}
      </div>

      <div>
        <Label htmlFor="category">Category</Label>
        <Input id="category" placeholder="e.g., SaaS, Branding, Design" {...register("category")} />
      </div>

      <div className="md:col-span-2">
        <Label htmlFor="description">Short Description</Label>
        <Textarea
          id="description"
          placeholder="Describe the product or service briefly..."
          {...register("description", {
            maxLength: { value: 280, message: "Keep it under 280 chars" },
          })}
        />
        {errors.description && <p className="text-sm text-red-600 mt-1">{errors.description.message}</p>}
      </div>

      <div className="md:col-span-2">
        <Button type="submit" className="w-full" disabled={submitting}>
          {submitting ? "Adding..." : "Add Item"}
        </Button>
      </div>
    </form>
  );
}
