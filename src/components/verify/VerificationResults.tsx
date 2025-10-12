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
    <div className="max-w-[500px] flex flex-col items-center mx-auto rounded-2xl p-10 dark:bg-gray-800 bg-gray-200 shadow-md/10">
      <div>
        {verified.success ? (
          <div className="text-center flex-col flex gap-5">
            <h1 className="text-8xl font-black uppercase text-rose-500">
              Success
            </h1>
            <h2 className="text-xl font-bold">{verified.message}</h2>
            <p className="animate-pulse italic text-lg">Redirecting...</p>
          </div>
        ) : (
          <div className="text-center flex-col flex gap-5">
            <h1 className="text-8xl font-black uppercase text-rose-500">
              Failed
            </h1>
            <h2 className="text-xl font-bold">{verified.message}</h2>
          </div>
        )}
      </div>
    </div>
  );
}
