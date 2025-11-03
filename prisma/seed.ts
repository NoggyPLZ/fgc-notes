import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const sfCharacters = [
  {
    slug: "ryu-sf6",
    name: "ryu",
    story:
      "Ever training, this martial artist seeks true strength. Well-mannered and sincere, Ryu travels the globe in search of worthy opponents. Having overcome the Satsui no Hado, he now seeks yet greater heights.",
    avatarUrl: "ryu",
  },
  {
    slug: "luke-sf6",
    name: "luke",
    story:
      "A contractor for a PMC, Luke uses his elite military background to teach mixed martial arts. His days off are spent eating junk food, playing video games, and fighting, but make no mistake—Luke plays to win.",
    avatarUrl: "luke",
  },
  {
    slug: "jamie-sf6",
    name: "jamie",
    story:
      "This self-styled Chinatown peacekeeper aspires to the example set by Yun and Yang, the Twin Dragons. An expert dancer, Jamie places justice and friendship above all else, defending his town with martial skill.",
    avatarUrl: "jamie",
  },
  {
    slug: "chun-sf6",
    name: "chun-li",
    story:
      "A former high-kicking ICPO agent, Chun-Li looks after Li-Fen, a victim of the Black Moon Incident. With Shadaloo sundered, she now runs kung fu classes, and has become a well-loved member of the local community.",
    avatarUrl: "chun-li",
  },
  {
    slug: "guile-sf6",
    name: "guile",
    story:
      "A US Air Force pilot who fights for his country, Guile succeeded in dismantling Shadaloo and avenging his friend Charlie. He enjoys living the family man life, but new battlefields await him.",
    avatarUrl: "guile",
  },
  {
    slug: "kimberly-sf6",
    name: "kimberly",
    story:
      "Uninvited student to Guy, the 39th successor to Bushinryu. Kimberly had an ordinary upbringing, but she's a genuine prodigy who graduated college early...and now wants to be a ninja. Loves '80s pop culture.",
    avatarUrl: "kim",
  },
  {
    slug: "juri-sf6",
    name: "juri",
    story:
      "This sadistic thrillseeker enjoys the strife and suffering of others, taking immense joy in obliterating her foes. Without revenge against M. Bison as a motivator, she whiles away her time in a gloomy haze.",
    avatarUrl: "juri",
  },
  {
    slug: "ken-sf6",
    name: "ken",
    story:
      "Former US National Fighting Champ, and ex-VP of the Masters Foundation. Accusations of orchestrating a criminal plot have forced Ken to abandon his family and business and go into hiding.",
    avatarUrl: "ken",
  },
  {
    slug: "blanka-sf6",
    name: "blanka",
    story:
      "A kindhearted defender of nature, Blanka has become an adventure tour guide, confident his intimate knowledge of the jungle will serve as a springboard to fame—and a comfortable life for his beloved mother.",
    avatarUrl: "blanka",
  },
  {
    slug: "dhalsim-sf6",
    name: "dhalsim",
    story:
      "A kindhearted defender of nature, Blanka has become an adventure tour guide, confident his intimate knowledge of the jungle will serve as a springboard to fame—and a comfortable life for his beloved mother.",
    avatarUrl: "dhalsim",
  },
  {
    slug: "honda-sf6",
    name: "e. honda",
    story:
      "A kindhearted defender of nature, Blanka has become an adventure tour guide, confident his intimate knowledge of the jungle will serve as a springboard to fame—and a comfortable life for his beloved mother.",
    avatarUrl: "honda",
  },
  {
    slug: "deejay-sf6",
    name: "deejay",
    story:
      "A globally popular dance music superstar, Dee Jay is always ready to have a good time. With a burning love for music and fighting, this Jamaican sensation drives audiences wild with hot new songs and stylish moves.",
    avatarUrl: "deejay",
  },
  {
    slug: "manon-sf6",
    name: "manon",
    story:
      "A super model and world champion judoka, Manon is an idealist, forever seeking self-improvement in the pursuit of beauty. She struts the catwalk of street fighting to become the world's strongest model.",
    avatarUrl: "manon",
  },
  {
    slug: "marisa-sf6",
    name: "marisa",
    story:
      "An up-and-coming jewelry designer from Italy who claims ancestry to ancient Greek warriors. As a child, she was inspired by a vision of the Colosseum in its prime. Today, she seeks glory with a smile—and an eye for beauty.",
    avatarUrl: "marisa",
  },
  {
    slug: "jp-sf6",
    name: "jp",
    story:
      "Head of an international NGO responsible for many successful investment projects, and the man behind Nayshall's present prosperity. Has a beloved cat named Cybele.",
    avatarUrl: "jp",
  },
  {
    slug: "zangief-sf6",
    name: "zangief",
    story:
      "A colossal wrestler nicknamed the Red Cyclone. Zangief is dedicated to physical improvement and instructing his students.",
    avatarUrl: "zangief",
  },
  {
    slug: "lily-sf6",
    name: "lily",
    story:
      "A descendant of the Thunderfoot tribe, Lily speaks with the spirits of nature, trusting in their guidance as she travels the globe. Don't judge a book by its cover—her small stature conceals truly titanic power.",
    avatarUrl: "lily",
  },
  {
    slug: "cammy-sf6",
    name: "cammy",
    story:
      "Member of British special forces unit Delta Red. Distinguished herself in the operation against Shadaloo, with which she shares a fated connection. Hyper-competent but somewhat moody. Currently working at HQ.",
    avatarUrl: "cammy",
  },
  {
    slug: "rashid-sf6",
    name: "rashid",
    story:
      '"The Souring Eagle of the Desert" that fights using parkour. With the wind as his ally, he outfoxes opponents with his high mobility. Born into nobility, he&apos;s a carefree but earnest man. Loves video streaming.',
    avatarUrl: "rashid",
  },
  {
    slug: "aki-sf6",
    name: "a.k.i.",
    story:
      "A poison-wielding apprentice of F.A.N.G, the former Shadaloo officer. Enchanted by the power of toxins, nothing brings her more joy than testing them on a new target—other than attention from her “master,” that is.",
    avatarUrl: "aki",
  },
  {
    slug: "ed-sf6",
    name: "ed",
    story:
      "A Psycho Power-wielding youth aged up rapidly by Shadaloo's experimentation,on a journey and a mission to free other subjects. He gets his short temper and foul mouth from Balrog, his former mentor.",
    avatarUrl: "ed",
  },
  {
    slug: "akuma-sf6",
    name: "akuma",
    story:
      "A demon of combat that has welcomed the Satsui no Hado into his being in his quest to become the ultimate master of the fist.",
    avatarUrl: "akuma",
  },
  {
    slug: "bison-sf6",
    name: "m. bison",
    story:
      "A man who resembles M. Bison, the leader of Shadaloo, who was believed to be dead. He has lost his memories, but has violent tendencies. He appears in locations related to Shadaloo, guided by Psycho Power.",
    avatarUrl: "bison",
  },
  {
    slug: "terry-sf6",
    name: "terry",
    story:
      'A passionate fighter that hones his craft as he travels all over the world. Also known as the "Hungry Wolf". He came to Metro City after hearing about the opening of the Pao Pao Cafe.',
    avatarUrl: "terry",
  },
  {
    slug: "mai-sf6",
    name: "mai",
    story:
      "The successor of Shiranui-style ninja arts. A charming kunoichi who is as dedicated to love as she is to training. Loves cooking, Japanese dressmaking, flower arrangement, and traditional Japanese dance.",
    avatarUrl: "mai",
  },
  {
    slug: "elena-sf6",
    name: "elena",
    story:
      "A cheerful girl raised in the arms of the savannah, and a member of a clan of proud warriors. She has a talent for healing, and seeks to become a veterinarian.",
    avatarUrl: "elena",
  },
  {
    slug: "sagat-sf6",
    name: "sagat",
    story:
      "The Emperor of Muay Thai. He was once one of the highest ranking members of Shadaloo, but has since left the criminal organization. He currently lives deep in the mountains, focusing only on his training.",
    avatarUrl: "sagat",
  },
  {
    slug: "cviper-sf6",
    name: "c. viper",
    story:
      "The Emperor of Muay Thai. He was once one of the highest ranking members of Shadaloo, but has since left the criminal organization. He currently lives deep in the mountains, focusing only on his training.",
    avatarUrl: "cviper",
  },
];

const games = [{ slug: "sf6", name: "street fighter 6" }];

async function main() {
  console.log("Start seeding...");
  console.log("Seeding game/s...");
  const gameResult = await prisma.game.upsert({
    where: { slug: games[0].slug },
    update: {},
    create: {
      slug: games[0].slug,
      name: games[0].name,
    },
  });
  if (!gameResult) {
    console.log("error making game");
  }
  console.log("Game created ", gameResult);
  console.log("beginning seeding loop for characters");

  for (const character of sfCharacters) {
    console.log("Loop started for ", character.name);
    await prisma.character.upsert({
      where: { slug: character.slug },
      update: {},
      create: {
        slug: character.slug,
        name: character.name,
        story: character.story,
        gameId: gameResult.id,
        avatarUrl: character.avatarUrl,
      },
    });
    console.log("Loop finished for ", character.name);
  }
  const charCount = await prisma.character.count();
  console.log(`Seeding complete! ${charCount} characters seeded!`);
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
