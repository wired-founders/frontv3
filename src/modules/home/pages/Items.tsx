// src\modules\home\pages\Items.tsx
"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui";
import ItemsModal from "@/components/modals/ItemsModal";
import type { Item, ItemInput } from "@/types/home_types";
import { useItems, useCreateItem } from "@/hooks/useHome";

export default function ItemsPage() {
  const [open, setOpen] = useState(false);

  const {
    data: items = [],
    isLoading,
    isError,
    error,
  } = useItems();

  const { mutateAsync: createItem, isPending: submitting } = useCreateItem();

  const handleCreate = async (values: ItemInput) => {
    await createItem(values);    // invalidates ["items"] inside the hook
    setOpen(false);
  };

  return (
    <div className="h-full grid grid-rows-[auto_1fr] overflow-hidden">
      {/* Sub Header */}
      <div className="border-b px-6 py-4 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Items</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Add your products or services for campaigns.
          </p>
        </div>
        <ItemsModal
          open={open}
          onOpenChange={setOpen}
          onCreate={handleCreate}
          submitting={submitting}
          error={isError ? (error as Error)?.message ?? "Failed to load items" : null}
          key={open ? "modal-open" : "modal-closed"} // optional: forces clean form when reopened
        />
      </div>

      {/* Content Section */}
      <div className="overflow-y-auto p-6">
        {isLoading ? (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-40 animate-pulse rounded-xl bg-muted" />
            ))}
          </div>
        ) : items.length === 0 ? (
          <p className="text-sm text-muted-foreground">No items yet.</p>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {items.map((item: Item) => (
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
