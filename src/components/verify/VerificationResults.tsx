"use client";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function VerificationResults({
  verified,
}: {
  verified: { success: boolean; message: string };
}) {
  const router = useRouter();

  useEffect(() => {
    if (verified.success) {
      const timer = setTimeout(() => {
        router.push("/");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [verified.success, router]);
  return (
    <div className="w-[500px] flex flex-col self-center p-10 border-1 border-gray-500">
      <div>
        {verified.success ? (
          <div>
            <h1>Success</h1>
            <p>{verified.message}. Redirecting...</p>
          </div>
        ) : (
          <div>
            <h1>Failed</h1>
            <p>{verified.message}</p>
          </div>
        )}
      </div>
    </div>
  );
}
