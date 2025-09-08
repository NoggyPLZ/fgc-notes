import NewPass from "@/components/forms/pwreset/NewPass";

export default async function Reset({
  params,
  searchParams,
}: {
  params: Promise<{ resetId: string }>;
  searchParams: Promise<{ user?: string }>;
}) {
  const { resetId: resetId } = await params;
  const { user } = await searchParams;

  if (!user || !resetId) {
    return <p>Missing token or user</p>;
  }
  return (
    <>
      <p>reset password here</p>
      <NewPass resetId={resetId} userId={user} />
    </>
  );
}
