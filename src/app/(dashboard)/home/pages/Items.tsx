// src\app\(dashboard)\home\pages\Items.tsx
"use client";

import { useState } from "react";
import { createItem } from "@/lib/api/onboardApi";

import {
  Input,
  Button,
  Label,
  Textarea,
  Card,
  CardHeader,
  CardTitle,
  CardContent,
} from "@/components/ui";
import { Item } from "@/types/onboard_types";

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [form, setForm] = useState<Omit<Item, "id">>({
    name: "",
    type: "Product",
    price: "",
    category: "",
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => setForm({ ...form, [e.target.name]: e.target.value });

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  try {
    const newItem = await createItem(form);
    setItems([...items, newItem]);
    setForm({
      name: "",
      type: "Product",
      price: "",
      category: "",
      description: "",
    });
  } catch (err) {
    console.error(err);
  }
};


  return (
    <div>
      <h1 className="text-3xl font-bold">Items</h1>
      <p className="mt-4 text-muted-foreground">
        Add your company’s products or services for digital campaigns.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
        <div>
          <Label htmlFor="name">Item Name</Label>
          <Input
            id="name"
            name="name"
            value={form.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <Label htmlFor="type">Type</Label>
          <select
            id="type"
            name="type"
            value={form.type}
            onChange={handleChange}
            className="w-full border rounded-md p-2"
          >
            <option>Product</option>
            <option>Service</option>
          </select>
        </div>
        <div>
          <Label htmlFor="price">Price (optional)</Label>
          <Input
            id="price"
            name="price"
            value={form.price}
            onChange={handleChange}
          />
        </div>
        <div>
          <Label htmlFor="category">Category</Label>
          <Input
            id="category"
            name="category"
            placeholder="e.g., SaaS, Branding, Design"
            value={form.category}
            onChange={handleChange}
          />
        </div>
        <div className="md:col-span-2">
          <Label htmlFor="description">Short Description</Label>
          <Textarea
            id="description"
            name="description"
            placeholder="Describe the product or service briefly..."
            value={form.description}
            onChange={handleChange}
          />
        </div>
        <div className="md:col-span-2">
          <Button type="submit" className="w-full">
            Add Item
          </Button>
        </div>
      </form>

      <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {items.map((item) => (
          <Card key={item.id}>
            <CardHeader>
              <CardTitle>{item.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">{item.type}</p>
              <p className="mt-2 font-semibold">{item.category}</p>
              {item.price && (
                <p className="text-sm mt-1">Price: {item.price}</p>
              )}
              <p className="mt-2 text-sm">{item.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
