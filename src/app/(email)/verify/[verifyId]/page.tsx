import VerificationResults from "@/components/verify/VerificationResults";
import { getCurrentUser } from "@/lib/auth";
import { prisma } from "@/lib/db";
import { verificationProcess } from "@/lib/helpers";
import bcrypt from "bcryptjs";
import { redirect } from "next/navigation";

export default async function Verify({
  params,
}: {
  params: { verifyId: string };
}) {
  const { verifyId: verifyId } = await params;

  const verified = await verificationProcess(verifyId);

  return (
    <div>
      <p>Verify Email Process</p>
      <VerificationResults verified={verified} />
    </div>
  );
}
