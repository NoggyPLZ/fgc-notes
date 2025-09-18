"use client";

import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function CharacterSelectCard({
  character,
  game,
}: {
  character: any;
  game: any;
}) {
  return (
    <div key={character.id} className="relative">
      <Link href={`/select/${game.slug}/${character.slug}`}>
        <Image
          src={`/character-icons/${character.name.toLocaleLowerCase()}-sml.webp`}
          width={200}
          height={200}
          alt={`Character portraite for ${character.name} that links to the page for ${character.name}`}
        />
        <h4 className="absolute bottom-0 text-2xl font-black bg-gray-800 hover:bg-rose-500 px-2">
          {character.name}
        </h4>
      </Link>
    </div>
  );
}
