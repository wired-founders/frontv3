// src\modules\home\pages\Company.tsx
"use client";

import CompanyForm from "@/components/forms/CompanyForm";
import { useCompany, useCreateCompany } from "@/hooks/useHome";

export default function CompanyPage() {
  const { data, isLoading, error } = useCompany();
  const createMutation = useCreateCompany();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading company</div>;

  const handleSubmit = async (formData: any) => {
    createMutation.mutate(formData, {
      onSuccess: () => alert("Company created!"),
      onError: () => alert("Error creating company"),
    });
  };

  return (
    <div className="h-full grid grid-rows-[auto_1fr] overflow-hidden">
      {/* Sub Header */}
      <div className="border-b px-6 py-4">
        <h1 className="text-2xl font-bold">Company Profile</h1>
      </div>

      {/* Content Section */}
      <div className="overflow-y-auto p-6">
        <CompanyForm onSubmit={handleSubmit} defaultValues={data} />
      </div>
    </div>
  );
}