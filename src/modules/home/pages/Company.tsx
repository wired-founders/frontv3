// src\modules\home\pages\Company.tsx
/**
 1. Fill CompanyForm -> handleSubmit() -> useCreateCompany() -> createCompany() -> Api backend @returns Company
    - onSuccess setCompany()
 2. Page render -> useCompany() -> if(comapnyId) -> getCompany() -> defaultValues(company data)
 */
"use client";

import CompanyForm from "@/components/forms/CompanyForm";
import { useCompany, useCreateCompany } from "@/hooks/useHome";
import { RouteLoading } from "@/components/ui";
import { CompanyInput } from "@/types/home_types";
import { toast } from "sonner";

export default function CompanyPage() {
  const { data, isLoading, error } = useCompany();
  const createMutation = useCreateCompany();

  if (isLoading) return <RouteLoading message="Loading..." />;
  if (error) return <div>Error loading company</div>;

  const handleSubmit = async (formData: CompanyInput) => {
    createMutation.mutate(formData, {
      onSuccess: () => {
        toast.success("Company created successfully!");
      },
      onError: (error: any) => {
        toast.error(error?.message || "Failed to create company.");
      },
    });
  };

  return (
    <div className="p-4 h-full grid grid-rows-[auto_1fr] overflow-hidden">
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
