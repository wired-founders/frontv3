// src\app\(dashboard)\home\pages\Company.tsx
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
      onError: () => alert("Error creating company")
    });
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Company Profile</h1>
      <CompanyForm onSubmit={handleSubmit} defaultValues={data} />
    </div>
  );
}