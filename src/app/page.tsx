import Footer from "@/components/footer";
import ToggleLogin from "@/components/forms/ToggleLogin";
import Header from "@/components/header";
import Button from "@/components/ui/Button";
import ThreeSection from "@/components/ui/landing/ThreeSection";
import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <Header />
      <div className="bg-gray-100 relative h-[700px] flex justify-center">
        {/* <div className="absolute inset-0 bg-[url(/images/index-ph-cover.webp)] mask-b-from-50% bg-cover"></div> */}
        <div className="absolute md:top-50 top-50 flex xl:flex-row flex-col gap-5 mt-auto mb-auto w-[90%] xl:w-[80%] mx-auto justify-center items-center py-10 rounded-2xl xl:min-h-[600px]">
          <div className="lg:basis-7/12 xl:text-left text-center">
            <h2 className="text-2xl lg:text-3xl xl:text-5xl font-black uppercase xl:leading-10 xl:pl-3 text-rose-500 ">
              An FGC user driven
            </h2>
            <h1 className="text-5xl lg:text-5xl xl:text-[180px] xl:leading-35 font-black uppercase text-neutral-900 ">
              Living Document
            </h1>
            <p className="xl:pl-2 text-2xl text-neutral-900 pt-5 font-semibold">
              Using collaboration within the FGC to create a centralized deposit
              of FGC game knowledge.
            </p>
          </div>
          <div className="md:basis-5/12 md:grow w-full">
            <ToggleLogin />
          </div>
        </div>
      </div>
      <div className="bg-[url(/landing/landing-banner.gif)] bg-cover md:h-[700px] h-[500px] bg-top"></div>
      <ThreeSection />
      <Footer />
    </>
  );
}
