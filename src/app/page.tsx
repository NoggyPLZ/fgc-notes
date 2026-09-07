import Footer from "@/components/footer";
import ToggleLogin from "@/components/forms/ToggleLogin";
import Header from "@/components/header";
import FeaturesSection from "@/components/ui/landing/FeaturesSection";
import NewsIndex from "@/components/ui/landing/NewsIndex";
import NotesIndex from "@/components/ui/landing/NotesIndex";
import ScrollToTop from "@/components/ui/landing/ScrollToTop";
import ThreeSection from "@/components/ui/landing/ThreeSection";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Header />
      <div className="bg-gray-100 relative md:h-[700px] h-[800px] flex justify-center">
        <div className="absolute md:top-50 top-20 flex xl:flex-row flex-col gap-5 mt-auto mb-auto w-[90%] xl:w-[80%] mx-auto justify-center items-center py-10 rounded-2xl xl:min-h-[600px]">
          <div className="lg:basis-7/12 xl:text-left text-center">
            <h2 className="text-2xl lg:text-3xl xl:text-5xl font-black uppercase xl:leading-10 xl:pl-3 text-rose-500 ">
              An FGC user driven
            </h2>
            <h1 className="text-6xl lg:text-5xl xl:text-9xl 2xl:text-[170px] xl:leading-25 2xl:leading-35 font-black uppercase text-neutral-900 ">
              Living Document
            </h1>
            <p className="xl:pl-2 text-2xl text-neutral-900 pt-5 font-semibold">
              Using collaboration within the FGC to create a centralized deposit
              of FGC game knowledge.
            </p>
          </div>
          <div className="md:basis-5/12 md:grow w-full z-10">
            <ToggleLogin />
          </div>
        </div>
      </div>
      <div className="relative md:h-[500px] h-[300px] w-full z-0">
        <Image
          src="/landing/landing-banner.gif"
          alt="landing banner image"
          fill
          sizes="100vw"
          className="object-cover object-top"
        />
      </div>
      <div className="pinstripe dark-bg relative p-4 flex flex-col gap-5 lg:gap-15">
        <NewsIndex />
        <div className="flex flex-col lg:flex-row max-w-[1440px] mx-auto gap-5 lg:order-1 order-2">
          <div className="lg:basis-2/6 flex flex-col gap-4 p-4">
            <h2 className="text-5xl md:text-6xl text-white font-black">
              Sign Up To View More
            </h2>
            <p>
              This is only a preview of the wealth of knowledge inside. In order
              to ensure the organic exhange of ideas happens, we need
              contributors, that's where you come in. Sign up and be a part of
              the story of the Fighting Game Community.
            </p>
            <ScrollToTop />
          </div>
          <div className="lg:basis-4/6">
            <NotesIndex />
          </div>
        </div>
      </div>
      <FeaturesSection />
      {/* <ThreeSection /> */}
      <Footer />
    </>
  );
}
