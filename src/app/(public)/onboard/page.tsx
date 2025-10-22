// src\app\(public)\onboard\page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createWorkspace } from "@/lib/api/onboardApi";

export default function OnboardPage() {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [jobRole, setJobRole] = useState("");
  const [useCase, setUseCase] = useState("");
  const [platforms, setPlatforms] = useState<string[]>([]);
  const [workspaceType, setWorkspaceType] = useState("");
  const [emails, setEmails] = useState("");
  const [workspaceName, setWorkspaceName] = useState("");

  const getPlaceholder = () => {
    if (workspaceType === "individual") return "Your Workspace";
    if (workspaceType === "agency") return "Agency Workspace";
    if (workspaceType === "inhouse") return "Company Workspace";
    return "Partner Workspace";
  };

  const togglePlatform = (p: string) => {
    setPlatforms(
      platforms.includes(p)
        ? platforms.filter((x) => x !== p)
        : [...platforms, p]
    );
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    const result = await createWorkspace({
      name: workspaceName,
      workspaceType,
      jobRole,
      useCase,
      platforms,
      inviteEmails: emails
        .split(",")
        .map((e) => e.trim())
        .filter(Boolean),
    });
    if (result) router.push("/home");
    setLoading(false);
  }

  const steps = [
    {
      q: "What's your role?",
      options: [
        "Freelancer",
        "Digital Marketer",
        "Agency Owner",
        "Brand Manager",
        "Content Creator",
        "Social Media Manager",
      ],
      value: jobRole,
      setValue: setJobRole,
    },
    {
      q: "What will you use Kordor for?",
      options: [
        "Social Media Management",
        "Content Planning",
        "Analytics & Reporting",
        "Client Management",
        "All of the above",
      ],
      value: useCase,
      setValue: setUseCase,
    },
    {
      q: "Which platforms?",
      options: [
        "Facebook",
        "Instagram",
        "Twitter",
        "LinkedIn",
        "TikTok",
        "YouTube",
      ],
      multi: true,
    },
    {
      q: "Workspace type?",
      options: [
        { label: "Individual", sub: "Just for me", value: "individual" },
        { label: "In-house", sub: "For my company", value: "in_house" },
        { label: "Agency", sub: "Managing clients", value: "agency" },
        { label: "Partner", sub: "With partners", value: "partner" },
      ],
      value: workspaceType,
      setValue: setWorkspaceType,
    },
  ];

  const currentStep = steps[step - 1];

  return (
    <div className="h-screen flex items-center justify-center ">
      <div className="w-full max-w-md px-6">
        {step <= 4 ? (
          <div className="text-center mb-8">
            <div className="text-sm text-gray-500 mb-4">Step {step} of 6</div>
            <h1 className="text-3xl font-bold mb-2">{currentStep.q}</h1>
          </div>
        ) : step === 5 && workspaceType !== "individual" ? (
          <div className="text-center mb-8">
            <div className="text-sm text-gray-500 mb-4">Step 5 of 6</div>
            <h1 className="text-3xl font-bold mb-2">Invite your team</h1>
            <p className="text-gray-600">
              Add emails separated by commas (optional)
            </p>
          </div>
        ) : (
          <div className="text-center mb-8">
            <div className="text-sm text-gray-500 mb-4">Final Step</div>
            <h1 className="text-3xl font-bold mb-2">Name your workspace</h1>
          </div>
        )}

        {step <= 4 && (
          <div className="space-y-3">
            {currentStep.options.map((opt: any) => {
              const label = typeof opt === "string" ? opt : opt.label;
              const sub = typeof opt === "string" ? null : opt.sub;
              const value =
                typeof opt === "string" ? opt : opt.value || opt.label; // Add this
              const isSelected = currentStep.multi
                ? platforms.includes(label)
                : currentStep.value === value;

              return (
                <button
                  key={label}
                  type="button"
                  onClick={() => {
                    if (!currentStep) return; // narrow currentStep

                    if (currentStep.multi) {
                      togglePlatform(label);
                      return;
                    }

                    if (typeof currentStep.setValue === "function") {
                      currentStep.setValue(value);
                      setTimeout(() => setStep((s) => s + 1), 200);
                    }
                  }}
                  className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                    isSelected
                      ? "border-orange-500 bg-orange-50"
                      : "border-gray-200 hover:border-orange-300"
                  }`}
                >
                  <div className="font-medium">{label}</div>
                  {sub && (
                    <div className="text-sm text-gray-500 mt-1">{sub}</div>
                  )}
                </button>
              );
            })}
            {currentStep.multi && (
              <button
                onClick={() => setStep(step + 1)}
                disabled={platforms.length === 0}
                className="w-full mt-6 py-3 bg-black text-white rounded-xl font-medium disabled:bg-gray-300"
              >
                Continue
              </button>
            )}
          </div>
        )}

        {step === 5 && workspaceType !== "individual" && (
          <div>
            <textarea
              placeholder="email1@example.com, email2@example.com"
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
              className="w-full p-4 border-2 border-gray-200 rounded-xl resize-none h-32 focus:border-orange-500 focus:outline-none"
            />
            <div className="flex gap-3 mt-6">
              <button
                onClick={() => setStep(6)}
                className="flex-1 py-3 border-2 border-gray-200 rounded-xl font-medium"
              >
                Skip
              </button>
              <button
                onClick={() => setStep(6)}
                className="flex-1 py-3 bg-black text-white rounded-xl font-medium"
              >
                Continue
              </button>
            </div>
          </div>
        )}

        {(step === 5 && workspaceType === "individual") || step === 6 ? (
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder={getPlaceholder()}
              value={workspaceName}
              onChange={(e) => setWorkspaceName(e.target.value)}
              required
              className="w-full p-4 border-2 border-gray-200 rounded-xl focus:border-orange-500 focus:outline-none mb-6"
            />
            <button
              type="submit"
              disabled={loading || !workspaceName.trim()}
              className="w-full py-3 bg-black text-white rounded-xl font-medium disabled:bg-gray-300"
            >
              {loading ? "Creating..." : "Create Workspace"}
            </button>
          </form>
        ) : null}

        {step > 1 && step <= 4 && (
          <button
            onClick={() => setStep(step - 1)}
            className="w-full mt-4 text-gray-500 text-sm"
          >
            ← Back
          </button>
        )}
      </div>
    </div>
  );
}
