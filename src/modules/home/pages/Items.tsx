// src\modules\home\pages\Items.tsx
"use client";

import { useState, useEffect } from "react";
import { createItem } from "@/lib/api/onboardApi";
import { getItems } from "@/lib/api/fetchApi";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import { Item, ItemInput } from "@/types/home_types";
import ItemsModal from "@/components/modals/ItemsModal";

export default function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    (async () => {
      try {
        setError(null);
        setLoading(true);
        const data = await getItems({ signal: controller.signal });
        setItems(Array.isArray(data) ? data : []);
      } catch (err) {
        if ((err as any)?.name !== "AbortError") {
          const msg = err instanceof Error ? err.message : "Failed to load items";
          setError(msg);
          console.error(err);
        }
      } finally {
        setLoading(false);
      }
    })();
    return () => controller.abort();
  }, []);

  const handleCreate = async (values: ItemInput) => {
    setError(null);
    setSubmitting(true);
    try {
      const newItem = await createItem(values);
      setItems((prev) => {
        const byId = new Map(prev.map((i) => [i.id, i]));
        byId.set(newItem.id, newItem);
        return Array.from(byId.values());
      });
      setOpen(false);
      setFormKey((k) => k + 1);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "Failed to create item";
      setError(msg);
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="h-full grid grid-rows-[auto_1fr] overflow-hidden">
      {/* Sub Header */}
      <div className="border-b px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Items</h1>
          <p className="text-sm text-muted-foreground mt-1">Add your products or services for campaigns.</p>
        </div>
        <ItemsModal onCreate={handleCreate} submitting={submitting} error={error} />
      </div>

      {/* Content Section */}
      <div className="overflow-y-auto p-6">
        {loading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="h-40 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <p className="text-sm text-muted-foreground">No items yet.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item) => (
              <Card key={item.id}>
                <CardHeader>
                  <CardTitle>{item.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground capitalize">{item.type}</p>
                  {item.category && <p className="mt-2 font-semibold">{item.category}</p>}
                  {item.price && <p className="text-sm mt-1">Price: {item.price}</p>}
                  {item.description && <p className="mt-2 text-sm">{item.description}</p>}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}