// src\app\(dashboard)\home\pages\Company.tsx
import CompanyForm from "@/components/forms/CompanyForm";
import { createCompany, CompanyData } from "@/lib/api/onboardApi";


export default function CompanyPage() {
  const handleSubmit = async (data: CompanyData) => {
    try {
      await createCompany(data);
      alert("Company created!");
    } catch (error) {
      alert("Error creating company");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Company Profile</h1>
      <CompanyForm onSubmit={handleSubmit} />
    </div>
  );
}