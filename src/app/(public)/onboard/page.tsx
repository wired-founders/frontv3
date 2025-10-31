// src\app\(public)\onboard\page.tsx
"use client";

import { useForm } from "react-hook-form";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { createWorkspace } from "@/lib/api/onboardApi";
import { FormData } from "@/app/(public)/onboard/onboard_types";
import { ROLES, USE_CASES, PLATFORMS, WORKSPACE_TYPES } from "@/constants/onboarding";

export default function OnboardPage() {
  const [step, setStep] = useState(1);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      jobRole: [],
      useCase: [],
      platforms: [],
      workspaceType: "",
      emails: "",
      workspaceName: "",
    },
  });

  const formData = watch();

  const toggleArray = (field: "jobRole" | "useCase" | "platforms", value: string) => {
    const current = formData[field] || [];
    setValue(field, current.includes(value) ? current.filter((v) => v !== value) : [...current, value]);
  };

  const onNext = () => {
    if (step < 6) setStep(step + 1);
  };

  const onBack = () => {
    if (step > 1) setStep(step - 1);
  };

  const onSubmit = async (data: FormData) => {
    const result = await createWorkspace({
      name: data.workspaceName,
      workspaceType: data.workspaceType,
      jobRole: data.jobRole[0] || "",
      useCase: data.useCase[0] || "",
      platforms: data.platforms,
      inviteEmails: data.emails
        .split(",")
        .map((e) => e.trim())
        .filter(Boolean),
    });
    if (result) router.push("/home");
  };

  const progress = (step / 6) * 100;

  const canProceed =
    (step === 1 && formData.jobRole?.length) ||
    (step === 2 && formData.useCase?.length) ||
    (step === 3 && formData.platforms?.length) ||
    (step === 4 && formData.workspaceType) ||
    step === 5 ||
    (step === 6 && formData.workspaceName?.trim());

  const getPlaceholder = () => {
    if (formData.workspaceType === "individual") return "Your Workspace";
    if (formData.workspaceType === "in_house") return "Company Workspace";
    return "Partner Workspace";
  };

  const showEmailStep = step === 5 && formData.workspaceType !== "individual";

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Progress Bar */}
      <div className="h-1 bg-gray-200">
        <div className="h-full bg-indigo-600 transition-all" style={{ width: `${progress}%` }}></div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex items-center justify-center px-6 py-8 overflow-auto">
        <div className="w-full max-w-3xl">
          {/* Step 1: Role */}
          {step === 1 && (
            <>
              <h1 className="text-4xl font-bold text-center mb-12">What's your role?</h1>
              <div className="flex flex-wrap gap-3 justify-center">
                {ROLES.map((role) => (
                  <button
                    key={role}
                    type="button"
                    onClick={() => toggleArray("jobRole", role)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      formData.jobRole?.includes(role)
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-gray-700 border border-gray-300 hover:border-indigo-300"
                    }`}
                  >
                    {role}
                  </button>
                ))}
              </div>
              <p className="text-center text-gray-500 text-sm mt-8">
                Don't worry, you can always add more in the future.
              </p>
            </>
          )}

          {/* Step 2: Use Case */}
          {step === 2 && (
            <>
              <h1 className="text-4xl font-bold text-center mb-12">What will you use Kordor for?</h1>
              <div className="flex flex-wrap gap-3 justify-center">
                {USE_CASES.map((useCase) => (
                  <button
                    key={useCase}
                    type="button"
                    onClick={() => toggleArray("useCase", useCase)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      formData.useCase?.includes(useCase)
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-gray-700 border border-gray-300 hover:border-indigo-300"
                    }`}
                  >
                    {useCase}
                  </button>
                ))}
              </div>
              <p className="text-center text-gray-500 text-sm mt-8">
                Don't worry, you can always add more in the future.
              </p>
            </>
          )}

          {/* Step 3: Platforms */}
          {step === 3 && (
            <>
              <h1 className="text-4xl font-bold text-center mb-12">Which platforms?</h1>
              <div className="flex flex-wrap gap-3 justify-center">
                {PLATFORMS.map((platform) => (
                  <button
                    key={platform}
                    type="button"
                    onClick={() => toggleArray("platforms", platform)}
                    className={`px-6 py-3 rounded-lg font-medium transition-all ${
                      formData.platforms?.includes(platform)
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-gray-700 border border-gray-300 hover:border-indigo-300"
                    }`}
                  >
                    {platform}
                  </button>
                ))}
              </div>
              <p className="text-center text-gray-500 text-sm mt-8">
                Don't worry, you can always add more in the future.
              </p>
            </>
          )}

          {/* Step 4: Workspace Type */}
          {step === 4 && (
            <>
              <h1 className="text-4xl font-bold text-center mb-10">Workspace type?</h1>
              <div className="flex flex-col gap-3 max-w-md mx-auto">
                {WORKSPACE_TYPES.map((type) => (
                  <button
                    key={type.value}
                    type="button"
                    onClick={() => setValue("workspaceType", type.value)}
                    className={`p-4 rounded-lg text-left transition-all ${
                      formData.workspaceType === type.value
                        ? "bg-indigo-600 text-white border-2 border-indigo-600"
                        : "bg-white text-gray-700 border-2 border-gray-300 hover:border-indigo-300"
                    }`}
                  >
                    <div className="font-semibold">{type.label}</div>
                    <div
                      className={`text-sm mt-1 ${formData.workspaceType === type.value ? "text-indigo-100" : "text-gray-500"}`}
                    >
                      {type.sub}
                    </div>
                  </button>
                ))}
              </div>
            </>
          )}

          {/* Step 5: Invite Team (only for non-individual) */}
          {step === 5 && showEmailStep && (
            <>
              <h1 className="text-4xl font-bold text-center mb-4">Invite your team</h1>
              <p className="text-center text-gray-600 mb-8">Add emails separated by commas (optional)</p>
              <div className="max-w-md mx-auto">
                <textarea
                  {...register("emails")}
                  placeholder="email1@example.com, email2@example.com"
                  className="w-full p-4 border-2 border-gray-300 rounded-lg resize-none h-32 focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </>
          )}

          {/* Step 6: Workspace Name (or Step 5 for individual) */}
          {((step === 5 && !showEmailStep) || step === 6) && (
            <>
              <h1 className="text-4xl font-bold text-center mb-4">Name your workspace</h1>
              <p className="text-center text-gray-600 mb-8">Choose a name that represents your workspace</p>
              <div className="max-w-md mx-auto">
                <input
                  {...register("workspaceName", { required: true })}
                  type="text"
                  placeholder={getPlaceholder()}
                  className="w-full p-4 border-2 border-gray-300 rounded-lg focus:border-indigo-500 focus:outline-none"
                />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Footer */}
      <div className="border-t bg-white px-6 py-4">
        <div className="max-w-3xl mx-auto flex justify-between items-center">
          <button
            type="button"
            onClick={onBack}
            disabled={step === 1}
            className="px-6 py-2 text-gray-600 hover:text-gray-900 flex items-center gap-2 disabled:opacity-30"
          >
            <span>←</span> Back
          </button>

          <div className="flex gap-3">
            {/* Skip button only on email step */}
            {showEmailStep && (
              <button onClick={onNext} className="px-6 py-3 text-gray-600 hover:text-gray-900 font-medium">
                Skip
              </button>
            )}

            {/* Main action button */}
            {(step === 5 && !showEmailStep) || step === 6 ? (
              <button
                onClick={handleSubmit(onSubmit)}
                disabled={!canProceed || isSubmitting}
                className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium disabled:bg-gray-300 hover:bg-indigo-700 transition-all"
              >
                {isSubmitting ? "Creating..." : "Create Workspace"}
              </button>
            ) : (
              <button
                onClick={onNext}
                disabled={!canProceed}
                className="px-8 py-3 bg-indigo-600 text-white rounded-lg font-medium disabled:bg-gray-300 hover:bg-indigo-700 transition-all flex items-center gap-2"
              >
                Next <span>→</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
