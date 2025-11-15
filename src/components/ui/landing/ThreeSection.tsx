import { FileChartColumnIncreasing, NotebookPen, ThumbsUp } from "lucide-react";
import LandingCard from "./LandingCard";

export default function ThreeSection() {
  return (
    <div className="bg-rose-500">
      <div className="flex flex-col xl:w-[80%] w-[90%] mx-auto py-10">
        <div className="flex lg:flex-row flex-col justify-between xl:gap-10 gap-5 ">
          <LandingCard>
            <NotebookPen size={220} className="mx-auto py-10" />
            <h1 className="font-black text-2xl xl:text-3xl uppercase text-cyan-500 pb-5">
              Keep Your Own Notes
            </h1>
            <p className="text-lg">
              Remember that tech you developed? Or, do you remember that
              solution you found to that annoying situation in neutral? How
              about that new setup you haven&apos;t quite got down yet, well
              panic no more. TechTrap lets users create a set of organized notes
              about a character you&apos;re interested in.
            </p>
          </LandingCard>
          <LandingCard>
            <ThumbsUp size={220} className="mx-auto py-10" />
            <h1 className="font-black text-2xl xl:text-3xl uppercase text-cyan-500 pb-5">
              Contribute to Others
            </h1>
            <p className="text-lg">
              Ever have that problem in your fighting game you just
              couldn&apos;t figure out? You search Google but the search engine
              is borderline useless at finding the answer? When you or others
              write a note, they&apos;re not just working to improve their own
              library of tech. TechTrap shares your notes with others letting
              everyone see possible solutions to a common problem or situation.
            </p>
          </LandingCard>
          <LandingCard>
            <FileChartColumnIncreasing size={220} className="mx-auto py-10" />
            <h1 className="font-black text-2xl xl:text-3xl uppercase text-cyan-500 pb-5">
              FGC&apos;s Living Document
            </h1>
            <p className="text-lg">
              Instead of having to type or write out other peoples notes,
              TechTrap lets your copy a note with the a simple upvote, or remove
              an outdated one with a downvote. Any note you upvote is instantly
              added to your own notes. As a note author you can see your
              contribution on the rating of your note, and your note is always
              credited to the original author so people get credit.
            </p>
          </LandingCard>
        </div>
      </div>
    </div>
  );
}
