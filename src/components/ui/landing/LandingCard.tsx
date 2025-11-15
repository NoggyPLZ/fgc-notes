export default function LandingCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-5 rounded-2xl bg-neutral-950 text-white basis-1/3 xl:p-10">
      {children}
    </div>
  );
}
