// src\components\ui\loaders\RouteLoading.tsx
import Image from "next/image";

export function LoadingLogo() {
  return (
    <div className="flex items-center justify-center h-screen">
      <Image
        src="/kordor-logo.svg"
        alt="Loading..."
        width={100}
        height={100}
        className="animate-bounce"
      />
    </div>
  );
}

export function RouteLoading({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-4">
      <LoadingLogo />
      <p className="text-sm text-gray-400">{message}</p>
    </div>
  );
}