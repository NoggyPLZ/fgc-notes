import Footer from "@/components/footer";
import ToggleLogin from "@/components/forms/ToggleLogin";
import Button from "@/components/ui/Button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <div className="text-center flex flex-col gap-5 justify-center mt-auto mb-auto">
        <h1 className="text-5xl font-bold">Home Page</h1>
        <Link href="/select/">
          <Button style="cancel">Test game select</Button>
        </Link>
        <ToggleLogin />
      </div>
      <Footer />
    </>
  );
}
