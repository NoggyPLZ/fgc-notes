import {
  Flag,
  Gauge,
  Handshake,
  NotebookPen,
  ThumbsUp,
  TrendingUp,
} from "lucide-react";

export default function FeaturesSection() {
  return (
    <div className="bg-rose-500 p-8">
      <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-10 max-w-[1440px] mx-auto text-center">
        <div className="flex flex-col gap-5 items-center bg-neutral-900 py-15 px-5 rounded-b-md relative outer-clip">
          <div className="clip"></div>
          <Gauge size={100} />
          <h3 className="font-black uppercase text-2xl">Built For Speed</h3>
          <p className="px-15">Text based, so notes load fast.</p>
        </div>
        <div className="flex flex-col gap-5 items-center bg-neutral-900 py-15 px-5 rounded-b-md relative outer-clip">
          <div className="clip"></div>
          <ThumbsUp size={100} />
          <h3 className="font-black uppercase text-2xl">
            Decide what's valueable
          </h3>
          <p className="px-15">
            Upvote or downvote, you decide what falls and what rises.
          </p>
        </div>
        <div className="flex flex-col gap-5 items-center bg-neutral-900 py-15 px-5 rounded-b-md relative outer-clip">
          <div className="clip"></div>
          <NotebookPen size={100} />
          <h3 className="font-black uppercase text-2xl">Keep your own notes</h3>
          <p className="px-15">
            Your notes are yours forever, add or remove at any time.
          </p>
        </div>

        <div className="flex flex-col gap-5 items-center bg-neutral-900 py-15 px-5 rounded-b-md relative outer-clip">
          <div className="clip"></div>
          <TrendingUp size={100} />
          <h3 className="font-black uppercase text-2xl">Level Up your game</h3>
          <p className="px-15">Vigorous note taking helps keep lessons fresh</p>
        </div>
        <div className="flex flex-col gap-5 items-center bg-neutral-900 py-15 px-5 rounded-b-md relative outer-clip">
          <div className="clip"></div>
          <Handshake size={100} />
          <h3 className="font-black uppercase text-2xl">
            Contribute to Others
          </h3>
          <p className="px-15">
            Learn from other's mistakes, and they will from yours.
          </p>
        </div>
        <div className="flex flex-col gap-5 items-center bg-neutral-900 py-15 px-5 rounded-b-md relative outer-clip">
          <div className="clip"></div>
          <Flag size={100} />
          <h3 className="font-black uppercase text-2xl">Make your mark</h3>
          <p className="px-15">
            Credit to notes is always perserved, and you get the credit.
          </p>
        </div>
      </div>
    </div>
  );
}
