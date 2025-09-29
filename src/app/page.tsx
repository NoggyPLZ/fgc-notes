import Footer from "@/components/footer";
import ToggleLogin from "@/components/forms/ToggleLogin";
import Header from "@/components/header";
import Button from "@/components/ui/Button";
import ThreeSection from "@/components/ui/landing/ThreeSection";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <div className="bg-gray-100 relative h-[600px] flex justify-center">
        {/* <div className="absolute inset-0 bg-[url(/images/index-ph-cover.webp)] mask-b-from-50% bg-cover"></div> */}
        <div className="absolute md:top-80 top-50 flex lg:flex-row flex-col gap-5 mt-auto mb-auto w-[90%] xl:w-[80%] mx-auto justify-center items-center bg-gray-100 py-10 rounded-2xl xl:min-h-[600px]">
          <div className="lg:basis-7/12 lg:text-left text-center lg:pl-20 ">
            <h2 className="text-2xl lg:text-3xl xl:text-5xl font-black uppercase text-rose-500 px-5">
              An FGC user driven
            </h2>
            <h1 className="text-5xl lg:text-5xl xl:text-8xl font-black uppercase text-rose-500 px-5">
              Living Document
            </h1>
            <p className="px-5 text-xl">
              Using collaboration within the FGC to create a centralized deposit
              of FGC game knowledge.
            </p>
          </div>
          <div className="md:basis-5/12 md:grow w-full lg:border-l-1 lg:border-t-0 border-gray-300 border-t-1">
            <ToggleLogin />
          </div>
        </div>
      </div>
      <ThreeSection />
      <Footer />
    </>
  );
}
