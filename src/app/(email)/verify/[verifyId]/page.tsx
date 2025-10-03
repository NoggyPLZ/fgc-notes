import VerificationResults from "@/components/verify/VerificationResults";
import { verificationProcess } from "@/lib/helpers";

export default async function Verify({
  params,
}: {
  params: Promise<{ verifyId: string }>;
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
