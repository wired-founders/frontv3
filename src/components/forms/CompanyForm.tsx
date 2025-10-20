// src\components\forms\CompanyForm.tsx
"use client";

import { useForm } from "react-hook-form";
import { CompanyData } from "@/lib/api/onboardApi";

type CompanyFormProps = {
  onSubmit: (data: CompanyData) => Promise<void>;
};

export default function CompanyForm({ onSubmit }: CompanyFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CompanyData>();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-4">
      <div>
        <label className="block mb-2">Company Name</label>
        <input
          {...register("name", { required: "Company name is required" })}
          className="w-full p-2 border rounded"
        />
        {errors.name && (
          <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-2">Industry</label>
        <input
          {...register("industry")}
          className="w-full p-2 border rounded"
        />
      </div>

      <div>
        <label className="block mb-2">Website</label>
        <input
          {...register("website", {
            pattern: { value: /^https?:\/\/.+/, message: "Invalid URL" },
          })}
          className="w-full p-2 border rounded"
        />
        {errors.website && (
          <p className="text-red-500 text-sm mt-1">{errors.website.message}</p>
        )}
      </div>

      <div>
        <label className="block mb-2">Description</label>
        <textarea
          {...register("description")}
          className="w-full p-2 border rounded h-32"
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="bg-blue-600 text-white px-6 py-2 rounded disabled:opacity-50"
      >
        {isSubmitting ? "Saving..." : "Save"}
      </button>
    </form>
  );
}
