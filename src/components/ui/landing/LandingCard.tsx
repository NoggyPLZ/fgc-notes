export default function LandingCard({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="p-5 rounded-md bg-rose-500 text-white basis-1/3">
      {children}
    </div>
  );
}
